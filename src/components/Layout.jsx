import React from 'react'
import Nav from './Nav'
import Main from './Main'

export default function Layout() {
  return (
    <div className='layout'>
      <header>
        <Nav />
      </header>
      <Main />
      <footer>
        <p>
          {new Date().getFullYear()} {' - '}
          <a href="https://github.com/elpeix" target="_blank" rel="noreferrer">
            elPeix
          </a>
        </p>
      </footer>
    </div>
  )
}