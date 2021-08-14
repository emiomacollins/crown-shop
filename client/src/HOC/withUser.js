import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getuser } from '../REDUX/userState';

export function withUser(Component) {
	return function Wrapper(props) {
		const user = useSelector(getuser);
		if (!user) return <Redirect to="/" />;
		return <Component {...props} />;
	};
}
