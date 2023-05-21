import React, { useState } from 'react'
import { translate } from '../../../lib/api.js'
import Loading from '../Loading.jsx'
import styles from './Translate.module.css'
import { translatePrompt } from '../../../lib/prompts.js'
import Prompt from '../Prompt/Prompt.jsx'
import Scroller from '../Scroller/Scroller.jsx'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function Translate() {

  const [from, setFrom] = useState('auto')
  const [to, setTo] = useState('es')
  const [text, setText] = useState('')
  const resultText = '<em>The&nbsp;result&nbsp;will&nbsp;appear here.</em>'
  const [translation, setTranslation] = useState(resultText)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [changedPrompt, setChangedPrompt] = useState({ changed: false, system: '', samples: [] })

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
    setLoading(true)
    const prompt = changedPrompt.changed ? changedPrompt : translatePrompt
    const result = await translate({ from, to, input: text, prompt })
      .catch(err => {
        console.log(err)
        setError(err.message)
      })

    if (result) setTranslation(result)
    setLoading(false)
  }

  return (
    <div className={styles.translate}>
      <div className={styles.main}>
        <div className={styles.content}>
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
              className={styles.input}
              placeholder='Enter text to translate'
              value={text}
              onChange={(e) => setText(e.target.value)}
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
            <div className={styles.result}>
              {loading && <Loading />}
              <ReactQuill
                theme='snow'
                className={styles.output} 
                value={translation}
                modules={{ 
                  toolbar: []
                }}
                readOnly />
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
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
              setTranslation('')
            }}>
              Clear
            </button>
          )}
        </div>

        {error && <p className='error'>{error}</p>}
      </div>
      <Scroller className={`${styles.sideBar} scrollable top`}>
        <Prompt
          prompt={translatePrompt}
          onChange={(data) => setChangedPrompt(data)} />
      </Scroller>
    </div>
  )
}
