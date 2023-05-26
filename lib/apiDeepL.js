export async function translate({ input, from = null, to, options = null}) {
  if (from === 'auto') from = null

  const formData = new URLSearchParams()
  formData.append('text', input)
  if (from) formData.append('source_lang', from)
  formData.append('target_lang', to)
  if (options) {
    if (options.splitSentences) formData.append('split_sentences', 1)
    if (options.preserveFormatting) formData.append('preserve_formatting', 1)
    if (options.formality) formData.append('formality', options.formality)
  }

  const response = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${process.env.VITE_DEEPL_API_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: {
      text: input,
      target_lang: to
    }
  })
  const result = await response.json()

  let textResult = ''
  result.translations.forEach((translation) => {
    textResult += translation.text
  })
  return textResult
}
