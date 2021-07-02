import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { auth, createUserDocument } from '../../FIREBASE/firebaseUtil';

function Signup({ history }) {
	let [formData, setFormData] = useState({
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [message, setMessage] = useState('');
	const [messageIsError, setMessageIsError] = useState(true);
	const [formDisabled, setFormDisabled] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setFormDisabled(true);
		const { email, password, confirmPassword, displayName } = formData;

		if (!(email && password && confirmPassword && displayName)) {
			setMessage('fields cannot be empty');
			return;
		}

		if (password !== confirmPassword) {
			setMessage('passwords must match');
			return;
		}

		try {
			setMessageIsError(false);
			setMessage('creating...');
			// it signs in automatically and also changes the auth state
			// to trigger the useEffect to listen for snapShots
			// & try to create a user Document but returns because there is
			// no displayName in auth and no additionalData
			const { user } = await auth.createUserWithEmailAndPassword(email, password);
			// we trigger a snapShot event by creating the userDocument here
			// & this time adding additionalData to prevent it from returning
			await createUserDocument(user, { displayName });
			resetForm();
		} catch (error) {
			console.log(error);
			setMessage(error.message);
		}
	}

	function resetForm() {
		setFormData({
			displayName: '',
			email: '',
			password: '',
			confirmPassword: '',
		});

		setMessage('');
		setMessageIsError(true);
		setFormDisabled(true);
	}

	function handleInputChange(e) {
		let { name, value } = e.target;
		setFormData({ ...formData, ...{ [name]: value } });
	}

	return (
		<section className="signup">
			<h1 className="authentication__title">I Dont have an account</h1>

			<form autoComplete="off" className="form" onSubmit={handleSubmit}>
				<div className="form__control">
					<label className="form__label">Name</label>
					<input
						className="form__input"
						onChange={handleInputChange}
						type="text"
						name="displayName"
						value={formData.displayName}
					/>
				</div>

				<div className="form__control">
					<label className="form__label">email</label>
					<input
						className="form__input"
						onChange={handleInputChange}
						type="email"
						name="email"
						value={formData.email}
					/>
				</div>

				<div className="form__control">
					<label className="form__label">password</label>
					<input
						className="form__input"
						onChange={handleInputChange}
						type="password"
						name="password"
						value={formData.password}
					/>
				</div>

				<div className="form__control">
					<label className="form__label">Confirm password</label>
					<input
						className="form__input"
						onChange={handleInputChange}
						type="password"
						name="confirmPassword"
						value={formData.confirmPassword}
					/>
				</div>

				<p className={`message ${messageIsError && 'message--error'}`}>
					{message || <br />}
				</p>

				<div className="columns">
					<input
						disabled={formDisabled}
						className="btn form__btn"
						type="submit"
						value="SIGN UP"
					/>
				</div>
			</form>
		</section>
	);
}

export default withRouter(Signup);
