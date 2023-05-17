import React, { useContext } from 'react'
import { AppContext } from '../App'

export default function Home() {

  const app = useContext(AppContext)

  return (
    <div className='home'>
      <img className='home-icon' src='/ico.svg' alt='Google Translate' />
      <ul>
        { app.pages.map((page, index) => (
          <li key={index}>
            <a onClick={() => app.changeView(page.view)}>{page.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
