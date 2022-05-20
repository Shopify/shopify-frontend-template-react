import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { NavigationMenu as AppBridgeNavigationMenu } from '@shopify/app-bridge-react'

const NAVIGATION_LINKS = [
  {
    label: 'Tab 1',
    destination: '/',
  },
  {
    label: 'Tab 2',
    destination: '/tab2',
  },
]

export function NavigationMenu() {
  const { pathname } = useLocation()

  const matcher = useCallback(
    (link) => link.destination === pathname,
    [pathname]
  )

  return (
    <AppBridgeNavigationMenu
      matcher={matcher}
      navigationLinks={NAVIGATION_LINKS}
    />
  )
}
