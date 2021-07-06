import React from 'react';
import { useSelector } from 'react-redux';
import WithLoader, { WithCollectionsLoader } from '../../HOC/WithLoader';
import {
	fetchCollections,
	getCollections,
	getCollectionsAsList,
	getCollectionsErrorMessage,
	getCollectionsLoadingState,
} from '../../REDUX/collectionsState';
import Loader from '../Loader';
import CollectionDirectoryItem from './CollectionDirectoryItem';

function CollectionDirectory() {
	const collections = useSelector(getCollectionsAsList);
	const loading = useSelector(getCollectionsLoadingState);
	if (loading === true) return <Loader />;

	return (
		<div className="homepage__directory">
			{collections.map((item) => {
				return <CollectionDirectoryItem key={item.id} item={item} />;
			})}
		</div>
	);
}

export default WithCollectionsLoader(CollectionDirectory);
