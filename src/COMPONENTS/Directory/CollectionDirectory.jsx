import React from 'react';
import { useSelector } from 'react-redux';
import { getCollectionsList } from '../../REDUX/collectionsState';
import CollectionDirectoryItem from './CollectionDirectoryItem';

function CollectionDirectory() {
	const collections = useSelector(getCollectionsList);

	return (
		<div className="homepage__directory">
			{collections.map((item) => {
				return <CollectionDirectoryItem key={item.id} item={item} />;
			})}
		</div>
	);
}

export default CollectionDirectory;
