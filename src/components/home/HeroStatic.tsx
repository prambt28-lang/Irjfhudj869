import { HeroCopy } from './HeroCopy'
import { heroVideo } from '../../data/heroVideo'

/**
 * Static hero. Used when the visitor prefers reduced motion, where forcing a
 * scroll-driven cinematic is inappropriate — no video is downloaded at all.
 */
export function HeroStatic() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-navy-900">
      <img
        src={heroVideo.fallback}
        alt="ویلای مدرن در نور غروب، با بازتاب در استخری آرام"
        width={1920}
        height={1280}
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full animate-hero-zoom object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900/85 via-navy-900/40 to-navy-900/90"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-900/85 to-transparent"
        aria-hidden="true"
      />

      <div className="shell flex flex-1 flex-col justify-end pb-16 pt-32 sm:pb-20 sm:pt-36">
        <HeroCopy />
      </div>
    </section>
  )
}
