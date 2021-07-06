import { useDispatch } from 'react-redux';
import { addItem } from '../../REDUX/cartState';
import { Link } from 'react-router-dom';

function Collection({ collection, limit }) {
	const dispatch = useDispatch();
	if (!collection) return null;

	let { title, items } = collection;

	const itemsList = items.slice(0, limit ? limit : items.length).map((item) => {
		let { id, name, imageUrl, price } = item;

		return (
			<div key={id} className="collection__item">
				<header>
					<img src={imageUrl} alt="" className="collection__item__image" />
					<button
						onClick={() => dispatch(addItem(item))}
						className="btn add-to-cart-btn"
					>
						<i className="fas fa-plus"></i>
					</button>
				</header>

				<p>{name}</p>
				<p>{price}$</p>
			</div>
		);
	});

	return (
		<div className="collection">
			<Link to={`/shop/${title}`}>
				<h1 className="btn--link collection__title">{title}</h1>
			</Link>

			<div className="collection__items">{itemsList}</div>
		</div>
	);
}

export default Collection;
