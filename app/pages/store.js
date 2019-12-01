import App from '../components/App'
import Header from '../components/Header'
import { withRouter } from 'next/router'
import { withApollo } from '../lib/apollo'
import "../style.scss"
import ProductsArchive from '../components/ProductsArchive'
import { useInView } from 'react-intersection-observer'

export function Store() {
    const [ref, inView, entry] = useInView({
        /* Optional options */
        threshold: 0.9,
    })
    return (
        <App>
            <Header scrolled={inView} />
            <ProductsArchive />
        </App>
    )
}

export default withApollo(Store)
