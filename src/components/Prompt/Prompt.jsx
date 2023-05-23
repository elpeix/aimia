import React from 'react'
import styles from './Prompt.module.css'

export default function Prompt({ system, setSystem, samples, setSamples, changed, reset }) {

  return (
    <div className={styles.prompt}>
      <div className={styles.system}>
        <h2>Prompt</h2>
        <textarea 
          value={system}
          onChange={e => setSystem(e.target.value)}
        />
      </div>
      <div className={styles.samples}>
        <h3>
          Examples for improving the assistant&apos;s response
        </h3>
        { samples.length === 0 && (
          <p className={styles.samplesEmpty}>
            No examples yet. Add some to improve the assistant&apos;s response.
          </p>
        )}
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
                    const newSample = { ...newSamples[index] }
                    newSample.user = e.target.value
                    newSamples[index] = newSample
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
                    const newSample = { ...newSamples[index] }
                    newSample.assistant = e.target.value
                    newSamples[index] = newSample
                    setSamples(newSamples)
                  }}
                />
              </div>
            )
          })
        }
        <div className={styles.sampleButtons}>
          <button onClick={() => {
            const newSamples = [...samples]
            newSamples.push({ user: '', assistant: '' })
            setSamples(newSamples)
          }}>Add example</button>
          {changed && (
            <button onClick={reset} type='reset'>Reset</button>
          )}
        </div>
      </div>
    </div>
  )
}
