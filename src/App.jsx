import { useEffect, useState } from 'react'
import HuzalinkMarketplace from './HuzalinkMarketplace'
import LicensingPage from './LicensingPage'

function getRoute() {
  return {
    pathname: window.location.pathname,
    product: new URLSearchParams(window.location.search).get('product'),
  }
}

function App() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const onPopState = () => setRoute(getRoute())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="/"]')
      if (!anchor) return
      const url = new URL(anchor.href)
      if (url.origin !== window.location.origin) return
      e.preventDefault()
      window.history.pushState({}, '', url)
      setRoute(getRoute())
      window.scrollTo(0, 0)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const goHome = () => {
    window.history.pushState({}, '', '/')
    setRoute(getRoute())
    window.scrollTo(0, 0)
  }

  if (route.pathname.startsWith('/licensing')) {
    return <LicensingPage product={route.product} onNavigateHome={goHome} />
  }

  return <HuzalinkMarketplace />
}

export default App
