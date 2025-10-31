export function init(os) {
  const envVars = JSON.parse(localStorage.getItem('envVars')) || {}

  function save() {
    localStorage.setItem('envVars', JSON.stringify(envVars))
  }

  return {
    run(args) {
      const [sub, key, value] = args

      switch (sub) {
        case "set":
          envVars[key] = value
          save()
          return `Set ${key}=${value}`
        case "get":
          return envVars[key] || `No variable ${key}`
        case "unset":
          delete envVars[key]
          save()
          return `Removed ${key}`
        case "list":
          return Object.entries(envVars).map(([k, v]) => `${k}=${v}`).join("\n") || "No environment variables."
        default:
          return "Usage: env [set|get|unset|list]"
      }
    }
  }
}
