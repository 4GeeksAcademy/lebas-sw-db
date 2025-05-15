import { Card } from "../components/Card.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="mt-5 container">
			<div className="row">
			<Card />
			</div>
		</div>
	);
}; 