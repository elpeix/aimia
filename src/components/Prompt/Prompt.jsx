import React, { useState } from 'react'
import styles from './Prompt.module.css'

export default function Prompt({ prompt }) {

  const [system, setSystem] = useState(prompt.system)
  const [samples, setSamples] = useState(prompt.samples)
  

  return (
    <>
      <div>
        <h3>System</h3>
        <textarea 
          value={system}
          onChange={e => setSystem(e.target.value)}
        />
      </div>
      <div className={styles.samples}>
        <h3>Samples</h3>
        <button onClick={() => setSamples([...samples, { user: '', assistant: '' }])}>Add Sample</button>
        {
          samples.map((sample, index) => {
            return (
              <div key={index}>
                <button onClick={() => {
                  const newSamples = [...samples]
                  newSamples.splice(index, 1)
                  setSamples(newSamples)
                }}>⨉</button>
                <h4>User</h4>
                <textarea 
                  value={sample.user}
                  onChange={e => {
                    const newSamples = [...samples]
                    newSamples[index].user = e.target.value
                    setSamples(newSamples)
                  }}
                />
                <h4>Assistant</h4>
                <textarea
                  value={sample.assistant} 
                  onChange={e => {
                    const newSamples = [...samples]
                    newSamples[index].assistant = e.target.value
                    setSamples(newSamples)
                  }}
                />
              </div>
            )
          })
        }
        <button onClick={() => setSamples(prompt.samples)}>Reset samples</button>
      </div>
    </>
  )
}
