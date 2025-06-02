import { Link } from "react-router-dom";
import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
  	const favorites = store.favorites;

	const removeFavorite = (key) => {
	const [theme, uid] = key.split("-");
	dispatch({ type: "toggle_favorite", payload: { theme, uid } });
	};

	useEffect(() => {
	localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	return (
		<nav className="navbar navbar-light bg-light ">
			<div className="container ps-5 pe-5">
				<Link to="/">
					<img src="https://www.freepnglogos.com/uploads/star-wars-logo-31.png" alt="logo sw" className="logo"/>
				</Link>
			<div className="dropdown">
					<button
					className="btn btn-primary dropdown-toggle"
					type="button"
					id="favoritesDropdown"
					data-bs-toggle="dropdown"
					aria-expanded="false"
					>
					Favorites ({favorites.length})
					</button>
					<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
					{favorites.length === 0 ? (
						<li className="dropdown-item text-muted">(empty)</li>
					) : (
						favorites.map(fav => (
						<li key={fav.key} className="dropdown-item d-flex justify-content-between align-items-center">
							<Link to={`/detail/${fav.theme}/${fav.uid}`} className="me-2">{fav.name}</Link>
							<button className="btn btn-sm" onClick={() => removeFavorite(fav.key)}><i className="fa-solid fa-trash"></i></button>
						</li>
						))
					)}
					</ul>
				</div>
			</div>
		</nav>
	);
};