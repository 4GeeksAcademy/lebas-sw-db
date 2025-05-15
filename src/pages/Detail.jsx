import { useSwapi } from "react-swapi";

export const Detail = () => {


    const StarWarsCharacter = () => {
	const { data, isLoading, error } = useSwapi("people", { name: "skywalker" });

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	




    return(
        <div className="container">
            <div className="row">
                <div className="d-flex">
                    <div className="mt-4"><img src="https://lumiere-a.akamaihd.net/v1/images/tatooine-main_9542b896.jpeg" alt="tatooine" style={{width: "28rem"}}/>
                    </div>
                    <div>
                        <h1 className="text-center pt-2">Tatooine</h1>
                        <div className="ms-4">Tatooine is harsh desert world orbiting twin suns in the galaxy’s Outer Rim.
                        In the days of the Empire and the Republic, many settlers scratched out a 
                        living on moisture farms, while spaceport cities such as Mos Eisley and Mos 
                        Espa served as home base for smugglers, criminals, and other rogues. Anakin 
                        Skywalker and Luke Skywalker both once called Tatooine home, although across
                        the stars it was more widely known as a hive of scum and villainy ruled by 
                        the crime boss Jabba the Hutt.
                        </div>
                    </div>
                </div>
            </div>
            <hr style={{color: "red", border: "1px solid red"}} />
            <div className="d-flex justify-content-evenly">
            <div className="text-center text-danger me-4"><span className="fw-bold">Name</span> <br />Tatooine</div>
            <div className="text-center text-danger me-4"><span className="fw-bold">Climate</span> <br />arid</div>
            <div className="text-center text-danger me-4"><span className="fw-bold">Population</span> <br />20000000</div>
            <div className="text-center text-danger me-4"><span className="fw-bold">Orbital Period</span> <br />304</div>
            <div className="text-center text-danger me-4"><span className="fw-bold">Rotation Period</span> <br />23</div>
            <div className="text-center text-danger me-4"><span className="fw-bold">Diameter</span> <br />10465</div>
            </div>
        </div>
    )
    }
}