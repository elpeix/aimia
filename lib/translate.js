import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'

export async function translate ({ input, from, to }) {
  const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
  const openai = new OpenAIApi(configuration)
  const model = 'gpt-3.5-turbo'
  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      // Prompt extracted from https://github.com/midudev/aprendiendo-react/tree/master/projects/08-google-translate-clone (midudev)
      content: 'You are a AI that translates text. You receive a text from the user. Do not answer, just translate the text. The original language is surrounded by `{{` and `}}`. You can also recive {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[` and `]].` You must mantain html code.'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Pelota de silicona de color verde {{Español}} [[English]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Green silicone ball'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Where to receive my order? {{auto}} [[Português]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Onde receber meu pedido?'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: '<p>En el caso de haber recibido el producto defectuoso o tienes dudas con su pedido, puedes contactarnos a través de este formulario.</p><p>En el caso de que quieras realizar una devolución, por favor sigue las instrucciones detalladas en la <a href="https://ecommerce.online/politica-devoluciones" title="Politica devoluciones" target="_blank"> Política de devoluciones.</a></p> {{Español}} [[Italiano]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: '<p>Se hai ricevuto un prodotto difettoso o hai domande sul tuo ordine, puoi contattarci tramite questo modulo.</p><p>Se vuoi effettuare un reso, segui le istruzioni dettagliate nella <a href="https://ecommerce.online/politica-devoluciones" title="Politica devoluciones" target="_blank"> Politica di reso.</a></p>'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `${input} {{${from}}} [[${to}]]`
    }
  ]
  const result = await openai.createChatCompletion({ model, messages })
  return result.data.choices[0]?.message?.content
}
