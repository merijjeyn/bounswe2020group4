import React from 'react'

import './ProfileInfo.css'

const ProfileInfo = () => {
	return (
		<div className='container p-3'>
			<div className='row m-3'>
				<form className="form-container">
					<div className='form-group'>
						<div className='row'>
							<div className='col-3'>
								<label hmtlFor='name'>Name</label>
							</div>
							<div className='col'>
								<input type='text' className='form-control form-control-md text-left' id='name' value='Battal'/>
							</div>
						</div>
					</div>
					<div className='form-group'>
						<div className='row'>
							<div className='col-3'>
								<label htmlFor='surname'>Surname</label>
							</div>
							<div className='col'>
								<input type='text' className='form-control form-control-md text-left' id='surname' value='Gazi'/>
							</div>
						</div>
					</div>

					<div className='form-group'>
						<div className='row'>
							<div className='col-3'>
								<label htmlFor='email'>Email</label>
							</div>
							<div className='col'>
								<input type='text' readOnly className='form-control-plaintext text-left' id='email' value='battal@hotmail.com'/>
							</div>
						</div>
					</div>
					<div className='form-group'>
						<div className='row'>
							<div className='col-3'>
								<label htmlFor='phone'>Phone number</label>
							</div>
							<div className='col'>
								<input type='text' readOnly className='form-control form-control-md text-left' id='phone' value='+901234567890'/>
							</div>
						</div>
					</div>
					<div className='form-group'>
						<div className='row'>
							<div className='col-3'>
								<label htmlFor='gender'>Gender</label>
							</div>
							<div className='col'>
								<select className="form-select form-select-lg p-1 mb-1">
									<option selected>Choose</option>
									<option value="female">Female</option>
									<option value="male">Male</option>
									<option value="other">Other</option>
									<option value="noInfo">Prefer not to say</option>
								</select>
							</div>
						</div>
					</div>
					<div className='form-group'>
						<div className='row'>
							<div className='col-3'>
								<label htmlFor='birthday'>Birthday</label>
							</div>
							<div className='col'>
								<input className='form-range form-column' type='number' id='day' min='1' max='31'/>
							</div>
							<div className='col'>
								<input className='form-range form-column' type='number' id='month' min='1' max='12'/>
							</div>
							<div className='col'>
								<input className='form-range form-column' type='number' id='year' min='1900' max='2020'/>
							</div>
						</div>
					</div>

					<div className='text-right'>
						<button type='submit' className='btn btn-danger'>Update</button>
					</div>

				</form>
			</div>
		</div>
	)
}

export default ProfileInfo