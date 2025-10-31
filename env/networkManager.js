export function init(os) {
  return {
    async search(query) {
      if (!query) return "Usage: search <query>"

      const results = []

      try {
        // --- DuckDuckGo ---
        const ddgRes = await fetch(
          `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&skip_disambig=1`
        )
        const ddgData = await ddgRes.json()

        if (ddgData.AbstractText) results.push(ddgData.AbstractText)
        else if (ddgData.Heading) results.push(ddgData.Heading)

        function flattenTopics(topics) {
          for (const topic of topics) {
            if (topic.Text) results.push(topic.Text)
            else if (topic.Topics && topic.Topics.length > 0) flattenTopics(topic.Topics)
          }
        }

        if (ddgData.RelatedTopics && ddgData.RelatedTopics.length > 0) {
          flattenTopics(ddgData.RelatedTopics)
        }

      } catch (err) {
        console.error("DuckDuckGo error:", err)
      }

      try {
        // --- Wikipedia REST API ---
        const wikiRes = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
        )
        if (wikiRes.ok) {
          const wikiData = await wikiRes.json()
          if (wikiData.extract) results.push(wikiData.extract)
        }
      } catch (err) {
        console.error("Wikipedia error:", err)
      }

      try {
        // --- Wikipedia OpenSearch (JSON) as third source ---
        const wikiOSRes = await fetch(
          `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=5&namespace=0&format=json&origin=*`
        )
        if (wikiOSRes.ok) {
          const wikiOSData = await wikiOSRes.json()
          if (wikiOSData[2] && wikiOSData[2].length > 0) results.push(...wikiOSData[2])
        }
      } catch (err) {
        console.error("Wikipedia OpenSearch error:", err)
      }

      if (results.length === 0) results.push("No results found.")

      // Combine all results, separating each source with double newline
      return `[Search Results]\n${results.join("\n\n")}`
    }
  }
}
