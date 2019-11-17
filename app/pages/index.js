import App from '../components/App'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import HeroCards from '../components/HeroCards'
import Submit from '../components/Submit'
import PostList from '../components/PostList'
import { withApollo } from '../lib/apollo'
import "../style.scss"
import PrimaryHeroSection from '../components/PrimaryHeroSection'
import SecondaryHeroSection from '../components/SecondaryHeroSection'
import DefaultHeroSection from '../components/DefaultHeroSection'
import MainInfoCardSection from '../components/MainInfoCardSection'
import { useInView } from 'react-intersection-observer'

function IndexPage(props) {
  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold: 0.9,
  })

  return (
    <App>
      <Header scrolled={inView} />
      <PrimaryHeroSection ref={ref} />
      <MainInfoCardSection />
      <SecondaryHeroSection />
      <HeroCards />
      <DefaultHeroSection />
    </App>
  )
}

export default withApollo(IndexPage)
