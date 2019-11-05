import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'
import { Html } from '../primitives/Html';
import Button from '../primitives/Button';
import InfoCard from './InfoCard';

export const DEFAULT_HERO_SECTION_QUERY = gql`
query primaryHeroSection {
  allHeroSections(where: { sectionType: default }) {
    id
    title
    slug
    introText
    image {
      filename
      publicUrl
    }
    sectionType
    usingInfoCards {
      title
      value
      image {
        publicUrl
      }
      body
    }
  }
}
`

export default function DefaultHeroSection() {
    const { loading, error, data, fetchMore, networkStatus } = useQuery(
        DEFAULT_HERO_SECTION_QUERY,
        {
            // Setting this value to true will make the component rerender when
            // the "networkStatus" changes, so we are able to know if it is fetching
            // more data
            notifyOnNetworkStatusChange: true
        }
    )

    if (error) return <ErrorMessage message='Error loading posts.' />
    if (loading) return <div>Loading</div>

    const { allHeroSections } = data

    return (
        <section>
            {allHeroSections.map((section, index) => (
                <div key={index} className="primary-hero-section-wrap">
                    <h2>{section.title}</h2>
                    <Html markup={section.introText} className="hero-card-body" />
                    <Button buttonText={section.buttonText} buttonUrl={section.buttonLink} isGhost={true} />
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