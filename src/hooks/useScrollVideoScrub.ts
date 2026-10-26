import { useEffect, useState, type RefObject } from 'react'

/**
 * Scroll-scrubbed video.
 *
 * The visitor's scroll position — not playback — drives the video: their scroll
 * progress through the hero runway is mapped onto the timeline and written to
 * `video.currentTime`. The video is never played, never looped and never left to
 * run on its own, so it stops on the exact frame the visitor stopped at, in both
 * directions.
 *
 * How the smoothness is kept:
 * - One passive `scroll` listener only records the target progress. Nothing else
 *   happens on scroll, so no work is queued per wheel tick.
 * - A single `requestAnimationFrame` loop does all the work, so seeking is
 *   synchronised with painting and never runs more than once per frame.
 * - The rendered time eases toward the target time with a frame-rate independent
 *   interpolation (`1 - (1 - smoothing) ^ (dt * 60)`), which removes the harsh
 *   jumps of writing `currentTime` from the scroll handler directly while still
 *   feeling directly attached to the scroll.
 * - A seek is only issued when the eased time has drifted at least half a video
 *   frame (1/30 s) from the last written time, and never while a previous seek is
 *   still in flight. That caps the seek rate well below the frame rate instead of
 *   flooding the decoder with hundreds of requests per second.
 * - All visual updates (video time, media depth, copy fade, loading meter) go
 *   through refs and the DOM — the scroll never causes a React re-render.
 *
 * Depth: the media plane opens from 1.06 to 1 across the scrub and the copy lifts
 * away on a nearer plane. Both are composited transforms only.
 */
export type HeroVideoStatus = 'loading' | 'ready' | 'failed'

interface ScrollVideoScrubOptions {
  /** Pinned hero runway — the scroll distance mapped onto the whole video. */
  runwayRef: RefObject<HTMLElement>
  videoRef: RefObject<HTMLVideoElement>
  /** Media plane that carries the depth scale. */
  mediaRef?: RefObject<HTMLDivElement>
  /** Hero copy block, faded away as the scrub progresses. */
  copyRef: RefObject<HTMLDivElement>
  /** Loading meter fill; driven with a transform, never with React state. */
  meterRef: RefObject<HTMLDivElement>
  /** Media source — a change (breakpoint switch) restarts load and warm-up. */
  src: string
  enabled?: boolean
}

/** Interpolation factor per 60 Hz frame — responsive enough to feel attached. */
const SMOOTHING = 0.2
/** 1/30 s is half a video frame: below it a seek is invisible, so skip it. */
const SEEK_EPSILON = 1 / 30
/** Close enough to snap, so the easing never crawls asymptotically. */
const SNAP_EPSILON = 0.012
/** Stop 40 ms short of the last timestamp — the final frame, not a blank tag. */
const END_TRIM = 0.04
/** Seek positions probed before the reveal, spread across the whole timeline. */
const WARM_PROBES = 12
const WARM_PROBE_TIMEOUT = 1500
const WARM_TOTAL_TIMEOUT = 6000
const META_TIMEOUT = 15000
/** Share of the runway over which the hero copy fades away. */
const COPY_FADE = 0.34
/** The media plane's opening scale — the camera-pull-back illusion. */
const MEDIA_SCALE = 0.06

