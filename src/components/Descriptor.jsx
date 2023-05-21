import React from 'react'
import GenericCase from './GenericCase'
import { descriptionPrompt } from '../../lib/prompts'
import { generateDescription } from '../../lib/api'

export default function Descriptor() {
  return (
    <GenericCase
      basePrompt={descriptionPrompt}
      call={generateDescription} />
  )
}
