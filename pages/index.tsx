import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import Configuration from '~/utils/configuration'
import BaseLayout from '~/components/layouts/BaseLayout'
import FAQ from '~/components/stories/FAQ'
import Team from '~/components/stories/Team'
import About from '~/components/stories/About'
import { fetchItems, Item } from '~/pages/api/items'
import { fetchProperties } from '~/pages/api/properties'
import { useEffect, useState } from 'react'
import Roadmap from '~/components/stories/Roadmap'
import Explore from '~/components/stories/Explore'

interface Props {
  assets?: Item[]
  asset?: Item
}

const Home: NextPage<Props> = ({ 
  assets: initialAssets = [],
  asset: initialAsset = null,
}) => {
  const [assets, setAssets] = useState(initialAssets)
  const [asset, setAsset] = useState<Item>(initialAsset!)
  
  useEffect(() => {
    if (assets.length === 0 && typeof window !== 'undefined') {
      fetch('/api/items')
        .then(response => response.json())
        .then(assets => {
          setAssets(assets)
          setAsset(assets[0])
        })
    }
  }, [assets])

  useEffect(() => {
    if (asset && asset.properties === null) {
      fetch(`/api/properties?id=${asset.id}`)
        .then(response => response.json())
        .then(properties => {
          setAsset({ ...asset, properties })
        })
    }
  }, [asset])
  
  if (!asset || assets.length === 0) {
    return null
  }

  return (
    <BaseLayout>
      <Head>
        <title>{Configuration.title}</title>
      </Head>

      {/* About */}
      <About />

      {/* Explore */}
      <Explore assets={assets} asset={asset} setAsset={setAsset} />

      {/* Roadmap */}
      <Roadmap />

      {/* FAQ */}
      <FAQ />

      {/* Team */}
      <Team />
      
    </BaseLayout>
  )
}

Home.getInitialProps = async function (context: NextPageContext) {
  try {
    const assets = await fetchItems()
    let asset = assets[0]

    if (asset.properties === null) {
      asset.properties = await fetchProperties(asset.id) || []
    }

    if (assets.length > 0) {
      context.res?.setHeader('Cache-Control', 'public, maxage=300, s-maxage=600, stale-while-revalidate=21600');
    }

    return { assets, asset }
  } catch {
    return { assets: [] }
  }
}

export default Home
