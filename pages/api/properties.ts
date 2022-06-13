import type { NextApiRequest, NextApiResponse } from 'next'
import LRU from 'lru-cache'
import Configuration from '~/utils/configuration';
import { Item, WHITESPACE_REGEX } from '~/pages/api/items';

/** API Method */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item["properties"]>
) {
  await fetchProperties(String(req.query.id))
    .then((properties) => {
      res.setHeader('Cache-Control', 'public, maxage=300, s-maxage=600, stale-while-revalidate=21600');
      res.status(200).json(properties)
    })
    .catch((e) => {
      console.error('[api:properties] Error', e)
      res.status(200).json([])
    })
}

/** Cache */
const cache = new LRU<string, Item["properties"]>({
  maxAge: 1000 * 60 * 10 // 10 minutes
})

/** Fetcher */
export async function fetchProperties(id: string): Promise<Item["properties"]> {
  const cachedProperties = cache.get(id)

//   protocol === 'matic'

  if (cachedProperties) {
    return cachedProperties
  } else {
    const properties = await new Promise<Item["properties"]>((resolve, reject) => {
      if (Configuration.collection.type !== 'opensea' || Configuration.collection.protocol !== 'matic') {
        return []
      }

      fetch(
        `https://api.opensea.io/api/v2/metadata/matic/${id.replace(':', '/')}`,
        { headers: { 'X-API-KEY': Configuration.collection.apiToken || '' } }
      )
      .then(response => response.json())
      .then(response => (
        response.traits?.map?.((trait: any) => ({
          title: String(trait.trait_type || '').replace(WHITESPACE_REGEX, ' '),
          value: String(trait.value || '').replace(WHITESPACE_REGEX, ' ')
        })) || []
      ))
      .then(resolve)
      .catch(reject)
    })

    cache.set(id, properties);
    return properties
  }
}
