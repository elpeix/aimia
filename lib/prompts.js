export const translatePrompt = {
  system: 'You are an AI that translates text. You receive a text from the user. Do not answer, just translate the text. The original language is surrounded by `{{` and `}}`. You can also receive {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[` and `]].` You must maintain HTML code.',
  samples: [
    {
      'user': 'Pelota de silicona de color verde {{Español}} [[English]]',
      'assistant': 'Green silicone ball'
    },
    {
      'user': 'Where to receive my order? {{auto}} [[Português]]',
      'assistant': 'Onde receber meu pedido?'
    },
    {
      'user': '<p>En el caso de haber recibido el producto defectuoso o tienes dudas con su pedido, puedes contactarnos a través de este formulario.</p><p>En el caso de que quieras realizar una devolución, por favor sigue las instrucciones detalladas en la <a href="https://ecommerce.online/politica-devoluciones" title="Politica devoluciones" target="_blank"> Política de devoluciones.</a></p> {{Español}} [[Italiano]]',
      'assistant': '<p>Se hai ricevuto un prodotto difettoso o hai domande sul tuo ordine, puoi contattarci tramite questo modulo.</p><p>Se vuoi effettuare un reso, segui le istruzioni dettagliate nella <a href="https://ecommerce.online/politica-devoluciones" title="Politica devoluciones" target="_blank"> Politica di reso.</a></p>'
    }
  ]
}

