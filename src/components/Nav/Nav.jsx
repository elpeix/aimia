
import React, { useContext } from 'react'
import styles from './Nav.module.css'
import AppContext from '../../contexts/AppContext'

export default function Nav() {

  const { view, changeView, pages } = useContext(AppContext)
  
  return (
    <nav className={styles.nav}>
      <ul>
        <li className={ view === 'home' ? styles.active : ''}>
          <a onClick={() => changeView('home')}>
            <img src='/ico.svg' alt='AI Tools' />
            Home
          </a>
        </li>
      </ul>
      <ul>
        { pages.map((page, index) => (
          <li key={index} className={ page.view === view ? styles.active : '' }>
            <a onClick={() => changeView(page.view)}>{page.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
