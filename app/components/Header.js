import Link from 'next/link'
import React, { useRef } from 'react'
import { useInView } from 'react-intersection-observer'
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

export function Header({ router: { pathname }, scrolled }) {

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

  console.log(scrolled);

  const { allNavigationElements, _allNavigationElementsMeta } = data

  return (
    <header className={`header ${!scrolled ? "nav-scrolled" : ""}`}>
      <div className="wrap">
        <Link href="/">
          <div className="header__logo">
            <img src={`/static/${!scrolled ? "logo-inverse.png" : "logo.png"}`} alt="logo" className="header__logo__element" />
            <img src={`/static/${!scrolled ? "NYmagicians-inverse.png" : "NYmagicians.png"}`} alt="logo" className="header__logo__element" />
          </div>
        </Link>
        <nav className="nav__list">
          {allNavigationElements.map((element, index) => (
            <div key={index} className="nav__link">
              <Link href={element.url}>
                <a className={pathname === element.url ? 'currently-active' : ''}>{element.title}</a>
              </Link>
            </div>
          ))}
          <Link href="/about">
            <img src="/static/menu.png" alt="image" className="nav__menu" />
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default withRouter(Header)