export function useScrollVideoScrub({
  runwayRef,
  videoRef,
  mediaRef,
  copyRef,
  meterRef,
  src,
  enabled = true,
}: ScrollVideoScrubOptions): HeroVideoStatus {
  const [status, setStatus] = useState<HeroVideoStatus>('loading')

  useEffect(() => {
    const runway = runwayRef.current
    const video = videoRef.current
    if (!enabled || !runway || !video) return

    setStatus('loading')

    /** 'warm' primes the seek buffer behind the poster, 'scrub' follows the scroll. */
    let phase: 'warm' | 'scrub' | 'dead' = 'warm'
    let duration = 0
    let runwayTop = 0
    let runwaySpan = 1
    let target = 0
    let eased = 0
    let written = -1
    let probes = 0
    let fade = -1
    let mediaScale = -1
    let revealed = false
    let frame = requestAnimationFrame(() => {})
    let probeTimer = 0
    let metaTimer = 0
    let warmStarted = 0
    let lastFrame = performance.now()

    const progressAt = (scrollY: number) => {
      const p = (scrollY - runwayTop) / runwaySpan
      return p < 0 ? 0 : p > 1 ? 1 : p
    }

    const measure = () => {
      const rect = runway.getBoundingClientRect()
      runwayTop = rect.top + window.scrollY
      runwaySpan = Math.max(1, rect.height - window.innerHeight)
      target = progressAt(window.scrollY)
    }

    const meter = (value: number) => {
      const fill = meterRef.current
      if (fill) fill.style.transform = `scaleX(${value.toFixed(3)})`
    }

    const reveal = (next: HeroVideoStatus = 'ready') => {
      if (revealed) return
      revealed = true
      window.clearTimeout(probeTimer)
      window.clearTimeout(metaTimer)
      phase = next === 'failed' ? 'dead' : 'scrub'
      eased = (duration - END_TRIM) * target
      // The eased clock may sit outside the usable range after a long warm-up.
      if (eased < 0) eased = 0
      written = -1
      setStatus(next)
    }

    const probe = () => {
      if (phase !== 'warm' || !duration) return
      if (probes >= WARM_PROBES) {
        meter(1)
        reveal()
        return
      }
      if (performance.now() - warmStarted > WARM_TOTAL_TIMEOUT) {
        reveal()
        return
      }
      probes += 1
      video.currentTime = Math.max(0, (duration - END_TRIM) * (probes / WARM_PROBES))
      meter(probes / WARM_PROBES)
      // 'seeked' advances the pass immediately; the timer covers a stalled seek.
      probeTimer = window.setTimeout(probe, WARM_PROBE_TIMEOUT)
    }

    const onSeeked = () => {
      if (phase !== 'warm') return
      window.clearTimeout(probeTimer)
      probe()
    }

    const onLoadedMetadata = () => {
      window.clearTimeout(metaTimer)
      duration = Number.isFinite(video.duration) ? video.duration : 0
      if (!duration) {
        reveal('failed')
        return
      }
      // The experience is driven entirely by currentTime — playback must never start.
      video.pause()
      measure()
      if (target > 0.004) {
        // Loaded mid-hero (restored scroll): go straight to the scroll-driven mode.
        reveal()
        return
      }
      warmStarted = performance.now()
      probe()
    }

    const onError = () => reveal('failed')

    const onScroll = () => {
      target = progressAt(window.scrollY)
      if (phase === 'warm' && target > 0.004) {
        // The visitor is scrolling: their input outranks priming the buffer.
        window.clearTimeout(probeTimer)
        reveal()
      }
    }

    const onResize = () => {
      measure()
      if (phase !== 'scrub') return
      eased = (duration - END_TRIM) * target
      written = -1
    }

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      const dt = Math.min(0.05, (now - lastFrame) / 1000)
      lastFrame = now

      if (phase !== 'scrub' || !duration) return

      // Nothing to do while the hero is entirely off screen.
      const scrollY = window.scrollY
      if (scrollY > runwayTop + runwaySpan + window.innerHeight) return
      if (scrollY + window.innerHeight < runwayTop) return

      const mapped = (duration - END_TRIM) * target
      const delta = mapped - eased
      let converged = false
      if (Math.abs(delta) < SNAP_EPSILON) {
        eased = mapped
        converged = true
      } else {
        eased += delta * (1 - Math.pow(1 - SMOOTHING, dt * 60))
      }
      if (eased < 0) eased = 0

      // While moving, only seek once the eased time has drifted at least half a
      // frame from the last written time; once settled, close the last fraction of
      // a frame so the clip rests on exactly the frame the scroll asked for.
      const gap = Math.abs(eased - written)
      const needed = converged ? gap > 0.002 : gap >= SEEK_EPSILON
      if (needed && !video.seeking) {
        written = eased
        video.currentTime = eased
      }

      const media = mediaRef?.current
      if (media) {
        const scale = 1 + MEDIA_SCALE * (1 - target)
        if (Math.abs(scale - mediaScale) > 0.0008) {
          mediaScale = scale
          media.style.transform = `scale(${scale.toFixed(4)})`
        }
      }

      const copy = copyRef.current
      if (copy) {
        const raw = target >= COPY_FADE ? 1 : target / COPY_FADE
        if (Math.abs(raw - fade) > 0.002) {
          fade = raw
          // Quadratic ease-in: the copy stays legible for the first stretch of the
          // scrub and then leaves the frame quickly, so the tour takes over.
          const out = raw * raw
          copy.style.opacity = String(1 - out)
          copy.style.transform = `translate3d(0, ${(-26 * out).toFixed(1)}px, 0)`
          copy.style.pointerEvents = out > 0.98 ? 'none' : ''
          copy.style.visibility = out > 0.995 ? 'hidden' : ''
        }
      }
    }

    measure()
    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('seeked', onSeeked)
    video.addEventListener('error', onError)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    frame = requestAnimationFrame(tick)
    metaTimer = window.setTimeout(() => {
      // No metadata in time: treat the video as unavailable.
      if (!revealed) reveal('failed')
    }, META_TIMEOUT)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(probeTimer)
      window.clearTimeout(metaTimer)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('error', onError)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
    // `src` restarts the load + warm-up cycle when the breakpoint switches.
  }, [copyRef, enabled, mediaRef, meterRef, runwayRef, src, videoRef])

  return status
}
