import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../COMPONENTS/Loader';

function WithLoader(component) {
	function Wrapper({ getLoading, getErrorMessage, fetchAction }) {
		const dispatch = useDispatch();
		const loading = useSelector(getLoading);
		const errorMessage = useSelector(getErrorMessage);
		if (loading === true) return <Loader />;
		if (loading === false) return <p>{errorMessage}</p>;
		if (loading === 'idle') dispatch(fetchAction());
		return <component />;
	}
	return Wrapper;
}

export default WithLoader;
