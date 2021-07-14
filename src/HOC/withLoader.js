import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../COMPONENTS/Reusables/Loader';
import {
	fetchCollections,
	getCollections,
	getCollectionsErrorMessage,
	getCollectionsLoadingState,
} from '../REDUX/collectionsState';

// this HOC handles showing a spinner when data is being fetched,
// fetching the data if it has not been fetched by any other component,
// showing an error if the data failed to fetch,
// & displaying the appropriate component if the data exists or if fetched successfully

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
			return <p className="container">{errorMessage}</p>;

		if (loading === 'idle') {
			dispatch(fetchAction());
			return null;
		}

		return <Component {...props} />;
	}
	return Wrapper;
}

export function WithCollectionsLoader(Component) {
	return WithLoader({
		Component,
		getLoading: getCollectionsLoadingState,
		getErrorMessage: getCollectionsErrorMessage,
		getData: getCollections,
		fetchAction: fetchCollections,
	});
}
