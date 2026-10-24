import { useEffect, useRef, useState } from 'react'

import { HeroCopy } from './HeroCopy'
import { HeroSearch } from './HeroSearch'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useScrollVideoScrub } from '../../hooks/useScrollVideoScrub'
import { heroVideo } from '../../data/heroVideo'
import { cn } from '../../lib/cn'

/**
 * Cinematic hero: the supplied tour clip is scrubbed by the visitor's scroll.
 *
 * The section is a tall runway (about three screens) and the viewport inside it is
 * pinned with `position: sticky`, so the video sits still while the scroll travels
 * and the whole timeline lands exactly on the end of the runway. Scroll progress
 * 0 → the first frame, 1 → the final frame; all the timing work lives in
 * `useScrollVideoScrub`.
 */
export function HeroScrollTour() {
  const runwayRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const meterRef = useRef<HTMLDivElement>(null)
  const [showMeter, setShowMeter] = useState(false)

  const wide = useMediaQuery('(min-width: 768px)')
  const source = wide ? heroVideo.desktop : heroVideo.mobile

  const status = useScrollVideoScrub({
    runwayRef,
    videoRef,
    copyRef,
    meterRef,
    src: source.src,
  })

  // A breakpoint switch (rotation, resized window) swaps the file — reload it.
  useEffect(() => {
    videoRef.current?.load()
  }, [source.src])

  // Only surface the loading treatment if the clip is not ready almost immediately.
  useEffect(() => {
    if (status !== 'loading') {
      setShowMeter(false)
      return
    }
    const timer = window.setTimeout(() => setShowMeter(true), 300)
    return () => window.clearTimeout(timer)
  }, [status])

  const failed = status === 'failed'

  // Note: the runway itself must not clip (`overflow-hidden`) — that would make it
  // the sticky viewport and stop the pinned layer from holding. Clipping belongs to
  // the sticky layer.
  return (
    <section
      ref={runwayRef}
      aria-label="Horizon Properties — guided tour"
      className={cn('relative bg-navy-900', failed ? 'min-h-[100svh]' : 'h-[260vh] sm:h-[320vh]')}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Poster underneath: the hero never shows a blank rectangle, and it becomes
            the fallback image if the video cannot be used. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${failed ? heroVideo.fallback : source.poster})` }}
        >
          {!failed && (
            <video
              ref={videoRef}
              src={source.src}
              poster={source.poster}
              preload="auto"
              muted
              playsInline
              disablePictureInPicture
              tabIndex={-1}
              aria-hidden="true"
              className={cn(
                'pointer-events-none h-full w-full object-cover transition-opacity duration-700 ease-premium',
                status === 'ready' ? 'opacity-100' : 'opacity-0',
              )}
            />
          )}
        </div>

        {/* Light scrim only — enough for the copy to stay readable, light enough
            that the tour itself stays the dominant element. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 bg-gradient-to-b from-navy-900/70 via-navy-900/15 to-navy-900/75"
        />

        <div className="relative z-20 flex h-full flex-col justify-end">
          <div ref={copyRef} className="shell flex flex-1 flex-col justify-end pb-10 pt-32 sm:pt-36">
            <HeroCopy>
              {status === 'loading' && showMeter && (
                <div className="mt-6 flex animate-fade-in items-center gap-3" role="status">
                  <span className="relative block h-[2px] w-28 overflow-hidden rounded-full bg-white/20">
                    <span
                      ref={meterRef}
                      className="absolute inset-0 origin-left scale-x-0 rounded-full bg-champagne"
                    />
                  </span>
                  <span className="font-display text-[0.62rem] uppercase tracking-[0.24em] text-white/55">
                    Preparing the tour
                  </span>
                </div>
              )}
            </HeroCopy>
          </div>

          <div className="shell pb-14 lg:pb-20">
            <HeroSearch />
          </div>
        </div>
      </div>
    </section>
  )
}
