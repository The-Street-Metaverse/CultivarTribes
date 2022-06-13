import { FunctionComponent } from 'react'
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Container from '~/components/elements/Container';
import type{ Item } from '~/pages/api/items';
import styles from './ExploreContainer.module.scss'
import ExploreContainerBanner from './Banner';
import ExploreContainerList from './List';
import MarketplaceButton from '~/components/elements/MarketplaceButton';
import Properties from './Properties';

const ExploreContainer: FunctionComponent<ExploreContainerProps> = ({ id, assets, asset, setAsset }) => {
  return (
    <>
      {/* List */}
      <ExploreContainerList assets={assets} pick={setAsset} />

      {/* Main */}
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={asset.id}
          classNames={{
            enter: styles['fade-enter'],
            enterActive: styles['fade-enter-active'],
            exit: styles['fade-exit'],
            exitActive: styles['fade-exit-active'],
          }}
          addEndListener={(node: any, done: any) => {
            node.addEventListener("transitionend", done, false);
          }}
        >
          <Container id={id} className={styles.container}>
            {/* Image */}
            <div className={styles.image}>
              <ExploreContainerBanner asset={asset} />
            </div>
            {/* Description */}
            <div className={styles.description}>
              <h1 className={styles.title}>{asset.title}</h1>
              <p>{asset.description}</p>

              {/* Properties */}
              <Properties asset={asset} />
            </div>
            {/* Link */}
            <div className={styles.link}>
              <MarketplaceButton to={asset.link}>
                View details and purchase
              </MarketplaceButton>
            </div>
          </Container>
        </CSSTransition>
      </SwitchTransition>
    </>
  )
}

interface ExploreContainerProps {
  id?: string,
  assets: Item[],
  asset: Item
  setAsset: Function
}

export default ExploreContainer
