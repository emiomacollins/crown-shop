import React from 'react';
import { useSelector } from 'react-redux';
import { WithCollectionsLoader } from '../../HOC/WithLoader';
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

export default WithCollectionsLoader(CollectionDirectory);
