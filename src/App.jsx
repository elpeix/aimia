import React, { createContext, useState } from 'react'

import './App.css'
import Layout from './components/Layout'
import Translate from './components/Translate'
import Home from './components/Home'

export const AppContext = createContext()

export default function App() {

  const [view, setView] = useState('home')

  const home = { name: 'Home', view: 'home', component: <Home /> }
  const pages = [
    { name: 'Translate', view: 'translate', component: <Translate /> },
    { name: 'Create content', view: 'create' },
    { name: 'About', view: 'about' },
    { name: 'Profile', view: 'profile' },
    { name: 'Settings', view: 'settings' },
  ]

  const changeView = (view) => {
    pages.find(page => page.view === view) 
      ? setView(view)
      : setView('home')
  }

  const activePage = view === 'home'
    ? home
    : pages.find(page => page.view === view)
  
  const value = { view, changeView, activePage, pages }

  return (
    <AppContext.Provider value={value}>
      <Layout />
    </AppContext.Provider>
  )
}

