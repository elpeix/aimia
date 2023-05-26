import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { translate } from '../../lib/apiDeepL.js'
import '../page.css'
import Loading from '../components/Loading.jsx'

export default function TranslateDeepL() {

  const [from, setFrom] = useState('auto')
  const [to, setTo] = useState('es')
  const [text, setText] = useState('')
  const resultText = '<em>The&nbsp;result&nbsp;will&nbsp;appear here.</em>'
  const [translation, setTranslation] = useState(resultText)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const languages = [
    { code: 'BG', name: 'Bulgarian' },
    { code: 'CS', name: 'Czech' },
    { code: 'DA', name: 'Danish' },
    { code: 'DE', name: 'German' },
    { code: 'EL', name: 'Greek' },
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Spanish' },
    { code: 'ET', name: 'Estonian' },
    { code: 'FI', name: 'Finnish' },
    { code: 'FR', name: 'French' },
    { code: 'HU', name: 'Hungarian' },
    { code: 'ID', name: 'Indonesian' },
    { code: 'IT', name: 'Italian' },
    { code: 'JA', name: 'Japanese' },
    { code: 'KO', name: 'Korean' },
    { code: 'LT', name: 'Lithuanian' },
    { code: 'LV', name: 'Latvian' },
    { code: 'NB', name: 'Norwegian (Bokmål)' },
    { code: 'NL', name: 'Dutch' },
    { code: 'PL', name: 'Polish' },
    { code: 'PT', name: 'Portuguese' },
    { code: 'RO', name: 'Romanian' },
    { code: 'RU', name: 'Russian' },
    { code: 'SK', name: 'Slovak' },
    { code: 'SL', name: 'Slovenian' },
    { code: 'SV', name: 'Swedish' },
    { code: 'TR', name: 'Turkish' },
    { code: 'UK', name: 'Ukrainian' },
    { code: 'ZH', name: 'Chinese' },
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
    const opts = {}

    const result = await translate({ from, to, input: text, options : opts })
      .catch(err => {
        console.log(err)
        setError(err.message)
      })

    if (result) setTranslation(result)
    setLoading(false)
  }

  return (
    <div className='page no-grid'>
      <div className='page-main'>
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
    </div>
  )
}
