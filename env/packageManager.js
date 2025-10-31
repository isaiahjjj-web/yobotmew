export function init(os) {
  const installed = JSON.parse(localStorage.getItem('packages')) || []

  function save() {
    localStorage.setItem('packages', JSON.stringify(installed))
  }

  return {
    install(pkg) {
      if (!pkg) return "Usage: install <package>"
      if (installed.includes(pkg)) return `${pkg} is already installed.`
      installed.push(pkg)
      save()
      return `Installed package: ${pkg}`
    },

    remove(pkg) {
      const i = installed.indexOf(pkg)
      if (i === -1) return `${pkg} not found.`
      installed.splice(i, 1)
      save()
      return `Removed ${pkg}`
    },

    list() {
      return installed.length ? installed.join("\n") : "No packages installed."
    }
  }
}
