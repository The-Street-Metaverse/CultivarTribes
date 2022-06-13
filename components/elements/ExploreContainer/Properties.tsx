import { FunctionComponent, useMemo, useState } from 'react'
import styles from './ExploreContainer.module.scss'
import type { Item } from '~/pages/api/items'

const Properties: FunctionComponent<PropertiesProps> = ({ asset }) => {
  return (
    <>
      {asset.properties && asset.properties.length > 0 ? (
        <ul className={styles.properties}>
          {asset.properties.map((property, index) => (
            <li className={styles.properties__item} key={index}>
              <span className={styles.properties__label}>{property.title}: </span>
              {property.value}
            </li>
           ))}
        </ul>
      ) : null}
    </>
  )
}

interface PropertiesProps {
  asset: Item
}

export default Properties
