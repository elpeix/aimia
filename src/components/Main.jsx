import React, { useContext } from 'react'
import { AppContext } from '../App'

export default function Main() {

  const app = useContext(AppContext)
  const title = app.activePage?.name ?? '404'
  const children = app.activePage?.component ?? <div>Page not found</div>

  return (
    <main className='content'>
      { title && <h1>{title}</h1> }
      {children}
    </main>
  )
}
