import React from 'react';
import { useSelector } from 'react-redux';
import { getCollectionsAsList } from '../../REDUX/collectionsState';
import Collection from './Collection';

function CollectionList() {
	const collections = useSelector(getCollectionsAsList);
	return collections.map((collection) => {
		return <Collection limit={4} key={collection.id} collection={collection} />;
	});
}

export default CollectionList;
