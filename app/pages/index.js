import App from '../components/App'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import HeroCards from '../components/HeroCards'
import Submit from '../components/Submit'
import PostList from '../components/PostList'
import { withApollo } from '../lib/apollo'
import "../style.scss"
import PrimaryHeroSection from '../components/PrimaryHeroSection'

const IndexPage = props => (
  <App>
    <Header />
    <PrimaryHeroSection />
    <HeroCards />
  </App>
)

export default withApollo(IndexPage)
