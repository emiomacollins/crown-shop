import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import CollectionList from '../../COMPONENTS/Shop/CollectionList';
import Collection from '../../COMPONENTS/Shop/Collection';
import { useSelector } from 'react-redux';
import { getCollections } from '../../REDUX/collectionsState';
import { WithCollections } from '../../HOC/withLoader';

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

export default WithCollections(withRouter(ShopPage));
