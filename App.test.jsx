import { vi, expect } from 'vitest'
import { mount } from 'test/mount'

import { AppProvider as PolarisProvider } from '@shopify/polaris'
import translations from '@shopify/polaris/locales/en.json'
import { BrowserRouter } from 'react-router-dom'
import { AppBridgeProvider } from 'components/providers/AppBridgeProvider'
import { GraphQLProvider } from 'components/providers/GraphQLProvider'
import { Routes } from './Routes'

import App from './App'

vi.mock('@shopify/polaris', async () => {
  const polaris = await vi.importActual('@shopify/polaris')

  return {
    ...polaris,
    AppProvider: ({ children }) => children,
  }
})

vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => children,
}))

vi.mock('components/providers/AppBridgeProvider', () => ({
  AppBridgeProvider: ({ children }) => children,
}))

vi.mock('components/providers/GraphQLProvider', () => ({
  GraphQLProvider: ({ children }) => children,
}))

vi.mock('components/TitleBarSection', () => ({
  TitleBarSection: () => null,
}))

vi.mock('./Routes', () => ({
  Routes: () => null,
}))

it('renders <AppProvider/> from @shopify/polaris', async () => {
  const component = await mount(<App />)

  expect(component).toContainReactComponent(PolarisProvider, {
    i18n: translations,
  })
})

it('renders <BrowserRouter/> from react-router-dom', async () => {
  const component = await mount(<App />)

  expect(component).toContainReactComponent(BrowserRouter)
})

it('renders <AppBridgeProvider/>', async () => {
  const component = await mount(<App />)

  expect(component).toContainReactComponent(BrowserRouter)
})

it('renders <GraphQLProvider/>', async () => {
  const component = await mount(<App />)

  expect(component).toContainReactComponent(GraphQLProvider)
})

it('renders <Routes/>', async () => {
  const component = await mount(<App />)

  expect(component).toContainReactComponent(Routes, {
    pages: import.meta.globEager('./pages/**/!(*.test.[jt]sx)*.([jt]sx)'),
  })
})
