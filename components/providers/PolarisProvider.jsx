import { useCallback } from 'react'
import { AppProvider } from '@shopify/polaris'
import { useNavigate } from '@shopify/app-bridge-react'
import translations from '@shopify/polaris/locales/en.json'
import '@shopify/polaris/build/esm/styles.css'

function AppBridgeLink({ url, children, className, external, ...rest }) {
  const navigate = useNavigate()
  const handleClick = useCallback(() => {
    navigate(url)
  }, [url])

  if (external) {
    return (
      <a target="_blank" rel="noopener noreferrer" href={url} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <a onClick={handleClick} {...{ className }}>
      {children}
    </a>
  )
}

export function PolarisProvider({ children }) {
  return (
    <AppProvider i18n={translations} linkComponent={AppBridgeLink}>
      {children}
    </AppProvider>
  )
}
