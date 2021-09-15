import glob from 'glob'
import fs from 'fs-extra'
import path from 'path'
import matter from 'gray-matter'

glob('./source/_posts/*.md', function (er, files) {
  console.log(files)
  files.forEach(function (file) {
    let content = fs.readFileSync(file, { encoding: 'utf8' })
    let mt = content.match(/---([\s\S]+)---/)[0]
    let data = matter(mt).data
    content = content.replace(mt, `# ${data.title}`)
    fs.outputFileSync(`./dist/${path.basename(file)}`, content, { endcoding: 'utf8' })
  })
})