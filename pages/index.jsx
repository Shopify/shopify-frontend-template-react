import {
  LegacyCard,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";

import { trophyImage } from "../assets";

import React from "react";

function IntroCard() {
  const navigate = useNavigate();

  return (
    <LegacyCard sectioned>
      <Stack
        wrap={false}
        spacing="extraTight"
        distribution="trailing"
        alignment="center"
      >
        <Stack.Item fill>
          <TextContainer spacing="loose">
            <Heading>Nice work on building a Shopify app 🎉</Heading>
            <p>
              Your app is ready to explore! It contains everything you need to
              get started including the{" "}
              <Link url="https://polaris.shopify.com/" external>
                Polaris design system
              </Link>
              ,{" "}
              <Link url="https://shopify.dev/api/admin-graphql" external>
                Shopify Admin API
              </Link>
              , and{" "}
              <Link url="https://shopify.dev/apps/tools/app-bridge" external>
                App Bridge
              </Link>{" "}
              UI library and components.
            </p>
            <p>
              Ready to go? Explore the{" "}
              <Link
                onClick={() => {
                  navigate("/product-tagger");
                }}
              >
                product tagger
              </Link>{" "}
              to see a sample of how to build an app.
            </p>
            <p>
              Learn more about building your app in{" "}
              <Link
                url="https://shopify.dev/apps/getting-started/add-functionality"
                external
              >
                this Shopify tutorial
              </Link>{" "}
              📚{" "}
            </p>
          </TextContainer>
        </Stack.Item>
        <Stack.Item>
          <div style={{ padding: "0 20px" }}>
            <Image
              source={trophyImage}
              alt="Nice work on building a Shopify app"
              width={120}
            />
          </div>
        </Stack.Item>
      </Stack>
    </LegacyCard>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Page narrowWidth>
      <TitleBar
        title="Home"
        primaryAction={{
          content: "View Product Tagger",
          onAction: () => navigate("/product-tagger"),
        }}
      />
      <Layout>
        <Layout.Section>
          <IntroCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
