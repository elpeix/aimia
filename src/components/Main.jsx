import React, { useContext } from 'react'
import AppContext from '../contexts/AppContext'

export default function Main() {

  const { getActivePage } = useContext(AppContext)
  const activePage = getActivePage()
  const title = activePage?.name ?? '404'
  const children = activePage?.component ?? 'Page not found'

  return (
    <main className='content'>
      <div className='header'>{ title && <h1>{title}</h1> }</div>
      {children}
    </main>
  )
}
