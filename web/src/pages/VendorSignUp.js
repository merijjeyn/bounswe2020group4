import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import 'bootstrap/dist/css/bootstrap.min.css'
import './SignIn.css'
import logo from '../logo-buyo.png'
import { connect } from 'react-redux'
import { hideHeader, showHeader } from '../redux/actions'
import history from '../util/history'
import GoogleMaps from '../components/GoogleMaps'
import { setLoginState } from '../redux/actions'


const VendorSignUp = ({hideHeader, showHeader, setLoginState}) => {

	useEffect(() => {
		hideHeader()
		return () => showHeader()
	}, [])

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [checked, setChecked] = useState(false)
	const [name, setName] = useState('')
	const [website, setWebsite] = useState('')
	const [selectedCoord, setSelectedCoord] = useState()

	const handleWebsiteChange = function(e) {
		setWebsite(e.target.value)
	}

	const handleNameChange = function(e) {
		setName(e.target.value)
	}

	const handleEmailChange = function(e) {
		setEmail(e.target.value)
	}

	const handlePasswordChange = function(e) {
		setPassword(e.target.value)
	}

	const handleClick = async function(e) {

		e.preventDefault()
		if(email == '' | password == ''){
			alert('Enter your credentials')
		} else if (!checked){
			alert('Agree to terms and conditions')
		} else if(name == '' | website == ''){
			alert('Enter required information')
		} else {
			setLoginState({userId: 1, userType: 'vendor'})
			history.goBack()
		}


	}

	const redirectToSignin = function(e) {
		e.preventDefault()
		history.push('/signin')

	}

	return (
		<div className="signInModal">
			<div className="formContainer">
				<img className="logo" src={logo} alt="Buyo logo"/>
				<Form>
					<Form.Group controlId="formBasicEmail">
						 <div className="col text-center">
							<a href="/signup">Are you a customer?</a>
						</div>
						<Form.Control
							className="formInputBox"
							type="text"
							placeholder="Name and surname"
							value = {name}
							onChange={handleNameChange}
						/>
						<Form.Control
							className="formInputBox"
							type="text"
							placeholder="Business website"
							value = {website}
							onChange={handleWebsiteChange}
						/>
						<Form.Control
							className="formInputBox"
							type="email"
							placeholder="Email"
							value = {email}
							onChange={handleEmailChange}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						<Form.Control
							className="formInputBox"
							type="password"
							placeholder="Password"
							onChange={handlePasswordChange}
						/>
					</Form.Group>
					<div className='pb-4'>
						<div className='map-label text-center'>Enter the position of your distribution center</div>
						<GoogleMaps selectedCoord={selectedCoord} setSelectedCoord={setSelectedCoord}/>
					</div>
					<Row>
						<ToggleButton variant="light" className="check-box text-left" block
							type="checkbox"
							checked={checked}
							value="1"
							onChange={e => setChecked(e.currentTarget.checked)}>
                                I agree to terms and conditions.
						</ToggleButton>
					</Row>
					<Button
						className="submitButton"
						variant="primary"
						type="submit"
						onClick = {handleClick}
					>
                            SIGN UP
					</Button>
					<Button className="submitButtonTransparent" variant="primary" type="submit">
                            SIGN UP WITH GOOGLE
					</Button>
					<Button
						className="submitButtonTransparent"
						variant="primary"
						type="submit"
						onClick = {redirectToSignin}>
                            SIGN IN
					</Button>
				</Form>
			</div>
		</div>

	)

}


export default connect(null, {showHeader, hideHeader, setLoginState})(VendorSignUp)