export function getImgPath(loc: string, imgName: string, type: string = 'png') {
  return `/src/assets/img/${loc == 'zh' ? 'zh' : 'en'}/${imgName}.${type}`
}