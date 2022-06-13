// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import LRU from 'lru-cache'
import Configuration from '~/utils/configuration';

export type ItemProperty = { 
  title: string
  value: string
}

export type Item = {
  id: string
  image: string
  title: string
  description: string
  link: string
  properties: ItemProperty[]
}

export const WHITESPACE_REGEX = /_/g

/** API Method */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item[]>
) {
  await fetchItems()
    .then((items) => {
      if (items.length > 0) {
        res.setHeader('Cache-Control', 'public, maxage=300, s-maxage=600, stale-while-revalidate=21600');
      }

      res.status(200).json(items)
    })
    .catch((e) => {
      console.error('[api:items] Error', e)
      res.status(200).json([])
    })
}

/** Cache */
const cache = new LRU<typeof Configuration.collection, Item[]>({
  maxAge: 1000 * 60 * 10 // 10 minutes
})

/** Fetcher */
export async function fetchItems(): Promise<Item[]> {
  const cachedItems = cache.get(Configuration.collection)

  if (cachedItems && cachedItems.length > 0) {
    return cachedItems
  } else {
    const items = await new Promise<Item[]>((resolve, reject) => {
      switch (Configuration.collection.type) {
        case 'opensea':
          const protocol = Configuration.collection.protocol
          fetch(
            protocol === 'matic'
              ? `https://api.opensea.io/api/v2/assets/matic?collection_slug=${Configuration.collection.slug}`
              : `https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=50&collection=${Configuration.collection.slug}`,
            { headers: { 'X-API-KEY': Configuration.collection.apiToken || '' }
          })
          .then(response => response.json())
          .then(response => protocol === 'matic' ? response.results : response.assets)
          .then(response => {
            return response.map((item: any) => ({
              id: String(`${item.asset_contract.address}:${item.token_id}`),
              image: item.image_url || item.animation_url || item.image_original_url || item.image,
              title: item.name,
              description: item.description,
              link: item.permalink,
              properties: item.traits?.map?.((trait: any) => ({
                title: String(trait.trait_type || '').replace(WHITESPACE_REGEX, ' '),
                value: String(trait.value || '').replace(WHITESPACE_REGEX, ' ')
              })) || null
            })).sort(() => Math.random() - 0.5)
          })
          .then(response => {
            resolve(response)
          })
          .catch(reject)
          break;
        case 'rarible':
          fetch(`https://api.rarible.org/v0.1/items/byCollection?size=50&collection=${Configuration.collection.blockchain}:${Configuration.collection.address}`)
          .then(async response => {
            return (await response.json()).items.map((item: any) => ({
              id: String(item.id),
              image: (() => {
                const metaUrl = item.meta.content.find((content: any) => content['@type'] === 'IMAGE').url;
                if (!metaUrl || metaUrl.includes('ipfs://')) {
                  return `https://img.rarible.com/prod/image/upload/t_image_preview/prod-itemImages/${item.id.replace(':', '-')}`;
                }
                return metaUrl;
              })(),
              title: item.meta.name,
              description: String(item.meta.description || ''),
              link: `https://rarible.com/token/${item.id.replace(/^([A-z]+:)/, '')}`,
              properties: item.meta.attributes?.map?.((trait: any) => ({
                title: String(trait.key || '').replace(WHITESPACE_REGEX, ' '),
                value: String(trait.value || '').replace(WHITESPACE_REGEX, ' ')
              })) || []
            })).sort(() => Math.random() - 0.5)
          })
          .then(response => {
            resolve(response)
          })
          .catch(reject)
          break;
        default:
          resolve([])
      }
    })

    cache.set(Configuration.collection, items);
    return items
  }
}
