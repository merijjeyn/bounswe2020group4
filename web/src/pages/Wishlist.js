import React, { useEffect, useState } from 'react'
import history from '../util/history'
import { connect } from 'react-redux'

import ProductCard from '../components/ProductCard'
import wishlistService from '../services/wishlist'
import './Wishlist.css'

const Wishlist = (props) => {
	const [products, setProducts] = useState([])

	useEffect(() => {

		if(!props.isLoggedIn) {
			history.push('/signin')
			return
		}

		wishlistService
			.getWishlist(props.customerId)
			.then(prods => {
				setProducts(prods)
			})
	}, [props.isLoggedIn, props.customerId])

	return(
		<div className='wishlist-container'>
			<div className='list-title' >List: Wishlist(All)</div>
			<div className='list-container'>
				<div className='list-links'>
					<h3>Lists</h3>
				</div>
				<div className='product-cards'>
					{products.map(p =>
						<div key={p.id} className='product-card-container'>
							<ProductCard name={p.name} price={p.price} imgUrl={p.imageUrl} productId={p.id}/>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.signIn.isLoggedIn,
		customerId: state.signIn.userId
	}
}

export default connect(mapStateToProps)(Wishlist)