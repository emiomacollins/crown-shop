import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as yup from 'yup';
import { getSignUpErrorMessage } from '../../REDUX/userState';
import { signUp } from '../../REDUX/userThunks';
import { Textbox } from '../Reusables/FormElements';

function Signup() {
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState('');
	const [message, setMessage] = useState('');
	const signUpErrorMessage = useSelector(getSignUpErrorMessage);

	useEffect(() => {
		if (signUpErrorMessage) {
			setMessage('');
			setErrorMessage(signUpErrorMessage);
		}
	}, [signUpErrorMessage]);

	return (
		<Formik
			initialValues={{
				displayName: '',
				email: '',
				password: '',
				confirmPassword: '',
			}}
			validationSchema={yup.object({
				displayName: yup.string().required('field cannot be empty'),
				email: yup
					.string()
					.email('Invalid email')
					.required('field cannot be empty'),
				password: yup
					.string()
					.min(6, 'At least 6 characters')
					.max(20)
					.required('field cannot be empty'),
				confirmPassword: yup
					.string()
					.required('field cannot be empty')
					.oneOf([yup.ref('password'), null], 'Passwords must match'),
			})}
			onSubmit={async (values, { setSubmitting }) => {
				const { displayName, email, password } = values;
				setSubmitting(true);
				setErrorMessage('');
				setMessage('signing in...');
				dispatch(signUp({ displayName, email, password }));
			}}
		>
			{(formik) => {
				const { isSubmitting } = formik;

				return (
					<section className="signup">
						<h1 className="authentication__title">I Dont have an account</h1>

						<Form className="form">
							<Textbox label="Name" name="displayName" />
							<Textbox label="Email" name="email" />
							<Textbox label="Password" name="password" type="password" />
							<Textbox
								label="Confirm Password"
								name="confirmPassword"
								type="password"
							/>

							<p className="message">{message}</p>
							<p className="message message--error">{errorMessage}</p>

							<input
								className="btn form__btn"
								type="submit"
								value="SIGN UP"
								disabled={isSubmitting}
							/>
						</Form>
					</section>
				);
			}}
		</Formik>
	);
}

export default withRouter(Signup);
