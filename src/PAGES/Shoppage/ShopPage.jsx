import React from 'react';
import { Route } from 'react-router-dom';
import CollectionList from '../../COMPONENTS/Shop/CollectionList';
import Collection from '../../COMPONENTS/Shop/Collection';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchCollections,
	getCollections,
	getCollectionsErrorMessage,
	getCollectionsLoadingState,
} from '../../REDUX/collectionsState';
import Loader from '../../COMPONENTS/Loader';

function ShopPage({ match }) {
	// HOW DO I ENCAPSULATE THIS LOGIC TO MAKE IT REUSABLE? (HOC)
	const dispatch = useDispatch();
	const collections = useSelector(getCollections);
	const loading = useSelector(getCollectionsLoadingState);
	const errorMessage = useSelector(getCollectionsErrorMessage);
	if (loading === true) return <Loader />;
	if (loading === false) return <p>{errorMessage}</p>;
	if (loading === 'idle') dispatch(fetchCollections());

	return (
		<div className="collection-list container">
			<Route exact path={match.path} component={CollectionList} />

			<Route
				path={`${match.path}/:collection`}
				render={({ match }) => {
					const collectionName = match.params.collection;
					return <Collection collection={collections[collectionName]} />;
				}}
			/>
		</div>
	);
}

export default ShopPage;
