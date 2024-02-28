var glob = require("glob")
var fs = require("fs")
 
glob("./audio/**/*.{mp3,wav,flac}", {}, function (er, files) {
  let result = []
  let download = ''
  files.forEach(item => {
    let fileInfo = fs.statSync(item)
    if(fileInfo.size/(1024*1024) < 20) {    // 小于20M
      let arr = item.split('/')
      result.push({
        name: arr[3].replace(/\.(mp3|flac|wav)$/g, ''),
        artist: "专辑-"+arr[2],
        url: 'https://testingcf.jsdelivr.net/gh/nj-lizhi/song@main' + item.slice(1),
        cover: 'https://testingcf.jsdelivr.net/gh/nj-lizhi/song@main/audio/' + arr[2] + '/cover.png',
      })
      download += `https://testingcf.jsdelivr.net/gh/nj-lizhi/song@main${item.slice(1)}\n`
    } else {
      console.log('文件大于20M：', item)
    }
  })
  fs.writeFileSync('./audio/list.js', "var list = " + JSON.stringify(result))
  fs.writeFileSync('./audio/list.json', JSON.stringify(result))
  fs.writeFileSync('./audio/download.txt', download)
})
