import { FunctionComponent } from 'react'
import ExploreContainer from '~/components/elements/ExploreContainer'
import type { Item } from '~/pages/api/items'

const Explore: FunctionComponent<{ assets: Item[], asset: Item, setAsset: Function }> = ({ assets, asset, setAsset }) => {
  return (
    <ExploreContainer id="explore" assets={assets} asset={asset} setAsset={setAsset} />
  )
}

export default Explore
