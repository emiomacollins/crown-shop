import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signIn, signInWithGoogle } from '../../REDUX/userThunks';

function SignIn() {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async (values) => {
			const { email, password } = values;
			// implement setMessage(signing in...)
			dispatch(signIn({ email, password }));
		},
	});

	const [message, setMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const dispatch = useDispatch();

	async function handlesignInWithGoogle() {
		dispatch(signInWithGoogle());
	}

	const { handleChange, handleSubmit, values } = formik;
	const { email, password } = values;

	return (
		<section className="signin">
			<h1 className="authentication__title">I already have an account</h1>

			<form className="form" onSubmit={handleSubmit}>
				<div className="form__control">
					<label className="form__label">email</label>
					<input
						className="form__input"
						onChange={handleChange}
						type="email"
						name="email"
						value={email}
					/>
				</div>

				<div className="form__control">
					<label className="form__label">password</label>
					<input
						className="form__input"
						onChange={handleChange}
						type="password"
						name="password"
						value={password}
					/>
				</div>

				<p className={`message`}>{message}</p>
				<p className={`message message--error`}>{errorMessage}</p>

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
