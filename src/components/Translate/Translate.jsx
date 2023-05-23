import React, { useState } from 'react'
import { translate } from '../../../lib/api.js'
import Loading from '../Loading.jsx'
import '../../page.css'
import { translatePrompt } from '../../../lib/prompts.js'
import Prompt from '../Prompt/Prompt.jsx'
import Scroller from '../Scroller/Scroller.jsx'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Tooltip from '../Tooltip.jsx'
import HelpIcon from '../HelpIcon.jsx'

export default function Translate() {

  const [from, setFrom] = useState('auto')
  const [to, setTo] = useState('es')
  const [text, setText] = useState('')
  const [system, setSystem] = useState(translatePrompt.system)
  const [samples, setSamples] = useState([...translatePrompt.samples])
  const resultText = '<em>The&nbsp;result&nbsp;will&nbsp;appear here.</em>'
  const [translation, setTranslation] = useState(resultText)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [changedPrompt, setChangedPrompt] = useState(false)

  const [showAdvanced, setShowAdvanced] = useState(false)
  const [commerceDescription, setCommerceDescription] = useState('')
  const [productName, setProductName] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [toneOfVoice, setToneOfVoice] = useState('')


  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ca', name: 'Catalan' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' }
  ]

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.keyCode === 13) {
      handleSubmit(e)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text || loading || from === to) return
    setTranslation('')
    setError('')
    setLoading(true)
    const prompt = changedPrompt ? {system, samples} : translatePrompt

    console.log('commerceDescription', commerceDescription)
    console.log('productName', productName)
    console.log('targetAudience', targetAudience)
    console.log('toneOfVoice', toneOfVoice)
    
    if (toneOfVoice) {
      if (productName) {
        if (prompt.system.includes('<productName>')) {
          prompt.system = prompt.system.replace(/<productName>/g, productName)
        } else {
          prompt.system = `It works for the product ${productName}. ${prompt.system}` 
        }
      }
      if (prompt.system.includes('<toneOfVoice>')) {
        prompt.system = prompt.system.replace(/<toneOfVoice>/g, toneOfVoice)
      } else {
        prompt.system = `It has a ${toneOfVoice} tone of voice. ${prompt.system}` 
      }
    }
    if (targetAudience) {
      if (prompt.system.includes('<targetAudience>')) {
        prompt.system = prompt.system.replace(/<targetAudience>/g, targetAudience)
      } else {
        prompt.system = `It is designed for ${targetAudience}. ${prompt.system}` 
      }
    }
    if (commerceDescription) {
      if (prompt.system.includes('<commerceDescription>')) {
        prompt.system = prompt.system.replace(/<commerceDescription>/g, commerceDescription)
      } else {
        prompt.system = `Your assistant is a ${commerceDescription} ecommerce assistant. ${prompt.system}` 
      }
    }
    console.log('system', prompt.system)

    if (prompt.system) {
      setLoading(false)
      return
    }


    const result = await translate({ from, to, input: text, prompt })
      .catch(err => {
        console.log(err)
        setError(err.message)
      })

    if (result) setTranslation(result)
    setLoading(false)
  }

  return (
    <div className='page'>
      <div className='page-main'>
        { showAdvanced && (
          <>
            <div className='page-topics'>
              <div>
                <a onClick={() => setShowAdvanced(false)}>Hide additional options</a>
                <p>
                  <Tooltip title={`
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
                  `}>
                    <span className='page-topics-help'><HelpIcon /></span>
                  </Tooltip>
                </p>
              </div>
              <div>
              </div>
            </div>
            <div className='page-topics'>
              <div>
                <h4>Commerce description</h4>
                <textarea
                  placeholder="Enter commerce description"
                  value={commerceDescription}
                  onChange={e => setCommerceDescription(e.target.value)}
                />
              </div>
            </div>
            <div className='page-topics'>
              <div>
                <h4>Product name</h4>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                />
              </div>
              <div>
                <h4>Target audience</h4>
                <input
                  type="text"
                  placeholder="Enter target audience"
                  value={targetAudience}
                  onChange={e => setTargetAudience(e.target.value)}
                />
              </div>
              <div>
                <h4>Tone of voice</h4>
                <input 
                  type="text"
                  placeholder="informal, formal, friendly, professional"
                  value={toneOfVoice}
                  onChange={e => setToneOfVoice(e.target.value)}
                />

              </div>
            </div>
          </>
        )}
        { !showAdvanced && (
          <div className='page-topics'>
            <div>
              <a onClick={() => setShowAdvanced(true)}>Show additional options</a>
            </div>
          </div>
        )}
        <div className='page-content'>
          <div>
            <h3>From</h3>
            <select value={from} onChange={e => setFrom(e.target.value)}>
              <option value='auto'>Auto Detect</option>
              {languages.map((language, index) => (
                <option key={index} value={language.code}>{language.name}</option>
              ))}
            </select>
            <ReactQuill
              theme='snow'
              className='page-input'
              placeholder='Enter text to translate'
              value={text}
              onChange={(value) => setText(value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div>
            <h3>To</h3>
            <select value={to} onChange={e => setTo(e.target.value)}>
              {languages.map((language, index) => (
                <option key={index} value={language.code}>{language.name}</option>
              ))}
            </select>
            <div className='page-result'>
              {loading && <Loading />}
              <ReactQuill
                theme='snow'
                className='page-output' 
                value={translation}
                modules={{ 
                  toolbar: []
                }}
                readOnly />
            </div>
          </div>
        </div>
        <div className='page-buttons'>
          <button 
            type='submit'
            onClick={handleSubmit}
            disabled={!text || loading || from === to}>
            Translate
          </button>
          {translation && translation !== resultText && (
            <button onClick={() => {
              setText(translation)
              setTranslation('')
            }}>
              Use Translation
            </button>
          )}

          {text && (
            <button type='reset' onClick={() => {
              setText('')
              setTranslation(resultText)
              setError(null)
            }}>
              Clear
            </button>
          )}
        </div>

        {error && <p className='error'>{error}</p>}
      </div>
      <Scroller className='page-sideBar'>
        <Prompt
          system={system}
          samples={samples}
          setSystem={(newSystem) => {
            setChangedPrompt(true)
            setSystem(newSystem)
          }}
          setSamples={(newSamples) => {
            setChangedPrompt(true)
            setSamples(newSamples)
          }}
          changed = {changedPrompt}
          reset={() => {
            setChangedPrompt(false)
            setSystem(translatePrompt.system)
            setSamples([...translatePrompt.samples])
          }}
        />
      </Scroller>
    </div>
  )
}
