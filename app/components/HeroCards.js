import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'
import { Html } from '../primitives/Html';

export const ALL_HERO_CARDS_QUERY = gql`
query allHeroCards {
  allHeroCards (where: {status: published}) {
    id
    title
    slug
    body
    cardType
    image {
      filename
      publicUrl
    }
  }
}
`

export default function HeroCards() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_HERO_CARDS_QUERY,
    {
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true
    }
  )

  if (error) return <ErrorMessage message='Error loading posts.' />
  if (loading) return <div>Loading</div>

  const { allHeroCards, _allPostsMeta } = data

  return (
    <section className="hero-cards-section">
      <div className="wrap">
        {allHeroCards.map((card, index) => (
          <div key={index} className="hero-card" type={card.cardType}>
            <div className="layout-column image">
              <img src={card.image.publicUrl} className="hero-card__image" />
            </div>
            <div className="layout-column title">
              <h2 className="hero-card__title">{card.title}</h2>
            </div>
            <Html markup={card.body} className="layout-column content hero-card-body" />
          </div>
        ))}
      </div>
    </section >
  )
}