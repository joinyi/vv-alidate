const fs = require('fs')
const rollup = require('rollup')
const configs = require('./rollup.config.js')
const uglify = require('uglify-js')
const copy = require('./copy.js')

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

if (!fs.existsSync('dist/locale')) {
  fs.mkdirSync('dist/locale')
}

function buildEntry (builds) {
  let count = 0
  const total = builds.length
  const next = () => {
    build(builds[count])
    .then(() => {
      count++
      console.log(count, total, 2000)
      if (count < total) {
        next()
      }
    })
    .catch(err => {
      console.log(err, 200)
    })
  }

  next()
}

function build (config) {
  return rollup.rollup(config)
  .then(bundle => {
    return generate(config, bundle)
  })
  .catch(err => {
    if (!err) return
    console.log(err, 'build')
  })
}

function generate (config, bundle) {
  return bundle.generate(config.output)
  .then(gen => {
    return write(config, gen.code)
  })
  .catch(err => {
    if (!err) return
    console.log(err, 'generate')
  })
}

function write (config, code) {
  return new Promise((resolve, reject) => {
    const isProd = /min\.js$/.test(config.output.file)
    if (isProd) {
      code = uglify.minify(code, {
        mangle: true,
        compress: true
      }).code
    }
    fs.writeFile(config.output.file, code, (err) => {
      if (err) {
        console.log(err, 300)
        return reject(err)
      }
      reject()
    })
  })
}

buildEntry(Object.keys(configs).map(key => configs[key]))
copy('src/locale', 'dist/locale')
