import React from 'react'
import { call } from '../../lib/api'
import '../page.css'
import GenericCase from './GenericCase'

export default function RawMode() {

  return <GenericCase
    basePrompt={{
      system: '',
      samples: [{
        user: '',
        assistant: ''
      }] }
    }
    call={call} />

}
