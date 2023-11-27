// @ts-ignore
export const streamed = (fn, delay = 0) => {
  return new Promise((fulfill, reject) => {
    setTimeout(async () => {
      try {
        return fulfill(await fn())
      } catch (err) {
        return reject(err)
      }
    }, 100 + delay)
  })
}
