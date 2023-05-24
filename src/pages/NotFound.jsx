import React, { useContext } from 'react'
import AppContext from '../contexts/AppContext'

export default function NotFound() {

  const { changeView } = useContext(AppContext)

  return (
    <div className='notFound'>
      <p>Page not found.</p>
      <p>
        <a onClick={() => changeView('')}>Go to home page</a>
      </p>
    </div>
  )
}
