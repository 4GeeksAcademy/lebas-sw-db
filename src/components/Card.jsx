import { Link } from "react-router-dom";
import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Card = () => {
  const { store, dispatch } = useGlobalReducer();
  const { data, details, loading, error } = store;
  const themesCards = ["people", "planets", "vehicles"];

  const fetchAll = async () => {
    dispatch({ type: "fetch_data" });

    try {
      await Promise.all(
        themesCards.map(async (theme) => {
          const response = await fetch(`https://www.swapi.tech/api/${theme}`, {
            headers: {
              Accept: "application/json",
            },
          });
          const result = await response.json();

          if (result && result.results) {
            dispatch({
              type: "received_data",
              payload: { theme, data: result.results },
            });
          } 
        })
      );
    } catch (err) {
      dispatch({ type: "fetch_error", payload: err });
    }
  };

  const fetchDetails = async (theme, uid) => {
    try {
      const res = await fetch(`https://www.swapi.tech/api/${theme}/${uid}`, {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await res.json();
      dispatch({
        type: "set_detail",
        payload: {
          theme,
          uid,
          detail: data.result.properties
        }
      });
    } catch (err) {
    }
  };

useEffect(() => {
  if (!data || Object.keys(data).length === 0) {
    fetchAll();
  }
}, []);

  useEffect(() => {
    if (!data) return;

    Object.entries(data).forEach(([theme, items]) => {
      items.slice(0, 6).forEach((item) => {
        const key = `${theme}-${item.uid}`;
        if (!details[key]) {
          fetchDetails(theme, item.uid);
        }
      });
    });
  }, [data]);

  if (loading) return <p>Loading...</p>;

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const themeTitle = {
  people: "Characters",
};


  return (
    <div className="container">

      {data &&
        Object.entries(data).map(([theme, items]) => (

          <div key={theme} className="mb-2">
            <h2 className="text-danger">{capitalizeFirstLetter(themeTitle[theme] || theme)}</h2>
            <div className="wrapper">
                {items.map((item) => {
                  const detailKey = `${theme}-${item.uid}`;
                  const detail = details[detailKey];
                  const imageUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/09392b3f505af988e930f391f7b9cc38d43288d9/public/images/${theme}/${item.uid}.jpg`;
                  const favoriteKey = `${theme}-${item.uid}`;
                  const isFavorite = store.favorites.some(fav => fav.key === favoriteKey);
                
                return (
                  <div key={item.uid} className="card swcard" >
                    <img
                      src={imageUrl}
                      className="card-img-top"
                      style={{maxWidth: "20.1em"}}
                      alt={item.name}
                    />
                    <div className="card-body p-5">
                      <h5 className="card-title">{item.name}</h5>

                      {detail && (
                        <ul>
                          {theme === "people" && (
                            <>
                              <li>Gender: {detail.gender}</li>
                              <li>Hair Color: {detail.hair_color}</li>
                              <li>Eye Color: {detail.eye_color}</li>
                            </>
                          )}
                          {theme === "planets" && (
                            <>
                              <li>Climate: {detail.climate}</li>
                              <li>Population: {detail.population}</li>
                              <li>Terrain: {detail.terrain}</li>
                            </>
                          )}
                          {theme === "vehicles" && (
                            <>
                              <li>Model: {detail.model}</li>
                              <li>Class: {detail.vehicle_class}</li>
                            </>
                          )}
                        </ul>
                      )}
                      <div className="d-flex justify-content-between">
                      <Link
                        to={`/detail/${theme}/${item.uid}`}
                        className="btn btn-outline-primary"
                      >
                        Learn More
                      </Link>

                      <button
                        className={`btn ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
                        onClick={() =>
                          dispatch({
                            type: "toggle_favorite",
                            payload: {
                              theme,
                              uid: item.uid,
                              name: item.name,
                              key: favoriteKey,
                            },
                          })
                        }
                      >
                        <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                      </button>
                      </div>               
                    </div>
                  </div>
                );
              })}          
            </div>
          </div> 
        ))}
    </div>
  );
};
