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
		const number = generateRandomNumber();
		const result = await axios(
			`https://catfact.ninja/facts?page=${number}`
		);
		console.log("result", result);
		setCatFact(result.data.data[0].fact);
	};

	const generateRandomNumber = () => {
		const min = 1;
		const max = 34;
		const number = Math.floor(Math.random() * (max - min + 1)) + min;
		return number;
	};

	const handleSelect = (event) => {
		setSelectedTag(event.target.value);
	};

	useEffect(() => {
		getTags();
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
			<button
				onClick={() => {
					getCat();
					getFact();
					setCount((prev) => prev + 1);
				}}
			>
				Generate my cat
			</button>
		</div>
	);
}

export default App;
