import { HeroCopy } from './HeroCopy'
import { HeroSearch } from './HeroSearch'
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
        alt="Contemporary villa lit at dusk, reflected in a still pool"
        width={1920}
        height={1280}
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full animate-hero-zoom object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900/85 via-navy-900/40 to-navy-900/90"
        aria-hidden="true"
      />

      <div className="shell flex flex-1 flex-col justify-end pb-10 pt-32 sm:pt-36">
        <HeroCopy />
      </div>

      <div className="shell pb-14 lg:pb-20">
        <HeroSearch />
      </div>
    </section>
  )
}
