import React, { useId } from 'react'
import {Tooltip as ReactTooltip} from 'react-tooltip'

export default function Tooltip({ title, children }) {

  const id = useId()

  return (
    <>
      <span data-tooltip-id={id} data-tooltip-html={title}>
        {children}
      </span>
      <ReactTooltip 
        id={id} 
        place='bottom'
        multiline={true}
        closeOnEsc={true}
        closeOnDocumentClick={true}
        clickable={true}
        
        style={{
          zIndex: '1000',
          opacity: '0.95',
          boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
        }}
      />
    </>
  )
}
