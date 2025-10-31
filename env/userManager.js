export function init(os) {
  const state = JSON.parse(localStorage.getItem('user')) || { username: 'guest' }

  return {
    run(args) {
      const cmd = args[0]

      if (cmd === "login") {
        const name = args[1] || "user"
        state.username = name
        localStorage.setItem('user', JSON.stringify(state))
        os.env.username = name
        return `Logged in as ${name}`
      }

      if (cmd === "logout") {
        state.username = "guest"
        localStorage.setItem('user', JSON.stringify(state))
        os.env.username = "guest"
        return "Logged out."
      }

      if (cmd === "whoami") {
        return `Current user: ${os.env.username}`
      }

      return "Usage: user [login <name>|logout|whoami]"
    }
  }
}
