import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'
import { Html } from '../primitives/Html';
import Button from '../primitives/Button';
import SocialMedia from './SocialMedia';

export const PRIMARY_HERO_SECTION_QUERY = gql`
query primaryHeroSection {
  allHeroSections(where: { sectionType: primary }) {
    id
    title
    slug
    introText
    buttonText
    buttonLink
    image {
      filename
      publicUrl
    }
    sectionType
    usingInfoCards {
      title
      value
    }
    showSocial
    usingSocialMedia {
      title
      url
      image {
        publicUrl
      }
    }
  }
}
`

const PrimaryHeroSection = React.forwardRef((props, ref) => {
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
    allHeroSections.map((section, index) => (
      <section ref={ref} key={index} className="primary-hero-section">
        <div className="wrap">
          <div className="layout-column">
            <h2 className="primary-hero-section__title">{section.title}</h2>
            <Html markup={section.introText} className="primary-hero-section__intro-text" />
            <Button buttonText={section.buttonText} buttonUrl={section.buttonLink} isGhost={true} />
          </div>
          <div className="layout-column">
            <img src={section.image.publicUrl} className="primary-hero-section__image" />
          </div>
        </div>
        <SocialMedia socialMediaQuery={section.usingSocialMedia} />
      </section>
    ))
  )
});

export default PrimaryHeroSection;