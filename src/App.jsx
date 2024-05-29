import { useState } from "react";
import "./styles/App.scss";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div className="main-container">
				<select name="" id="">
					<option value="1"></option>
					<option value="2"></option>
					<option value="3"></option>
				</select>
				<img src="https://placehold.co/600x400/" alt="" />
				<button>Generate my cat</button>
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
