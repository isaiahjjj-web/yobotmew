export function init() {
  const logs = []

  return {
    log(msg) {
      const entry = `[${new Date().toLocaleTimeString()}] ${msg}`
      logs.push(entry)
      console.log(entry)
    },
    show() {
      return logs.length ? logs.join("\n") : "No logs yet."
    }
  }
}
