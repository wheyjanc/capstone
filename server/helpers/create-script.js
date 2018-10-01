const createScript = arr => {
  let num = Math.floor(Math.random() * arr.length)
  let image = arr[num].image
  let link = arr[num].url

  let scriptTag = `
  
  `
  return scriptTag
}

module.exports = createScript
