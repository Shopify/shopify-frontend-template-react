import { BrowserRouter } from 'react-router-dom'
import { AppProvider as PolarisProvider } from '@shopify/polaris'
import translations from '@shopify/polaris/locales/en.json'
import '@shopify/polaris/build/esm/styles.css'

import { AppBridgeProvider, GraphQLProvider, TitleBarSection } from 'components'

import Routes from './Routes'

export default function App() {
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  return (
    <PolarisProvider i18n={translations}>
      <BrowserRouter>
        <AppBridgeProvider>
          <GraphQLProvider>
            <TitleBarSection />
            <Routes pages={pages} />
          </GraphQLProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  )
}
