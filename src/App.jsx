import React, { useState } from 'react'

import './App.css'
import Layout from './components/Layout'
import Translate from './pages/Translate'
import Home from './pages/Home'
import RawMode from './components/RawMode'
import About from './pages/About'
import Descriptor from './pages/Descriptor'
import AppContext from './contexts/AppContext'
import { options as defaultOptions, getOptionsPrompt } from '../lib/options'
import NotFound from './pages/NotFound'

const getState = () => {
  const path = window.location.pathname
  return path === '/' ? 'home' : path.slice(1)
}

export default function App() {

  const [page, setPage] = useState(getState())
  const [showOptions, setShowOptions] = useState(false)
  const [options, setOptions] = useState(defaultOptions)

  const home = { name: '', view: 'home', component: <Home /> }
  const notFound = { name: '404', view: '404', component: <NotFound /> }
  const pages = [
    { name: 'Translate', view: 'translate', component: <Translate /> },
    { name: 'Generate description', view: 'descriptor', component: <Descriptor /> },
    { name: 'Free content', view: 'free', component: <RawMode /> },
    { name: 'About', view: 'about', component: <About /> },
  ]

  const changeView = (view) => {
    history.pushState({}, '', `/${view === 'home' ? '' : view}`)
    pages.find(page => page.view === view) 
      ? setPage(view)
      : setPage('home')
  }

  
  const getActivePage = () => {
    const activePage = page === 'home'
      ? home
      : pages.find(p => p.view === page)
    return activePage ?? notFound
  }
   
  window.onpopstate = () => {
    setPage(getState())
  }

  const updateOption = (key, value) => {
    if (key in options) {
      setOptions({ ...options, [key]: value})
    }
  }
  
  const value = { 
    view: page,
    changeView,
    getActivePage,
    pages,
    showOptions,
    setShowOptions,
    options,
    updateOption,
    getOptionsPrompt
  }

  return (
    <AppContext.Provider value={value}>
      <Layout />
    </AppContext.Provider>
  )
}

