export function init(os) {
  return {
    async search(query) {
      if (!query) return "Usage: search <query>"

      try {
        const res = await fetch(
          `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&skip_disambig=1`
        )
        const data = await res.json()

        const results = []

        // Main abstract or heading
        if (data.AbstractText) results.push(data.AbstractText)
        else if (data.Heading) results.push(data.Heading)

        // Recursive function to flatten RelatedTopics
        function flattenTopics(topics) {
          for (const topic of topics) {
            if (topic.Text) results.push(topic.Text)
            else if (topic.Topics && topic.Topics.length > 0) flattenTopics(topic.Topics)
          }
        }

        if (data.RelatedTopics && data.RelatedTopics.length > 0) {
          flattenTopics(data.RelatedTopics)
        }

        if (results.length === 0) results.push("No results found.")

        return `[Search Results]\n${results.join("\n\n")}` // fixed here
      } catch (err) {
        console.error(err)
        return `[Search Error] ${err.message}`
      }
    }
  }
}
