import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Detail = () => {
  const { theme, uid } = useParams();
  const { store } = useGlobalReducer();

  const detail = store.details[`${theme}-${uid}`];

  if (!detail) {
    return (
      <div className="container mt-5">
        <h1>Unfound article</h1>
        <p>No data for this element</p>
        <Link to="/" className="btn btn-secondary mt-4">⬅ Go back</Link>
      </div>
    );
  }

 const imageUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/09392b3f505af988e930f391f7b9cc38d43288d9/public/images/${theme}/${uid}.jpg`;

  return (
    <div className="container mt-5">
           <div className="row">
        <div className="col-4">
          <p className="box">
              <img
                src={imageUrl}
                className="card-img-top"
                alt={detail.name}
              />
          </p> 
        </div>
        <div className="col-8">
           <h1 className="mb-3 text-center">{detail.name}</h1>
           <p className="text-center ms-3">Lorem, ipsum dolor sit amet consectetur 
            adipisicing elit. Consequuntur quae quos tempore mollitia iure veritatis, 
            error doloremque quibusdam est et! Similique qui impedit inventore ad harum 
            officiis consequatur omnis earum vero corporis. Nihil alias hic dolorum cumque 
            quam accusamus ex facilis dignissimos mollitia sed. Vel illo nihil error sed. 
            Tempora, adipisci! Minima dignissimos consequuntur alias ipsa error, iste 
            accusantium aliquam ea, adipisci facere, cupiditate deleniti. Dignissimos 
            dolorem neque dolores quia?</p>
        </div>
        <hr style={{color: "red", border: "1px solid red"}} />
            <div className="d-flex justify-content-evenly">
              {theme === "people" && (
                            <>
                            <div className="text-center text-danger me-4">
                              <span className="fw-bold">Name</span> <br />
                              {detail.name}</div>
                            <div className="text-center text-danger me-4">
                              <span className="fw-bold">Birth Year</span> <br />
                              {detail.birth_year}</div>
                            <div className="text-center text-danger me-4">
                              <span className="fw-bold">Gender</span> <br />
                              {detail.gender}</div>     
                            <div className="text-center text-danger me-4">
                              <span className="fw-bold">Height</span> <br />
                              {detail.height}</div>                              
                            <div className="text-center text-danger me-4">
                              <span className="fw-bold">Skin Color</span> <br />
                              {detail.skin_color}</div>                              
                            <div className="text-center text-danger me-4">
                              <span className="fw-bold">Eye Color</span> <br />
                              {detail.eye_color}</div>  
                            </>
                          )}
              {theme === "planets" && (
                            <>
                            <div className="text-center text-danger me-4">
                              <span className="fw-bold">Name</span> <br />
                              {detail.name}</div>
                            <div className="text-center text-danger me-4">
                              <span className="fw-bold">Climate</span> <br />
                              {detail.climate}</div>
                            <div className="text-center text-danger me-4">
                              <span className="fw-bold">Population</span> <br />
                              {detail.population}</div>     
                            <div className="text-center text-danger me-4">
                              <span className="fw-bold">Orbital Period</span> <br />
                              {detail.orbital_period}</div>                              
                            <div className="text-center text-danger me-4">
                              <span className="fw-bold">Rotation Period</span> <br />
                              {detail.rotation_period}</div>                              
                            <div className="text-center text-danger me-4">
                              <span className="fw-bold">Diameter</span> <br />
                              {detail.diameter}</div>  
                            </>
                          )}                          
              {theme === "vehicles" && (
                            <>
                            <div className="text-center text-danger me-4">
                              <span className="fw-bold">Name</span> <br />
                              {detail.name}</div>
                            <div className="text-center text-danger me-4">
                              <span className="fw-bold">Model</span> <br />
                              {detail.model}</div>    
                            <div className="text-center text-danger me-4">
                              <span className="fw-bold">Cargo Capacity</span> <br />
                              {detail.cargo_capacity}</div>
                            <div className="text-center text-danger me-4">
                              <span className="fw-bold">Passengers</span> <br />
                              {detail.passengers}</div>     
                            <div className="text-center text-danger me-4">
                              <span className="fw-bold">Crew</span> <br />
                              {detail.crew}</div>                              
                            <div className="text-center text-danger me-4">
                              <span className="fw-bold">Length</span> <br />
                              {detail.length}</div>                              
                            </>
                          )}      
            </div>
        </div>
      </div>
  );
}