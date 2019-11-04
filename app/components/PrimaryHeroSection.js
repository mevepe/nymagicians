import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'
import { Html } from '../primitives/Html';

export const PRIMARY_HERO_SECTION_QUERY = gql`
query primaryHeroSection {
  allHeroSections(where: { sectionType: primary }) {
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
    }
  }
}
`

export default function PrimaryHeroSection() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    PRIMARY_HERO_SECTION_QUERY,
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
      {
        allHeroSections.map((section, index) => (
        <div key={index} className="primary-hero-section-wrap">
            <h2>{section.title}</h2>
            <Html markup={section.introText} className="hero-card-body" />
        </div>
        ))}
    </section>
  )
}