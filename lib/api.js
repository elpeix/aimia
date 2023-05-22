import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'
import { descriptionPrompt, translatePrompt } from './prompts.js'

async function callChatCompletion ({ messages }) {
  const configuration = new Configuration({ apiKey: process.env.VITE_OPENAI_API_KEY })
  const openai = new OpenAIApi(configuration)
  const model = 'gpt-3.5-turbo'
  const result = await openai.createChatCompletion({ model, messages })
  return result.data.choices[0]?.message?.content
}

/**
 * Call the OpenAI API to translate the given input from the given language to the given language.
 * 
 * @param {string} input - The input to translate.
 * @param {string} from - The language to translate from.
 * @param {string} to - The language to translate to.
 * @param {object} prompt - The prompt to use for the API call.
 * @param {string} prompt.system - The system message to use for the API call.
 * @param {object[]} prompt.samples - The samples to use for the API call.
 * @param {string} prompt.samples[].user - The user message to use for the API call.
 * @param {string} prompt.samples[].assistant - The assistant message to use for the API call.
 * @returns {Promise<string>} The translated content.
 */
export async function translate({ input, from, to, prompt = translatePrompt }) {
  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: prompt.system
    }
  ]
  prompt.samples.forEach(sample => {
    if (!sample.user || !sample.assistant) return
    messages.push({
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: sample.user
    })
    messages.push({
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: sample.assistant
    })
  })
  messages.push({
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: `${input} {{${from}}} [[${to}]]`
  })
  return await callChatCompletion({ messages })
}

/**
 * Call the OpenAI API to generate a description for the given input.
 * 
 * @param {string} input - The input to generate a description for.
 * @param {object} prompt - The prompt to use for the API call.
 * @param {string} prompt.system - The system message to use for the API call.
 * @param {object[]} prompt.samples - The samples to use for the API call.
 * @param {string} prompt.samples[].user - The user message to use for the API call.
 * @param {string} prompt.samples[].assistant - The assistant message to use for the API call.
 * @returns {Promise<string>} The generated description.
 */
export async function generateDescription({ input, prompt = descriptionPrompt }) {
  return await call({ input, prompt })
}

/**
 * Call the OpenAI API to generate a description for the given input.
 * 
 * @param {string} input - The input to generate a description for.
 * @param {object} prompt - The prompt to use for the API call.
 * @param {string} prompt.system - The system message to use for the API call.
 * @param {object[]} prompt.samples - The samples to use for the API call.
 * @param {string} prompt.samples[].user - The user message to use for the API call.
 * @param {string} prompt.samples[].assistant - The assistant message to use for the API call.
 * @returns {Promise<string>} The generated content.
 */
export async function call({ input, prompt }) {
  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: prompt.system
    }
  ]
  prompt.samples.forEach(sample => {
    if (!sample.user || !sample.assistant) return
    messages.push({
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: sample.user
    })
    messages.push({
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: sample.assistant
    })
  })
  messages.push({
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: `${input}`
  })
  return await callChatCompletion({ messages })
}

/**
 * @deprecated for removal
 */
export async function getKeywords({ input }) {
  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: 'You are an AI that generates keywords for an eCommerce element. You receive a text from the user. Do not answer, just generate keywords separated by comma. You must ignore html code.'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Pelota de silicona de color verde'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'bebé,juguete,pelota,silicona,verde'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'This train circuit is a sensory explosion! It includes a xylophone musical track, a rattle, a rainbow track, a multi-coloured locomotive, a bow and a mirror. It is ideal to enhance the development of the five senses in the most fun and entertaining way.'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'toy,baby,train,track,xylophone,musical,rattle,rainbow,locomotive,fun,entertaining'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: input
    }
  ]
  return await callChatCompletion({ messages })
}
