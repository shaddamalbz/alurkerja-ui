function toKiloByte(size: number, sizeFrom: string) {
  if (sizeFrom === 'byte') return Math.round(size / 1000).toFixed(2)
  return size
}

export default toKiloByte
