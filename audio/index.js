var glob = require("glob")
var fs = require("fs")
 
glob("./**/*.*", {}, function (er, files) {
  let result = []
  let download = ''
  files.forEach(item => {
    let fileInfo = fs.statSync(item)
    if(fileInfo.size/(1024*1024) < 20) {    // 小于20M
      let arr = item.split('/')
      result.push({
        name: arr[3],
        artist: "专辑-"+arr[2],
        url: 'https://cdn.jsdelivr.net/gh/nj-lizhi/song@master/audio' + item.slice(1),
        cover: 'https://cdn.jsdelivr.net/gh/nj-lizhi/song@master/audio/cover.png',
      })
      download += `https://cdn.jsdelivr.net/gh/nj-lizhi/song@master/audio${item.slice(1)}\n`
    } else {
      console.log(item)
    }
  })
  fs.writeFileSync('./list.js', "var list = " + JSON.stringify(result))
  fs.writeFileSync('./download.txt', download)
})