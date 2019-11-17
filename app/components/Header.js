import Link from 'next/link'
import React, { useState } from 'react';
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

export function Header({ router: { pathname } }) {
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
    <header className="header">
      <div className="wrap">
        <Link href="/">
          <div className="header__logo">
            <img src="/static/logo.png" alt="logo" className="header__logo__element" />
            <img src="/static/NYmagicians.png" alt="logo" className="header__logo__element" />
          </div>
        </Link>
        <nav className="header__main-navigation">
          {allNavigationElements.map((element, index) => (
            <div key={index} className="header__main-navigation__nav-element">
              <Link href={element.url}>
                <a className={pathname === element.url ? 'currently-active' : ''}>{element.title}</a>
              </Link>
            </div>
          ))}
          <Link href="/about">
            <img src="/static/menu.png" alt="image" className="header__main-navigation__menu-button" />
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default withRouter(Header)
