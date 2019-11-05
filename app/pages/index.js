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

const IndexPage = props => (
  <App>
    <Header />
    <PrimaryHeroSection />
    <MainInfoCardSection />
    <SecondaryHeroSection />
    <HeroCards />
    <DefaultHeroSection />
  </App>
)

export default withApollo(IndexPage)
