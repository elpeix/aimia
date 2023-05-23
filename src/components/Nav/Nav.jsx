
import React, { useContext } from 'react'
import styles from './Nav.module.css'
import AppContext from '../../contexts/AppContext'

export default function Nav() {

  const app = useContext(AppContext)

  const handleClick = (view) => {
    app.changeView(view)
  }
  
  return (
    <nav className={styles.nav}>
      <ul>
        <li className={
          app.view === 'home' ? styles.active : ''
        }>
          <a onClick={() => handleClick('home')}>
            <img src='/ico.svg' alt='Google Translate' />
            Home
          </a>
        </li>
      </ul>
      <ul>
        { app.pages.map((page, index) => (
          <li key={index} className={
            page.view === app.view ? styles.active : ''
          }>
            <a onClick={() => handleClick(page.view)}>{page.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
