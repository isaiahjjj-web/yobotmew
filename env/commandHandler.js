export function init(os) {
  return {
    async handle(input) {
      const [cmd, ...args] = input.split(" ")

      switch (cmd) {
        case "help":
          return [
            "Available commands:",
            "help, about, env, mkdir, ls, install, user, search, projects, log, clear"
          ].join("\n")

        case "about":
          return `${os.env.osname} v${os.env.version} — AI OS prototype`

        case "env":
          return os.systems.envManager.run(args)

        case "mkdir":
          return os.systems.fileSystem.mkdir(args[0])

        case "ls":
          return os.systems.fileSystem.list().join("  ")

        case "install":
          return os.systems.packageManager.install(args[0])

        case "user":
          return os.systems.userManager.run(args)

        case "search":
          return await os.systems.networkManager.search(args.join(" "))

        case "projects":
          return await os.systems.projectManager.run(args)

        case "log":
          return os.systems.logSystem.show()

        case "clear":
          document.getElementById('output').innerHTML = ''
          return ''

        default:
          os.systems.logSystem.log(`Unknown command: ${cmd}`)
          return "Unknown command. Type 'help' to list available commands."
      }
    }
  }
}
