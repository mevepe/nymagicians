import Link from 'next/link'
import { withRouter } from 'next/router'

const Header = ({ router: { pathname } }) => (
  <header>
    <Link href='/'>
      <a className={pathname === '/' ? 'is-active' : ''}>Главная</a>
    </Link>
    <Link href='/client-only'>
      <a className={pathname === '/client-only' ? 'is-active' : ''}>
        Client-Only
      </a>
    </Link>
    <Link href='/about'>
      <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
    </Link>
    <Link href='/contacts'>
      <a className={pathname === '/about' ? 'is-active' : ''}>Контакты</a>
    </Link>
    <div className="example">Hello World!</div>
  </header>
)

export default withRouter(Header)
