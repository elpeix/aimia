
import React, { useContext } from 'react'
import { AppContext } from '../App'

export default function Nav() {

  const app = useContext(AppContext)

  const handleClick = (view) => {
    app.changeView(view)
  }
  
  return (
    <nav>
      <ul>
        <li className={
          app.view === 'home' ? 'active' : ''
        }>
          <a onClick={() => handleClick('home')}>AIMIA</a>
        </li>
      </ul>
      <ul>
        { app.pages.map((page, index) => (
          <li key={index} className={
            page.view === app.view ? 'active' : ''
          }>
            <a onClick={() => handleClick(page.view)}>{page.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
