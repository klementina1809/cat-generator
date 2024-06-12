import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./styles/App.scss";

function App() {
	const [catImg, setCatImg] = useState("");
	const [catTags, setCatTags] = useState([]);
	const [catFact, setCatFact] = useState("");
	const [selectedTag, setSelectedTag] = useState("");

	const getCat = async () => {
		const result = await axios("https://cataas.com/cat?json=true");
		setCatImg(result.data.id); // Assuming the API returns an object with an id property
	};

	const getTags = async () => {
		const result = await axios("https://cataas.com/api/tags");
		setCatTags(result.data); // Extracting the data from the result
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
			<select
				name="cat-tag"
				id="cat-tag"
				onChange={handleSelect}
				value={selectedTag}
			>
				{memoizedTags.map((tag) => (
					<option key={tag} value={tag}>
						{tag}
					</option>
				))}
			</select>
			<img src={`https://cataas.com/cat/${selectedTag}`} alt="Cat" />
			<button onClick={getFact}>Generate my cat</button>
			<p>{catFact}</p>
		</div>
	);
}

export default App;
