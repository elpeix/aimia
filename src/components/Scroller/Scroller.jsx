import React, { useEffect, useRef } from 'react'
import { useScrollShadow } from '../../hooks/useScrollShadow'
import styles from './Scroller.module.css'

export default function Scroller({className, children}) {

  const { shadow, onScrollHandler, initScroll } = useScrollShadow()
  const scrollable = useRef()
  useEffect(() => initScroll(scrollable.current), [initScroll, scrollable])

  return (
    <div className={`${styles.scroller} ${className}`}>
      { shadow.top && <div className={styles.top} /> }
      <div 
        ref={scrollable}
        className={styles.scrollable + ' ' + (shadow.top || shadow.bottom ? styles.hasScroll : '')}
        onScroll={onScrollHandler}
      >
        {children}
      </div>
      { shadow.bottom && <div className={styles.bottom} /> }
    </div>
  )
}
