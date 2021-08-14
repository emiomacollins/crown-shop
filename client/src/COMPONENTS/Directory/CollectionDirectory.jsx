import React from 'react';
import { useSelector } from 'react-redux';
import { WithCollections } from '../../HOC/withLoader';
import { getCollectionsAsList } from '../../REDUX/collectionsState';
import CollectionDirectoryItem from './CollectionDirectoryItem';

function CollectionDirectory() {
	const collections = useSelector(getCollectionsAsList);

	return (
		<div className="homepage__directory">
			{collections.map((item) => {
				return <CollectionDirectoryItem key={item.id} item={item} />;
			})}
		</div>
	);
}

export default WithCollections(CollectionDirectory);
