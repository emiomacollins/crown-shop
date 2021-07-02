import { useDispatch } from 'react-redux';
import { addItem } from '../../REDUX/cartState';
import { Link } from 'react-router-dom';

function Collection({ collection, limit }) {
	const dispatch = useDispatch();
	if (!collection) return null;

	let { title, items, routeName } = collection;

	return (
		<div className="collection">
			<Link to={`/shop/${routeName}`}>
				<h1 className="collection__title">{title}</h1>
			</Link>

			<div className="collection__items">
				{items.slice(0, limit ? limit : items.length).map((item) => {
					let { id, name, imageUrl, price } = item;

					return (
						<div key={id} className="collection__item">
							<header>
								<img
									src={imageUrl}
									alt=""
									className="collection__item__image"
								/>

								<div className="overlay">
									<button
										onClick={() => dispatch(addItem(item))}
										className="btn"
									>
										ADD TO CART
									</button>
								</div>
							</header>

							<p>{name}</p>
							<p>{price}$</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Collection;
