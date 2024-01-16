import { computed } from 'vue';

type ArgType = { name: string, loc: string, imgType?: 'png' | 'svg' }

export function useImgSrc({ name, loc, imgType = 'png' }: ArgType) {
  return computed(() => {
    return `/src/assets/img/${loc}/${name}.${imgType}`
  })
}