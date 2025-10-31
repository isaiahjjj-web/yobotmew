export function init() {
  let fs = JSON.parse(localStorage.getItem('filesystem')) || { '/': [] }

  return {
    list() {
      return Object.keys(fs)
    },

    mkdir(name) {
      if (!name) return "Usage: mkdir <name>"
      if (fs[`/${name}`]) return `Directory /${name} already exists`
      fs[`/${name}`] = []
      localStorage.setItem('filesystem', JSON.stringify(fs))
      return `Created /${name}`
    },

    deleteDir(name) {
      if (fs[`/${name}`]) {
        delete fs[`/${name}`]
        localStorage.setItem('filesystem', JSON.stringify(fs))
        return `Deleted /${name}`
      }
      return `No such directory: /${name}`
    }
  }
}
