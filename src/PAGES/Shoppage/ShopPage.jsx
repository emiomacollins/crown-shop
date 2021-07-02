import React from 'react';
import { Route } from 'react-router-dom';
import CollectionList from '../../COMPONENTS/Shop/CollectionList';
import Collection from '../../COMPONENTS/Shop/Collection';
import { useSelector } from 'react-redux';
import { getCollections } from '../../REDUX/collectionsState';

function ShopPage({ match }) {
	const collections = useSelector(getCollections);

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
