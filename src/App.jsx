import { useState } from "react";
import axios from "axios";
import "./styles/App.scss";

function App() {
	const [catImg, setCatImg] = useState("");
	const [catFact, setCatFact] = useState("");

	const getCat = async () => {
		const result = await axios("https://cataas.com/cat?json=true");
		setCatImg(result.data[0]._id);
		
	};
	const getFact = async () => {
		const result = await axios("https://catfact.ninja/facts?page=1");
		console.log("result", result);
		setCatFact(result.data.data[0].fact);
	};

	return (
		<>
			<div className="main-container">
				<select name="" id="">
					<option value="1"></option>
					<option value="2"></option>
					<option value="3"></option>
				</select>
				<img src={`https://cataas.com/cat/{catImg}`} alt="" />
				<button onClick={() => getFact()}>Generate my cat</button>
				<p>
					{catFact}
				</p>
			</div>
		</>
	);
}

export default App;
