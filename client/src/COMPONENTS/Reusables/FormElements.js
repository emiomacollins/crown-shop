import { useField } from 'formik';
import React from 'react';
import styled, { css } from 'styled-components';

const TextboxEl = styled.input`
	transition: 0.3s;

	${({ isInvalid }) =>
		isInvalid &&
		css`
			border-color: var(--color-error);
		`}
`;

const CheckboxEl = styled.input`
	border: 1px solid black;
	display: inline-block;
`;

const SelectEl = styled.select`
	padding: 1rem;
`;

export function Textbox(props) {
	// the meta is like the value of the form element
	// it diff objects i.e the errors object, the touched object
	// so instead of formik.errors.nameOfInitialValue you'll use meta.error
	const [fields, meta] = useField(props);
	const { name, label, ...otherprops } = props;

	return (
		<div className="form__control">
			<label className="form__label">{label}</label>
			<TextboxEl
				isInvalid={meta.touched && !!meta.error}
				className="form__input"
				{...fields}
				{...otherprops}
			></TextboxEl>
			<p className={`message--error`}>{(meta.touched && meta.error) || <br />}</p>
		</div>
	);
}

export function CheckBox(props) {
	// we need to specify the type so usefield can generate the correct fields
	const [fields] = useField({ ...props, type: 'checkbox' });
	const { name, label, ...otherprops } = props;

	return (
		<>
			<label className="form__label">{label}</label>
			<CheckboxEl type="checkbox" {...fields} {...otherprops}></CheckboxEl>
		</>
	);
}

export function Select(props) {
	// useField by default gives a value, onChange, onBlur to the element
	// and if you specify type i.e as checkbox it adds a checked prop that
	// is binded to its initial values value (true/false)
	// select box works fine with the default fields so you dont need to
	// specify a type property or an as property
	// & when you change it's value with the options it will reflect on the initialValue
	const [fields] = useField({ ...props });
	const { name, label, ...otherprops } = props;

	return (
		<>
			<SelectEl {...fields} {...otherprops}></SelectEl>
		</>
	);
}
