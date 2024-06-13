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
	const [selectedTag, setSelectedTag] = useState("");

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
		const result = await axios("https://catfact.ninja/facts?page=1");
		console.log("result", result);
		setCatFact(result.data.data[0].fact);
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
			<button
				onClick={() => {
					getCat();
					getFact();
					setCount((prev) => prev + 1);
				}}
			>
				Generate my cat
			</button>
			<p>{catFact}</p>
		</div>
	);
}

export default App;
