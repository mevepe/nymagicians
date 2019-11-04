import Link from 'next/link'
import { withRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'

export const ALL_NAV_ELEMENTS_QUERY = gql`
  query allNavigationElements {
    allNavigationElements(orderBy: "index_ASC") {
      id
      title
      url
      index
    }
    _allNavigationElementsMeta {
      count
    }
  }
`

export function Header ({ router: { pathname } }) {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_NAV_ELEMENTS_QUERY,
    {
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true
    }
  )

  if (error) return <ErrorMessage message='Error loading navigation.' />
  if (loading) return <div>Loading</div>

  const { allNavigationElements, _allNavigationElementsMeta } = data

  return (
    <header>
      <Link href="/">
        <div>
          <img src="/static/logo.png" alt="logo" />
          <img src="/static/NYmagicians.png" alt="logo" />
        </div>
      </Link>
      <nav>
        {allNavigationElements.map((element, index) => (
          <div key={index} className="nav-element">
            <Link href={element.url}>
              <a className={pathname === element.url ? 'is-active' : ''}>{element.title}</a>
            </Link>
          </div>
        ))}
      </nav>
      <Link href="/about">
        <img src="/static/icons-1.png" alt="image" />
      </Link>
    </header>
  )
}

export default withRouter(Header)
