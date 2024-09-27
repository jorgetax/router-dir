import express from 'express'
import {Directory, File} from './lib/recursive-dir'

const router = express.Router()

let count = 0

async function main() {

  const root = new Directory('router', '', __dirname)

  // recursive build
  await root.build()

  for (const child of root.children) {

    // ignore lib directory
    if (child.name === 'lib') continue

    // root file
    if (child instanceof File) {
      if (child.name === 'router') {
        import(`.${child.route}`).then((__router) => {
          router.use('/', __router.default)
        })
        count++
        continue
      }

      import(`.${child.route}`).then((__router) => {
        router.use(child.route, __router.default)
      })
      count++
    }

    // recursive directory
    buildRoute(child)
  }
}

function buildRoute(dir: Directory) {

  for (const child of dir.children) {
    // use file
    if (child instanceof File) {

      // default route
      if (child.name === 'router') {
        import(`.${child.route}`).then((__router) => {
          router.use(dir.route, __router.default)
        })
        count++
        continue
      }

      import(`.${child.route}`).then((__router) => {
        count++
        router.use(child.route, __router.default)
      })
      count++
    }

    // recursive directory
    buildRoute(child)
  }
}

main().then(() => {
  console.log(`• Router files: ${count}`)
}).catch((err) => {
  console.error(`✗ Router:        ${err}`)
}).finally(() => {
  console.log(`• Running:      ${new Date().toLocaleString()}\n`)
})

export default router