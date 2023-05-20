import React, { useState } from 'react'
import styles from './Prompt.module.css'

export default function Prompt({ prompt }) {

  const [system, setSystem] = useState(prompt.system)
  const [samples, setSamples] = useState(prompt.samples)
  

  return (
    <div className={styles.prompt}>
      <div className={styles.system}>
        <h3>System</h3>
        <textarea 
          value={system}
          onChange={e => setSystem(e.target.value)}
        />
      </div>
      <div className={styles.samples}>
        <h3>Samples</h3>
        {
          samples.map((sample, index) => {
            return (
              <div key={index} className={styles.sample}>
                <div className={styles.sampleHeader}>
                  <h4>User</h4>
                  <button className={styles.delete} onClick={() => {
                    const newSamples = [...samples]
                    newSamples.splice(index, 1)
                    setSamples(newSamples)
                  }}>⨉</button>
                </div>
                <textarea 
                  value={sample.user}
                  onChange={e => {
                    const newSamples = [...samples]
                    newSamples[index].user = e.target.value
                    setSamples(newSamples)
                  }}
                />
                <div className={styles.sampleHeader}>
                  <h4>Assistant</h4>
                </div>
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
        <div className={styles.sampleButtons}>
          <button onClick={() => setSamples([...samples, { user: '', assistant: '' }])}>Add Sample</button>
          <button type='reset' onClick={() => setSamples(prompt.samples)}>Reset samples</button>
        </div>
      </div>
    </div>
  )
}
