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

export const descriptionPrompt = {
  system: 'You are an AI that generates a description for an eCommerce element. You receive a text from the user. Do not answer, just generate a description in HTML code. You must generate output with the same language as the input.',
  samples: [
    {
      user: '<strong>5 modalidades: </strong><br>- <strong>Modo de uso Ride-on:</strong> El patinete cuenta con unos prácticos reposapiés en los que los peques apoyan su peso para sentirse cómodos. En este caso, son los padres quienes conducen al chiquitín. Edad: 15-36 meses. Hasta 20 kgs.<br>- <strong>Modo de uso Walking Bike:</strong> La situación es similar a la anterior, pero en este caso, se retira la barra y los reposapiés para que el niño pueda apoyar los pies en el suelo y auto impulsarse ¡Es un corre-pasillos ideal! Edad: 15-36 meses. Hasta 20 kgs.<br>- <strong>Modo de uso Scooter:</strong> Se transforma en un patinete ajustable en 4 posiciones. A partir de 3 años (+50kg)<br>- <strong>Modo de uso Trolley:</strong> Listo para plegar y transportar.<br><br><strong>Características: </strong><br>- Manillar TPR duradero y cómodo, de altura regulable y en doble color. Tiene empuñaduras ergonómicas de TPR.<br>- Los reposapiés se pueden retirar fácilmente. También tiene almacenamiento inteligente.<br>- Diseñado sin tornillos para cambiar fácilmente el modo de patinete o caminador. <br>- Nuevo diseño con un robusto freno que ofrece eficiencia de frenado y prolonga la longevidad de la rueda.<br>- Barra en T de metal ajustable en 3 alturas con empuñaduras ergonómicas TPR cómodas y duraderas y una funda anti-rayado dentro del pintado columna, para niños de 15 a +7 años<br>- Sillín extra ancho de espuma EVA ajustable en 2 alturas. Está montado en la barra y es muy fácil de retirar.<br>- Bloqueo de dirección patentado que fija las ruedas. <br>- Estructura reforzada con placa de metal para resistir hasta 50Kg.<br>- Plataforma extra baja para mayor estabilidad.<br>- Sistema de plegado patentado con un botón lateral seguro y fácil integrado en la plataforma, que es robusta y puede soportar hasta 50kg. Se puede plegar y llevarlo modo trolley.<br>- Ruedas de alta calidad, las dos de delante 121mm y la de atrás 80mm de PU elaboradas en ABEC 5.<br>- Con luces en las ruedas<br><br><strong>Dimensiones: </strong><br>- <strong>Modo Ride-on:</strong> 74.4 - 87.6 x 60.2 - 72.9 x 28<br>- <strong>Modo Walking bike:</strong> 35.7 - 38.6 x 56 x 26.7<br>- <strong>Modo Scooter:</strong> 67.5 - 77.5 x 56 x 28',
      assistant: '¡Este puede ser su primer patinete! Es la versión GO UP FOLDABLE PLUS LIGHTS. Es seguro, cómodo, plegable con un diseño muy moderno e ideal para potenciar el desarrollo del equilibrio de los más pequeños. Este patinete les ayuda a coordinarse de forma fácil y, sobretodo, divertida. Su valor añadido es su versatilidad, pudiendo transformarlo en patinete, bicicleta sin pedales y, colocándole el manillar, todos los papis y mamis podrán guiar o empujar a sus hijos. A parte, tiene un montón de características que lo harán único.'
    },
    {
      user: 'Zuru Bunch o balloons. Set balloons with launcher and 105 balloons-3 assorted<br><strong>Features:</strong><br>- Contains 3 bunches of 35 balloons, all in one of the following colors: green, orange, yellow, purple, pink or blue and a launcher. <strong>They are sent randomly, you cannot choose the color of the balloons.</strong><br>- Includes a connection nozzle for garden hoses or faucets.<br>- The balloons are biodegradable and made from 100% recyclable materials.<br>- It is advisable to fill the balloons with water until they reach a diameter of 10 or 13cm.<br>- Chosen toy of the year after receiving the ToyAward 2016 prize, in the Children\'s School category, awarded at the prestigious Nuremberg International Toy Fair.<br><br><strong>Dimensions:</strong><br>Packaging: 29cm (Height) x 2.5cm (Width) x 10.5cm (Length)',
      assistant: 'This is the most fun balloon pack! It includes 3 packages of 35 balloons, all in one of the following colors: green, orange, yellow, purple, pink or blue and a launcher. They are sent randomly, you cannot choose the balloon color!<br><br>It is the perfect gift for any occasion! The kids will have a great time!'
    }
  ]
}