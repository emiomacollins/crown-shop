import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getSignedIn } from '../REDUX/userState';

export function withUser(Component) {
	return function Wrapper(props) {
		const signedIn = useSelector(getSignedIn);
		if (!signedIn) return <Redirect to="/" />;
		return <Component {...props} />;
	};
}
