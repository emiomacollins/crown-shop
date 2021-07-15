import React from 'react';
import { withRouter } from 'react-router-dom';

function CollectionDirectoryItem({ item, history }) {
	let { title, imageUrl } = item;

	return (
		<div
			onClick={() => {
				history.push(`/shop/${title}`);
			}}
			className="homepage__directory__item"
		>
			<img className=" homepage__directory__item__bg" src={imageUrl} alt="" />

			<div className="homepage__directory__item__details">
				<h1 className="title">{title}</h1>
				<span className="subtitle">SHOP NOW</span>
			</div>
		</div>
	);
}

export default withRouter(CollectionDirectoryItem);
