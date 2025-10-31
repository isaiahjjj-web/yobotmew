export function init() {
  const processes = []

  return {
    run(name) {
      const pid = Date.now()
      processes.push({ name, pid })
      return `Started process ${name} [PID ${pid}]`
    },

    list() {
      if (processes.length === 0) return "No running processes."
      return processes.map(p => `${p.name} (${p.pid})`).join("\n")
    },

    kill(pid) {
      const index = processes.findIndex(p => p.pid == pid)
      if (index === -1) return "Process not found."
      processes.splice(index, 1)
      return `Killed process ${pid}`
    }
  }
}
