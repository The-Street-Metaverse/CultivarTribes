import { FunctionComponent } from 'react'
import AboutContainer from '~/components/elements/AboutContainer'
import Configuration from '~/utils/configuration'
import type { Item } from '~/pages/api/items'

const About: FunctionComponent = () => {
  return (
    <AboutContainer
      id="about"
      beforeTitle="Welcome to"
      title={Configuration.title}
      subtitle={(
        <div>
          <p>
            A catalog of digital NFT Art Collectables with embedded membership goodies for holders; and the genesis of the “Cultivar” genre of avatar creations for participating brand merchants, flower-loving collectors, and traders belonging to the Cannabis Tribes Member Community. These little farmhand creatures love to till the land, grow the flower, and pack the buds
            Monster Shelter is a generative collection of animated monsters NFT with a variety of colorful backgrounds, 
            inspired by horror culture. Each monster has up to 10 traits on itself and its own color palette, 
            creating an individual appearance and character of the animal.
          </p>
          <p>
           Buy Cultivars, Earn Cultivar Rewards and Experience Cultivar Grade Flower Power from the Best Growers!
          </p>
        </div>
      )}
    >
      <div>
        <iframe style={{ aspectRatio: '560 / 315', width: '100%' }} src="https://www.youtube-nocookie.com/embed/ysuZ_SW2bK0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    </AboutContainer>
  )
}

export default About
