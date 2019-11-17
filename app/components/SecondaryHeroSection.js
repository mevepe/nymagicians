import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'
import { Html } from '../primitives/Html';
import Button from '../primitives/Button';

export const SECONDARY_HERO_SECTION_QUERY = gql`
query secondaryHeroSection {
  allHeroSections(where: { sectionType: secondary }) {
    id
    title
    slug
    introText
    buttonText
    buttonLink
    sectionType
  }
}
`

export default function SecondaryHeroSection() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    SECONDARY_HERO_SECTION_QUERY,
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
    <section className="secondary-hero-section">
      {
        allHeroSections.map((section, index) => (
          <div key={index} className="wrap">
            <div className="layout-row">
              <h2 className="title">{section.title}</h2>
            </div>
            <div className="layout-row">
              <Button buttonText={section.buttonText} buttonUrl={section.buttonLink} isGhost={false} />
            </div>
          </div>
        ))}
    </section>
  )
}