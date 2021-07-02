import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { signInWithGoogle, auth } from '../../FIREBASE/firebaseUtil';

function SignIn({ history }) {
	let [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [message, setMessage] = useState('');
	const [messageIsError, setMessageIsError] = useState(true);

	async function handleSubmit(e) {
		e.preventDefault();
		const { email, password } = formData;
		try {
			setMessageIsError(false);
			setMessage('signing in...');
			await auth.signInWithEmailAndPassword(email, password);
			resetForm();
		} catch (error) {
			setMessageIsError(true);
			setMessage(error.message);
		}
	}

	async function handlesignInWithGoogle() {
		try {
			setMessage('');
			await signInWithGoogle();
		} catch (error) {
			setMessage("couldn't sign in. try again");
		}
	}

	function resetForm() {
		setFormData({
			email: '',
			password: '',
		});
		setMessage('');
	}

	function handleInputChange(e) {
		let { name, value } = e.target;
		setFormData({ ...formData, ...{ [name]: value } });
	}

	return (
		<section className="signin">
			<h1 className="authentication__title">I already have an account</h1>

			<form autoComplete="off" className="form" onSubmit={handleSubmit}>
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

				<p className={`message ${messageIsError && 'message--error'}`}>
					{message}
				</p>

				<div className="columns">
					<input className="btn" type="submit" value="SIGN IN" />
					<input
						className="btn btn--secondary"
						type="button"
						value="GOOGLE"
						onClick={handlesignInWithGoogle}
					/>
				</div>
			</form>
		</section>
	);
}

export default withRouter(SignIn);
