import { withRouter } from 'next/router'

export function App({ children }) {
  return (
    <main>
      {children}
    </main>
  )
}

export default withRouter(App);
  