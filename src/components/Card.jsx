import { Link } from "react-router-dom"
import { useEffect, useState } from "react";

export const Card = () => {

    const [characters, setCharacters] = useState([]); 
    const [planets, setPlanets] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const themesCards = ["people", "planets", "vehicles"];

     const fetchAll = async () => {
        try {
            const arrAux = await Promise.all(
            themesCards.map(async (theme) => {
                const response = await fetch(`https://www.swapi.tech/api/${theme}`);
                const data = await response.json();
                console.log(data)
                data.result["image"] = `https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/people/${data.result.uid}.jpg`
                return { theme, data };
                })
            )
            return arrAux
        } catch (error) {
            console.log(error)
        }
    } 

    	useEffect(() => {
	fetchAll();
   }, []);

    return(
        <div><h1 className="fs-3 text-danger mb-3">Characters</h1>
            <div className="card" style={{width: "18rem"}}>
                <img src={data.image} className="card-img-top" alt="image" />
                <div className="card-body">
                    <h5 className="card-title">{data.properties.name}</h5>
                    <p className="card-text">
                        <p>Gender: {data.properties.gender}</p>
                        <p>Hair Color: {data.properties.hair_color}</p>
						<p>Eye-Color: {data.properties.eye_color}</p>
                    </p>
                    <Link to="/detail" className="btn btn-primary">Learn more!</Link>
                </div>
            </div>
        </div>
    )
    }

