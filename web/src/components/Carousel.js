import React from 'react'
import ProductCard from './ProductCard'

const Carousel = ({items, title}) => {

	const itemList = items.map((item) => {
		return (
			<div className='m-4' key={item.id} >
				<ProductCard className='img-fluid' name={item.name} imgUrl={item.imageUrl} price={item.price} productId={item.id}/>
			</div>
		)
	})

	return (
		<div className='py-4 rounded' style={{backgroundColor: 'var(--beige)'}}>
			<h3 className='px-5'>{title}</h3>
			<div className='d-flex container-fluid overflow-auto' >
				{itemList}
			</div>
		</div>
	)
}

export default Carousel