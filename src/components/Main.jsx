import React, { useContext } from 'react'
import { AppContext } from '../App'

export default function Main() {

  const app = useContext(AppContext)
  const children = app.activePage?.component ?? <h1>404</h1>

  return (
    <main className='content'>
      {children}
    </main>
  )
}
