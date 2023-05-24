import React, { useContext } from 'react'
import AppContext from '../contexts/AppContext'

export default function Home() {

  const { pages, changeView } = useContext(AppContext)

  return (
    <div className='home'>
      <img className='home-icon' src='/ico.svg' alt='AI Tools' />
      <ul>
        { pages.map((page, index) => (
          <li key={index}>
            <a onClick={() => changeView(page.view)}>{page.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
