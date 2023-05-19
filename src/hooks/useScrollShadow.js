import { useState } from 'react'

export function useScrollShadow() {

  const [scrollTop, setScrollTop] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  const [offsetHeight, setOffsetHeight] = useState(0)

  const initScroll = (el) => {
    setScrollTop(el.scrollTop)
    setScrollHeight(el.scrollHeight)
    setClientHeight(el.clientHeight)
    setOffsetHeight(el.offsetHeight)
  }

  const onScrollHandler = (e) => {
    setScrollTop(e.target.scrollTop)
    setScrollHeight(e.target.scrollHeight)
    setClientHeight(e.target.clientHeight)
    setOffsetHeight(e.target.offsetHeight)
  }

  const getBoxShadow = () => {
    const shadow = {
      top: false,
      bottom: false
    }
    if (scrollHeight === Math.max(offsetHeight, clientHeight)) {
      return shadow
    }
    const isBottom = clientHeight === scrollHeight - scrollTop
    const isTop = scrollTop === 0
    const isBetween = scrollTop > 0 && clientHeight < scrollHeight - scrollTop

    if (isTop) {
      shadow.bottom = true
    } else if (isBetween) {
      shadow.top = true
      shadow.bottom = true
    } else if (isBottom) {
      shadow.top = true
    }
    return shadow
  }

  return { initScroll, shadow: getBoxShadow(), onScrollHandler }
}
