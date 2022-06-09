import { useEffect, useState } from 'react'
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
} from '@shopify/polaris'
import { Toast } from '@shopify/app-bridge-react'
import { gql } from 'graphql-request'
import { useAppQuery, useShopifyMutation } from '../hooks'

const PRODUCTS_QUERY = gql`
  mutation populateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
      }
    }
  }
`
export function ProductsCard() {
  const [populateProduct, { isLoading }] = useShopifyMutation({
    query: PRODUCTS_QUERY,
  })
  const [productCount, setProductCount] = useState('-')
  const [hasResults, setHasResults] = useState(false)

  const {
    data,
    refetch,
  } = useAppQuery({
    url: '/api/products-count',
  })

  useEffect(() => {
    if (data?.count) {
      setProductCount(data.count)
    }
  }, [data?.count, hasResults])

  const toastMarkup = hasResults && (
    <Toast
      content="5 products created!"
      onDismiss={() => setHasResults(false)}
    />
  )

  const handlePopulate = () => {
    Promise.all(
      Array.from({ length: 5 }).map(() =>
        populateProduct({
          input: {
            title: randomTitle(),
            variants: [{ price: randomPrice() }],
          },
        })
      )
    ).then(() => {
      refetch()
      setHasResults(true)
    })
  }

  return (
    <>
      {toastMarkup}
      <Card
        title="Product Counter"
        sectioned
        primaryFooterAction={{
          content: 'Populate 5 products',
          onAction: handlePopulate,
          loading: isLoading,
        }}
      >
        <TextContainer spacing="loose">
          <p>
            Sample products are created with a default title and price. You can
            remove them at any time.
          </p>
          <Heading element="h4">
            TOTAL PRODUCTS
            <DisplayText size="medium">
              <TextStyle variation="strong">{productCount}</TextStyle>
            </DisplayText>
          </Heading>
        </TextContainer>
      </Card>
    </>
  )
}

function randomTitle() {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)]
  return `${adjective} ${noun}`
}

function randomPrice() {
  return Math.round((Math.random() * 10 + Number.EPSILON) * 100) / 100
}

const ADJECTIVES = [
  'autumn',
  'hidden',
  'bitter',
  'misty',
  'silent',
  'empty',
  'dry',
  'dark',
  'summer',
  'icy',
  'delicate',
  'quiet',
  'white',
  'cool',
  'spring',
  'winter',
  'patient',
  'twilight',
  'dawn',
  'crimson',
  'wispy',
  'weathered',
  'blue',
  'billowing',
  'broken',
  'cold',
  'damp',
  'falling',
  'frosty',
  'green',
  'long',
]

const NOUNS = [
  'waterfall',
  'river',
  'breeze',
  'moon',
  'rain',
  'wind',
  'sea',
  'morning',
  'snow',
  'lake',
  'sunset',
  'pine',
  'shadow',
  'leaf',
  'dawn',
  'glitter',
  'forest',
  'hill',
  'cloud',
  'meadow',
  'sun',
  'glade',
  'bird',
  'brook',
  'butterfly',
  'bush',
  'dew',
  'dust',
  'field',
  'fire',
  'flower',
]