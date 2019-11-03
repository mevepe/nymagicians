import App from '../components/App'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import Submit from '../components/Submit'
import PostList from '../components/PostList'
import { withApollo } from '../lib/apollo'
import "../style.scss"

const IndexPage = props => (
  <App>
    <Header />
  </App>
)

export default withApollo(IndexPage)
