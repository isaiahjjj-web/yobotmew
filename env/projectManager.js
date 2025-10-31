export function init(os) {
  let projects = JSON.parse(localStorage.getItem('projects')) || []

  function save() {
    localStorage.setItem('projects', JSON.stringify(projects))
  }

  return {
    async run(args) {
      const cmd = args[0]

      if (cmd === "create") {
        const type = args[1]
        const name = args.slice(2).join(" ") || "Untitled"
        const project = { id: Date.now(), type, name, owner: os.env.username }
        projects.push(project)
        save()
        return `Created ${type}: "${name}" owned by ${os.env.username}`
      }

      if (cmd === "list") {
        if (!projects.length) return "No projects found."
        return projects.map(p => `${p.type}: ${p.name} (owner: ${p.owner})`).join("\n")
      }

      if (cmd === "delete") {
        const name = args.slice(1).join(" ")
        const i = projects.findIndex(p => p.name === name)
        if (i === -1) return "No such project."
        projects.splice(i, 1)
        save()
        return `Deleted project "${name}"`
      }

      return "Usage: projects [create <type> <name> | list | delete <name>]"
    }
  }
}
