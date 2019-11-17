import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'
import { Html } from '../primitives/Html';
import Button from '../primitives/Button';
import InfoCard from './InfoCard';

export const INFO_CARD_SECTION_QUERY = gql`
query infoCardSection {
  allInfoCardSections {
    usingInfoCards {
      title
      value
      body
      image {
        publicUrl
      }
    }
  }
}
`

export default function MainInfoCardSection() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    INFO_CARD_SECTION_QUERY,
    {
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true
    }
  )

  if (error) return <ErrorMessage message='Error loading posts.' />
  if (loading) return <div>Loading</div>

  const { allInfoCardSections } = data

  return (
    <section className="info-card-section">
      {allInfoCardSections.map((section, index) => (
        <div key={index} className="wrap">
          {section.usingInfoCards.map((card, cardIndex) => (
            <InfoCard
              key={cardIndex}
              value={card.value}
              imageSrc={card.image.publicUrl}
              body={card.body}
            />
          ))}
        </div>
      ))}
    </section>
  )
}