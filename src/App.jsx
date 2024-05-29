import { useState } from "react";
import axios from "axios";
import "./styles/App.scss";

function App() {
	const [catImg, setCatImg] = useState("");

	const getCat = async () => {
		const result = await axios("https://cataas.com/cat?json=true");
		setCatImg(result.data[0]._id);
		console.log("result", result.data[0]._id);
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
				<button onClick={() => getCat()}>Generate my cat</button>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Nemo labore praesentium quasi, porro laudantium repudiandae,
					maxime ab dicta ipsa quo possimus nisi enim quos suscipit.
					Expedita et totam ab consectetur.
				</p>
			</div>
		</>
	);
}

export default App;
