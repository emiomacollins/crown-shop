import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import CollectionList from '../../COMPONENTS/Shop/CollectionList';
import Collection from '../../COMPONENTS/Shop/Collection';
import { useSelector } from 'react-redux';
import { getCollections } from '../../REDUX/collectionsState';
import { WithCollections } from '../../HOC/withLoader';

function ShopPage() {
	const collections = useSelector(getCollections);
	const match = useRouteMatch();

	return (
		<div className="collection-list container">
			<Route exact path={match.path} component={CollectionList} />

			<Route
				path={`${match.path}/:collection`}
				render={() => {
					const collectionName = match.params.collection;
					return <Collection collection={collections[collectionName]} />;
				}}
			/>
		</div>
	);
}

export default WithCollections(ShopPage);
