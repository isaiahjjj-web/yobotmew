import { BotOS } from './bot.js'

window.addEventListener('DOMContentLoaded', () => {
  const os = new BotOS()
  const input = document.getElementById('input')
  const output = document.getElementById('output')

  // Ensure input is focused
  input.focus()

  function print(text) {
    const div = document.createElement('div')
    div.textContent = text
    output.appendChild(div)
    output.scrollTop = output.scrollHeight
  }

  print("🔋 Booting BotOS...")
  print("Type 'help' to see available commands.")

  // Handle Enter key
  input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault() // prevent default behavior (like form submission)
      const command = input.value.trim()
      if (!command) return
      input.value = ''
      print('> ' + command)
      try {
        const response = await os.execute(command)
        if (response) print(response)
      } catch (err) {
        print(`[Error] ${err.message}`)
        console.error(err)
      }
    }
  })
})
