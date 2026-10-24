/**
 * Hero tour media.
 *
 * The supplied clip is re-encoded for scroll scrubbing rather than for playback.
 * A video encoded for normal playback keeps keyframes seconds apart (the original
 * had a single keyframe for the whole 9 s), so every seek has to decode from the
 * start of the clip — that is what produces the stuttering, frozen frames and
 * lag behind the scroll. Scrubbing needs the opposite: a keyframe every few
 * frames, the index at the front of the file, and a modest resolution/bitrate so
 * frames arrive quickly. Re-encode a replacement clip with:
 *
 *   ffmpeg -i source.mp4 -an \
 *     -vf "scale=1168:768:flags=lanczos" \
 *     -c:v libx264 -preset slow -crf 25 -pix_fmt yuv420p \
 *     -profile:v high -level 4.0 \
 *     -x264-params "keyint=6:min-keyint=6:scenecut=0:ref=3:bframes=2" \
 *     -movflags +faststart hero-tour.mp4
 *
 *   # mobile variant: scale=800:526, -crf 27, -level 3.2
 *   # poster: ffmpeg -i source.mp4 -frames:v 1 -c:v libwebp -quality 84 poster.webp
 *
 * keyint=6 puts a keyframe every 0.25 s (24 fps), which is the seek granularity;
 * +faststart moves the moov index to the head of the file so the browser can seek
 * before the whole download finishes. Audio is dropped — it is never played.
 *
 * H.264/MP4 is deliberately the only source: it is decoded in hardware
 * everywhere and seeks fastest. A WebM/VP9 variant of the same clip came out
 * ~60% larger at a lower quality, so it would only add download weight and
 * software-decoding lag; add one (keyint 6, -auto-alt-ref 0, -crf 40) only if a
 * browser without H.264 support ever needs to be served.
 */
export const heroVideo = {
  desktop: {
    src: '/media/hero/hero-tour.mp4',
    poster: '/media/hero/hero-tour-poster.webp',
  },
  mobile: {
    src: '/media/hero/hero-tour-mobile.mp4',
    poster: '/media/hero/hero-tour-poster-mobile.webp',
  },
  /** Shown when the video cannot be used at all (and for reduced motion). */
  fallback: '/images/hero-villa.webp',
} as const
