import fs from 'fs'

export class Directory {
  name: string
  route: string
  path: string
  children: Directory[]

  constructor(name: string, route: string, path: string) {
    this.name = name
    this.route = route
    this.path = path
    this.children = []
  }

  async build(): Promise<void> {
    const files = await fs.promises.readdir(this.path)

    for (const file of files) {
      // remove extension
      const name = file.replace(/\.[^/.]+$/, '')

      const fPath = `${this.path}/${file}`
      const _route = `${this.route}/${name}`
      const stats = await fs.promises.stat(fPath)

      if (stats.isDirectory()) {
        const child = new Directory(name, _route, fPath)
        await child.build()
        this.children.push(child)
      } else {
        // ignore index.ts or index.js
        if (name === 'index') continue

        const child = new File(name, _route, fPath)
        this.children.push(child)
      }
    }
  }
}

export class File extends Directory {
  constructor(name: string, route: string, path: string) {
    super(name, route, path)
  }
}