import React, { useState } from 'react'
import { translate } from '../../lib/api.js'
import Loading from './Loading.jsx'

export default function Translate() {

  const [from, setFrom] = useState('auto')
  const [to, setTo] = useState('es')
  const [text, setText] = useState('')
  const [translation, setTranslation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

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
    const result = await translate({ from, to, input: text })
      .catch(err => {
        console.log(err)
        setError(err.message)
      })

    if (result) setTranslation(result)
    setLoading(false)
  }

  return (
    <div className='translate'>
      <h1>Translate</h1>
      <div className='translate-content'>
        <div className='translate-from'>
          <h3>From</h3>
          <select value={from} onChange={e => setFrom(e.target.value)}>
            <option value='auto'>Auto Detect</option>
            {languages.map((language, index) => (
              <option key={index} value={language.code}>{language.name}</option>
            ))}
          </select>
          <textarea
            placeholder='Enter text to translate'
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
        </div>
        <div className='translate-to'>
          <h3>To</h3>
          <select value={to} onChange={e => setTo(e.target.value)}>
            {languages.map((language, index) => (
              <option key={index} value={language.code}>{language.name}</option>
            ))}
          </select>
          <div className='translate-to-result'>
            {loading && <Loading />}
            <textarea value={translation} readOnly></textarea>
          </div>
        </div>
      </div>
              
      <div className='translate-buttons'>
        <button 
          type='submit'
          onClick={handleSubmit}
          disabled={!text || loading || from === to}>
          Translate
        </button>
        {translation && (
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
  )
}
