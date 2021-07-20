import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Loader from '../COMPONENTS/Reusables/Loader';
import {
	fetchCollections,
	getCollections,
	getCollectionsErrorMessage,
	getCollectionsLoadingState,
} from '../REDUX/collectionsState';

const ErrorMessage = styled.p`
	text-align: center;
	margin-top: 2rem;
`;

function WithLoader(params) {
	// get selectors and action creators to implement loading logic
	const { getLoading, getErrorMessage, fetchAction, getData, Component } = params;

	// create a wrapper component that implements the logic
	// and renders the component you pass to it, thereby merging it's logic with it
	function Wrapper(props) {
		const dispatch = useDispatch();

		const loading = useSelector(getLoading);
		const errorMessage = useSelector(getErrorMessage);
		const data = useSelector(getData);

		if (loading === true) return <Loader />;

		if (loading === false && !data)
			return <ErrorMessage>{errorMessage}</ErrorMessage>;

		if (loading === 'idle') {
			dispatch(fetchAction());
			return null;
		}

		return <Component {...props} />;
	}
	return Wrapper;
}

export function WithCollections(Component) {
	return WithLoader({
		Component,
		getLoading: getCollectionsLoadingState,
		getErrorMessage: getCollectionsErrorMessage,
		getData: getCollections,
		fetchAction: fetchCollections,
	});
}
