import React, { useContext } from 'react'
import AppContext from '../contexts/AppContext'
import Tooltip from './Tooltip'
import HelpIcon from './HelpIcon'
import { optionsHelp } from '../../lib/options'

export default function Options() {
  const {showOptions, setShowOptions, options, updateOption} = useContext(AppContext)

  return (
    <>
      { showOptions && (
        <>
          <div className='page-topics'>
            <div>
              <a onClick={() => setShowOptions(false)}>Hide additional options</a>
              <div className='page-topics-help'>
                <Tooltip title={optionsHelp}>
                  <HelpIcon />
                </Tooltip>
              </div>
            </div>
            <div>
            </div>
          </div>
          <div className='page-topics'>
            <div>
              <h4>Commerce description</h4>
              <textarea
                placeholder="Enter commerce description"
                value={options.commerceDescription}
                onChange={e => updateOption('commerceDescription', e.target.value)}
              />
            </div>
          </div>
          <div className='page-topics'>
            <div>
              <h4>Product name</h4>
              <input
                type="text"
                placeholder="Enter product name"
                value={options.productName}
                onChange={e => updateOption('productName', e.target.value)}
              />
            </div>
            <div>
              <h4>Target audience</h4>
              <input
                type="text"
                placeholder="Enter target audience"
                value={options.targetAudience}
                onChange={e => updateOption('targetAudience', e.target.value)}
              />
            </div>
            <div>
              <h4>Tone of voice</h4>
              <input 
                type="text"
                placeholder="informal, formal, friendly, professional"
                value={options.toneOfVoice}
                onChange={e => updateOption('toneOfVoice', e.target.value)}
              />
            </div>
          </div>
        </>
      )}
      { !showOptions && (
        <div className='page-topics'>
          <div>
            <a onClick={() => setShowOptions(true)}>Show additional options</a>
          </div>
        </div>
      )}
    </>
  )
}
