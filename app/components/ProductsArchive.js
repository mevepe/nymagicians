import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Html } from '../primitives/Html'
import "../style.scss"

export const ALL_STORE_DATA = gql`
query allStoreData {
  allStoreCategories {
    id
    name
    slug
    products {
      id
      title
      slug
      body
      image {
        id
        filename
        publicUrl
      }
    }
  }
}

`

export default function ProductsArchive() {
	const { loading, error, data, fetchMore, networkStatus } = useQuery(
		ALL_STORE_DATA,
		{
			// Setting this value to true will make the component rerender when
			// the "networkStatus" changes, so we are able to know if it is fetching
			// more data
			notifyOnNetworkStatusChange: true
		}
	)

	if (error) return <ErrorMessage message='Error loading posts.' />
	if (loading) return <div>Loading</div>

	const { allStoreCategories, _allStoreCategoriesMeta } = data

	return (
		<section className="hero-cards-section">
			<div className="wrap">
				{allStoreCategories.map((category, index) => (
					category.products.map((card, index) => (
						<div key={index} className="hero-card">
							<div className="layout-column image">
								{card.image &&
									<img src={card.image.publicUrl} className="hero-card__image" />}
							</div>
							<div className="layout-column title">
								<h2 className="hero-card__title">{card.title}</h2>
							</div>
							<Html markup={card.body} className="layout-column content hero-card-body" />
						</div>
					))
				))}
			</div>
		</section >
	)
}