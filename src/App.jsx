import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Image from "./components/Image";
import Select from "./components/Select";
import "./styles/App.scss";

function App() {
	const [catImg, setCatImg] = useState("");
	const [catTags, setCatTags] = useState([]);
	const [catFact, setCatFact] = useState("");
	const [count, setCount] = useState(0);
	const [selectedTag, setSelectedTag] = useState("Cute");

	const getCat = () => {
		if (selectedTag) {
			setCatImg(`https://cataas.com/cat/${selectedTag}`);
		}
	};

	const getTags = async () => {
		const result = await axios("https://cataas.com/api/tags");
		setCatTags(result.data);
	};

	const getFact = async () => {
		const number = generateRandomNumber(1, 34);
		const result = await axios(
			`https://catfact.ninja/facts?page=${number}`
		);
		const element = generateRandomNumber(0, 9);
		console.log("number", number);
		console.log("element", element);
		setCatFact(result.data.data[element].fact);
	};

	const generateRandomNumber = (min, max) => {
		const number = Math.floor(Math.random() * (max - min + 1)) + min;
		return number;
	};

	const handleSelect = (event) => {
		setSelectedTag(event.target.value);
		getCat();
		setCount((prev) => prev + 1);
	};

	useEffect(() => {
		getTags();
		getCat();
	}, []);

	const memoizedTags = useMemo(() => catTags, [catTags]);

	return (
		<div className="main-container">
			<Select
				onChange={handleSelect}
				value={selectedTag}
				data={memoizedTags}
			/>
			<Image data={catImg} count={count} />
			{catFact && <p>{catFact}</p>}
			<div className="btns">
				<button
					onClick={() => {
						getCat();
						setCount((prev) => prev + 1);
					}}
				>
					Generate new cat
				</button>
				<button
					onClick={() => {
						getFact();
					}}
				>
					Generate new fact
				</button>
			</div>
		</div>
	);
}

export default App;
