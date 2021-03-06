import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories } from '../services/category'
import history from '../util/history'

import Icon from '../images/buyo-icon.png'
import ProfileIcon from '../images/profile-icon.png'
import CartIcon from '../images/cart-icon.png'
import WishlistIcon from '../images/wishlist-icon.png'
import SearchIcon from '../images/search-icon.png'

//Styling
import './Header.css'

//Berke Crash Course




const Header = ({ isLoggedIn }) => {
	const [profileMenuOpen, setProfileMenuOpen] = useState(false)
	const [selectedPath, setSelectedPath] = useState('')
	const [categories, setCategories] = useState([])
	const [searchArgs, setSearchArgs] = useState('')
	const [blankSearched, setBlankSearched] = useState(false)


	const handleDocumentClick = () => {
		if(selectedPath){
			setSelectedPath('')
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleDocumentClick)
		return () => document.removeEventListener('click', handleDocumentClick)
	})

	useEffect(async () => {
		const response = await getCategories()
		setCategories(response)
	}, [])

	const renderCategories = () => {
		return categories.map((category) => {
			const thisPathSelected = selectedPath == category.path
			const handleClick = () => {
				if(selectedPath == category.path)
					setSelectedPath('')
				else
					setSelectedPath(category.path)
			}

			return (
				<div className='category-container col py-2' key={category.name}>
					<div className='category text-center' onClick={handleClick}>{category.name}</div>
					<div className='subcategory-container text-center position-absolute container-fluid list-group mt-2' style={thisPathSelected ? {} : {maxHeight: '0', overflow: 'hidden'}}>{renderSubcategories(category.subcategories)}</div>
				</div>
			)
		})
	}

	const handleSubcategoryClick = (subc) => {
		const categoriesCleaned = subc.path.replace(/\s+/g, '+')
		history.push({
			pathname: '/products',
			search: `?categories=${categoriesCleaned}`
		})
	}

	const renderSubcategories = (subcategories) => {
		return subcategories.map((subc) => {
			return <div className='list-group-item text-center' key={subc.name} onClick={() => handleSubcategoryClick(subc)}>{subc.name}</div>
		})
	}

	const renderNotLoggedInProfileMenu = () => {
		return (
			<div className='profile-menu list-group-item text-center position-absolute'>
				<div className='list-item'>
					<Link to='/signin' className='profile-menu-text'>Sign In</Link>
				</div>
				<div className='list-item'>
					<Link to='signup' className='profile-menu-text'>Sign Up</Link>
				</div>
			</div>
		)
	}

	const onSearchArgsChange = (e) => {
		if(e.target.value) {
			setBlankSearched(false)
		}
		setSearchArgs(e.target.value)
	}

	const onSearchClick = () => {
		if(searchArgs) {
			const searchArgsCleaned = searchArgs.replace(/\s+/g, '+')
			history.push(`/products?search=${searchArgsCleaned}`)
		} else {
			setBlankSearched(true)
		}
	}

	return (
		<div className='header-container'>
			<div className='header-top-container'>
				<div className='header-icon-container'>
					<Link to='/'>
						<img className='header-icon vertical-align-middle' src={Icon} alt='site icon'/>
					</Link>
				</div>
				<div className='searchbar-container'>
					<input className={`searchbar vertical-align-middle ${blankSearched ? 'border border-danger' : null}`} type='text' placeholder='Search' value={searchArgs} onChange={onSearchArgsChange}/>
					<img className='vertical-align-middle searchbar-icon' src={SearchIcon} onClick={onSearchClick} alt='search'/>
				</div>
				<div className='header-right-container'>
					<div className='header-right-icon-container'>
						<img className='header-right-icon vertical-align-middle cursor-pointer' onClick={() => setProfileMenuOpen(!profileMenuOpen)} src={ProfileIcon} alt='profile'/>
						{profileMenuOpen
							? (isLoggedIn ? null : renderNotLoggedInProfileMenu())
							: null
						}
					</div>
					<div className='header-right-icon-container'>
						<Link to='/wishlist'>
							<img className='header-right-icon vertical-align-middle' src={WishlistIcon} alt='wishlist icon'/>
						</Link>
					</div>
					<div className='header-right-icon-container'>
						<img className='header-right-icon vertical-align-middle' src={CartIcon} alt='cart icon'/>
					</div>
				</div>
			</div>
			<div className='container-fluid py-3 px-5'>
				<div className='row'>
					{renderCategories()}
				</div>
			</div>
		</div>
	)
}

const mapStatetoProps = (state) => {
	return { isLoggedIn: state.signIn.isLoggedIn }
}

export default connect(mapStatetoProps, {})(Header)