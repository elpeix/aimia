import React, { createContext, useState } from 'react'

import './App.css'
import Layout from './components/Layout'
import Translate from './components/Translate/Translate'
import Home from './components/Home'
import RawMode from './components/RawMode'
import About from './components/About'
import Descriptor from './components/Descriptor'

export const AppContext = createContext()

export default function App() {

  const [view, setView] = useState('home')

  const home = { name: '', view: 'home', component: <Home /> }
  const pages = [
    { name: 'Translate', view: 'translate', component: <Translate /> },
    { name: 'Generate description', view: 'descriptor', component: <Descriptor /> },
    { name: 'Free content', view: 'free', component: <RawMode /> },
    { name: 'About', view: 'about', component: <About /> },
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

