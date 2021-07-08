import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import * as yup from 'yup';
import { auth, createUserDocument } from '../../FIREBASE/firebaseUtil';
import { Textbox, FormEl } from '../Reusables/FormElements';

function Signup() {
	const [errorMessage, setErrorMessage] = useState('');

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

				try {
					setSubmitting(true);
					setErrorMessage('');
					// it signs in automatically
					// & triggers the onAuthStateChanged then trys to
					// create a user Document but returns because there is
					// no displayName in auth and no additionalData
					const { user } = await auth.createUserWithEmailAndPassword(
						email,
						password
					);

					// we now create the correct userDocument here
					// by adding additionalData to set the displayName
					// & prevent the createUserDocument function from returning
					await createUserDocument(user, { displayName });
				} catch (error) {
					console.log(error);
					setSubmitting(false);
					setErrorMessage(error.message);
				}
			}}
		>
			{(formik) => {
				const { isSubmitting, isValid } = formik;

				return (
					<section className="signup">
						<h1 className="authentication__title">I Dont have an account</h1>
						<Form className="form" autoComplete="off">
							<Textbox label="Name" name="displayName" />
							<Textbox label="Email" name="email" />
							<Textbox label="Password" name="password" type="password" />
							<Textbox
								label="Confirm Password"
								name="confirmPassword"
								type="password"
							/>

							<p className={`message message--error`}>
								{errorMessage || <br />}
							</p>

							<div className="columns">
								<input
									className="btn form__btn"
									type="submit"
									value="SIGN UP"
									disabled={!isValid || isSubmitting}
								/>
							</div>
						</Form>
					</section>
				);
			}}
		</Formik>
	);
}

export default withRouter(Signup);
