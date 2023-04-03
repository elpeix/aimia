import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'

async function callChatCompletion ({ messages }) {
  const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
  const openai = new OpenAIApi(configuration)
  const model = 'gpt-3.5-turbo'
  const result = await openai.createChatCompletion({ model, messages })
  return result.data.choices[0]?.message?.content
}

export async function translate ({ input, from, to }) {
  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      // Prompt extracted from https://github.com/midudev/aprendiendo-react/tree/master/projects/08-google-translate-clone (midudev)
      content: 'You are an AI that translates text. You receive a text from the user. Do not answer, just translate the text. The original language is surrounded by `{{` and `}}`. You can also recive {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[` and `]].` You must mantain html code.'
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
  return await callChatCompletion({ messages })
}

export async function getKeywords ({ input }) {
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

export async function getDescription ({ input }) {
  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: 'You are an AI that generates a description for an eCommerce element. You receive a text from the user. Do not answer, just generate a description in HTML code. You must generate output with the same language as the input.'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: '<strong>5 modalidades: </strong><br>- <strong>Modo de uso Ride-on:</strong> El patinete cuenta con unos prácticos reposapiés en los que los peques apoyan su peso para sentirse cómodos. En este caso, son los padres quienes conducen al chiquitín. Edad: 15-36 meses. Hasta 20 kgs.<br>- <strong>Modo de uso Walking Bike:</strong> La situación es similar a la anterior, pero en este caso, se retira la barra y los reposapiés para que el niño pueda apoyar los pies en el suelo y auto impulsarse ¡Es un corre-pasillos ideal! Edad: 15-36 meses. Hasta 20 kgs.<br>- <strong>Modo de uso Scooter:</strong> Se transforma en un patinete ajustable en 4 posiciones. A partir de 3 años (+50kg)<br>- <strong>Modo de uso Trolley:</strong> Listo para plegar y transportar.<br><br><strong>Características: </strong><br>- Manillar TPR duradero y cómodo, de altura regulable y en doble color. Tiene empuñaduras ergonómicas de TPR.<br>- Los reposapiés se pueden retirar fácilmente. También tiene almacenamiento inteligente.<br>- Diseñado sin tornillos para cambiar fácilmente el modo de patinete o caminador. <br>- Nuevo diseño con un robusto freno que ofrece eficiencia de frenado y prolonga la longevidad de la rueda.<br>- Barra en T de metal ajustable en 3 alturas con empuñaduras ergonómicas TPR cómodas y duraderas y una funda anti-rayado dentro del pintado columna, para niños de 15 a +7 años<br>- Sillín extra ancho de espuma EVA ajustable en 2 alturas. Está montado en la barra y es muy fácil de retirar.<br>- Bloqueo de dirección patentado que fija las ruedas. <br>- Estructura reforzada con placa de metal para resistir hasta 50Kg.<br>- Plataforma extra baja para mayor estabilidad.<br>- Sistema de plegado patentado con un botón lateral seguro y fácil integrado en la plataforma, que es robusta y puede soportar hasta 50kg. Se puede plegar y llevarlo modo trolley.<br>- Ruedas de alta calidad, las dos de delante 121mm y la de atrás 80mm de PU elaboradas en ABEC 5.<br>- Con luces en las ruedas<br><br><strong>Dimensiones: </strong><br>- <strong>Modo Ride-on:</strong> 74.4 - 87.6 x 60.2 - 72.9 x 28<br>- <strong>Modo Walking bike:</strong> 35.7 - 38.6 x 56 x 26.7<br>- <strong>Modo Scooter:</strong> 67.5 - 77.5 x 56 x 28'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: '¡Este puede ser su primer patinete! Es la versión GO UP FOLDABLE PLUS LIGHTS. Es seguro, cómodo, plegable con un diseño muy moderno e ideal para potenciar el desarrollo del equilibrio de los más pequeños. Este patinete les ayuda a coordinarse de forma fácil y, sobretodo, divertida. Su valor añadido es su versatilidad, pudiendo transformarlo en patinete, bicicleta sin pedales y, colocándole el manillar, todos los papis y mamis podrán guiar o empujar a sus hijos. A parte, tiene un montón de características que lo harán único.'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Zuru Bunch o balloons. Set balloons with launcher and 105 balloons-3 assorted<br><strong>Features:</strong><br>- Contains 3 bunches of 35 balloons, all in one of the following colors: green, orange, yellow, purple, pink or blue and a launcher. <strong>They are sent randomly, you cannot choose the color of the balloons.</strong><br>- Includes a connection nozzle for garden hoses or faucets.<br>- The balloons are biodegradable and made from 100% recyclable materials.<br>- It is advisable to fill the balloons with water until they reach a diameter of 10 or 13cm.<br>- Chosen toy of the year after receiving the ToyAward 2016 prize, in the Children\'s School category, awarded at the prestigious Nuremberg International Toy Fair.<br><br><strong>Dimensions:</strong><br>Packaging: 29cm (Height) x 2.5cm (Width) x 10.5cm (Length)'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'This is the most fun balloon pack! It includes 3 packages of 35 balloons, all in one of the following colors: green, orange, yellow, purple, pink or blue and a launcher. They are sent randomly, you cannot choose the balloon color!<br><br>It is the perfect gift for any occasion! The kids will have a great time!'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: input
    }
  ]
  return await callChatCompletion({ messages })
}