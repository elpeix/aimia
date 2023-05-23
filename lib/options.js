export const options = {
  commerceDescription: '',
  targetAudience: '',
  toneOfVoice: '',
  productName: '',
}

export const getOptionsPrompt = (options, system) => {
  if (options.productName) {
    if (system.includes('<productName>')) {
      system = system.replace(/<productName>/g, options.productName)
    } else {
      system = `It works for the product ${options.productName}. ${system}` 
    }
  }
  if (options.toneOfVoice) {
    if (system.includes('<toneOfVoice>')) {
      system = system.replace(/<toneOfVoice>/g, options.toneOfVoice)
    } else {
      system = `It has a ${options.toneOfVoice} tone of voice. ${system}` 
    }
  }
  if (options.targetAudience) {
    if (system.includes('<targetAudience>')) {
      system = system.replace(/<targetAudience>/g, options.targetAudience)
    } else {
      system = `It is designed for ${options.targetAudience}. ${system}` 
    }
  }
  if (options.commerceDescription) {
    if (system.includes('<commerceDescription>')) {
      system = system.replace(/<commerceDescription>/g, options.commerceDescription)
    } else {
      system = `Your assistant is a ${options.commerceDescription} ecommerce assistant. ${system}` 
    }
  }

  return system

}

export const optionsHelp = `
You can use the following variables in your prompt system:
<br />
<br />
<b>&lt;commerceDescription></b>
<br />
<b>&lt;productName></b>
<br />
<b>&lt;targetAudience></b>
<br />
<b>&lt;toneOfVoice></b>
<br />
<br />
With these variables, you can create a prompt system like this:
<br />
<br />
<i>Your assistant is a &lt;commerceDescription> ecommerce assistant.<br />
It is designed for &lt;targetAudience>.<br />
It has a &lt;toneOfVoice> tone of voice.<br />
It works for the product &lt;productName><br />
...(The rest of prompt content)</i>
<br />
<br />
The system will replace the variables with the values you enter in the form.
<br />
<br />
Otherwise, the system will use the default prompt system.
`