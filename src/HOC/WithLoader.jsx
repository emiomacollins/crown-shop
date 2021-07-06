import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../COMPONENTS/Loader';
import {
	fetchCollections,
	getCollections,
	getCollectionsErrorMessage,
	getCollectionsLoadingState,
} from '../REDUX/collectionsState';

function WithLoader(params) {
	// get selectors and action creators to implement loading logic
	const { getLoading, getErrorMessage, fetchAction, getData, Component } = params;
	// create a wrapper component that implements the logic
	// and renders a component, thereby merging it's logic with it
	function Wrapper() {
		const dispatch = useDispatch();
		const loading = useSelector(getLoading);
		const errorMessage = useSelector(getErrorMessage);
		const data = useSelector(getData);
		if (loading === true) return <Loader />;
		if (loading === false && !data) return <p>{errorMessage}</p>;
		if (loading === 'idle') dispatch(fetchAction());
		return <Component />;
	}
	return Wrapper;
}

// create versions of the withLoading HOC
export function WithCollectionsLoader(component) {
	return WithLoader({
		Component: component,
		getLoading: getCollectionsLoadingState,
		getErrorMessage: getCollectionsErrorMessage,
		getData: getCollections,
		fetchAction: fetchCollections,
	});
}
