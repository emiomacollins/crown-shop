import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignIn from '../../COMPONENTS/Authentication/SignIn';
import SignUp from '../../COMPONENTS/Authentication/SignUp';
import { getSignedIn } from '../../REDUX/userState';

function AuthenticationPage() {
	const signedIn = useSelector(getSignedIn);
	if (signedIn) return <Redirect to="/" />;
	return (
		<div className="authentication block">
			<div className="container">
				<SignIn />
				<SignUp />
			</div>
		</div>
	);
}

export default AuthenticationPage;
