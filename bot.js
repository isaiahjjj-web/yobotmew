import * as envModules from './env/index.js'

export class BotOS {
  constructor() {
    this.env = { version: '2.0.0-beta', username: 'guest', osname: 'BotOS' }
    this.systems = {}

    // Auto-load all environment modules
    for (const [name, module] of Object.entries(envModules)) {
      if (typeof module.init === 'function') {
        this.systems[name] = module.init(this)
      }
    }
  }

  async execute(command) {
    try {
      const result = await this.systems.commandHandler.handle(command, this)
      return result
    } catch (e) {
      return `[Error] ${e.message}`
    }
  }
}
