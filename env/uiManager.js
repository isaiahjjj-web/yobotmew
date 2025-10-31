export function init() {
  return {
    notify(message) {
      const n = document.createElement('div')
      n.className = 'notify'
      n.textContent = message
      document.body.appendChild(n)
      setTimeout(() => n.remove(), 3000)
    }
  }
}
