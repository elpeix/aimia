import React, { useContext, useState } from 'react'
import ReactQuill from 'react-quill'
import Loading from './Loading'
import Scroller from './Scroller/Scroller'
import Prompt from './Prompt/Prompt'
import '../page.css'
import AppContext from '../contexts/AppContext'
import Options from './Options'
import { getOptionsPrompt } from '../../lib/options'

/**
 * GenericCase is a component that can be used to create a page with a text input
 * and a text output for AI text generation.
 * 
 * @param {Object} props
 * @param {Object} props.basePrompt - The base prompt to use for the text generation.
 * @param {Function} props.call - The function to call to generate text.
 */
export default function GenericCase({ basePrompt, call }) {

  const { options } = useContext(AppContext)

  const [text, setText] = useState('')
  const resultText = '<em>The&nbsp;result&nbsp;will&nbsp;appear here.</em>'
  const [result, setResult] = useState(resultText)
  const [system, setSystem] = useState(basePrompt.system)
  const [samples, setSamples] = useState([...basePrompt.samples])
  const [changedPrompt, setChangedPrompt] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.keyCode === 13) {
      handleSubmit(e)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text || !system || loading) return
    setResult('')
    setError(null)
    setLoading(true)
    const prompt = changedPrompt ? { system, samples } : basePrompt
    prompt.system = getOptionsPrompt(options, prompt.system)

    const result = await call({ input: text, prompt })
      .catch(err => {
        console.log(err)
        setError(err.message)
      })

    if (result) setResult(result)
    setLoading(false)
  }


  return (
    <div className='page'>
      <div className='page-main'>
        <Options />
        <div className='page-content'>
          <div>
            <h3>Input</h3>
            <div className='page-entry'>
              <ReactQuill
                theme='snow'
                className='page-input'
                placeholder='Enter text here.'
                value={text}
                onChange={value => setText(value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div>
            <h3>Result</h3>
            <div className='page-result'>
              {loading && <Loading />}
              <ReactQuill
                theme='snow'
                className='page-output' 
                value={result}
                modules={{ toolbar: [] }}
                readOnly />
            </div>
          </div>
        </div>
        <div className='page-buttons'>
          <button 
            type='submit'
            onClick={handleSubmit}
            disabled={!text || loading}>
            Send
          </button>

          {text && (
            <button type='reset' onClick={() => {
              setText('')
              setResult(resultText)
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
            setSystem(basePrompt.system)
            setSamples([...basePrompt.samples])
          }}
        />
      </Scroller>
    </div>
  )
 
}
