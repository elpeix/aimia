import React, { useState } from 'react'
import styles from './Prompt.module.css'

export default function Prompt({ prompt, onChange }) {

  const [system, setSystem] = useState(prompt.system)
  const [samples, setSamples] = useState(prompt.samples)

  const handleChange = (changed) => onChange({ changed, system, samples })

  return (
    <div className={styles.prompt}>
      <div className={styles.system}>
        <h3>System</h3>
        <textarea 
          value={system}
          onChange={e => {
            setSystem(e.target.value)
            handleChange(true)
          }}
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
                    handleChange(true)
                  }}>⨉</button>
                </div>
                <textarea 
                  value={sample.user}
                  onChange={e => {
                    const newSamples = [...samples]
                    newSamples[index].user = e.target.value
                    setSamples(newSamples)
                    handleChange(true)
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
                    handleChange(true)
                  }}
                />
              </div>
            )
          })
        }
        <div className={styles.sampleButtons}>
          <button onClick={() => {
            setSamples([...samples, { user: '', assistant: '' }])
            handleChange(true)
          }}>Add Sample</button>
          <button type='reset' onClick={() => {
            setSamples(prompt.samples)
            handleChange(false)
          }}>Reset samples</button>
        </div>
      </div>
    </div>
  )
}
