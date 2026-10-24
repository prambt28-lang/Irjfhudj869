import { HeroScrollTour } from './HeroScrollTour'
import { HeroStatic } from './HeroStatic'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

/**
 * Hero. The scroll-driven tour is the primary experience; visitors who ask for
 * reduced motion get the same design as a static frame.
 */
export function Hero() {
  const reduceMotion = usePrefersReducedMotion()

  return reduceMotion ? <HeroStatic /> : <HeroScrollTour />
}
