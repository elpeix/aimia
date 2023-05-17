import React, { useContext } from 'react'
import { AppContext } from '../App'

export default function Home() {

  const app = useContext(AppContext)

  return (
    <>
      <h1>Home</h1>
      <ul>
        { app.pages.map((page, index) => (
          <li key={index}>
            <a onClick={() => app.changeView(page.view)}>{page.name}</a>
          </li>
        ))}
      </ul>
    </>
  )
}
