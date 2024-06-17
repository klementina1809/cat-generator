import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Image from "./components/Image";
import Select from "./components/Select";
import "./styles/App.scss";

function App() {
	const [catImg, setCatImg] = useState("");
	const [catTags, setCatTags] = useState([]);
	const [catFact, setCatFact] = useState("");
	const [count, setCount] = useState(0);
	const [selectedTag, setSelectedTag] = useState("Cute");
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const contentRef = useRef(null);

	const getCat = () => {
		if (selectedTag) {
			setCatImg(`https://cataas.com/cat/${selectedTag}`);
			setIsImageLoaded(false);
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

	const handleImageLoad = useCallback(() => {
		setIsImageLoaded(true);
	}, []);

	const handleExport = useCallback(async () => {
		if (contentRef.current) {
			try {
				const canvas = await html2canvas(contentRef.current, {
					useCORS: true,
					scale: 2,
				});
				const imgData = canvas.toDataURL("image/jpeg");

				const pdf = new jsPDF({
					orientation: "portrait",
					unit: "pt",
					format: [canvas.width, canvas.height],
				});

				pdf.addImage(
					imgData,
					"JPEG",
					0,
					0,
					canvas.width,
					canvas.height
				);
				pdf.save("cat-quote.pdf");
			} catch (error) {
				console.error("Failed to export PDF", error);
			}
		}
	}, []);

	useEffect(() => {
		if (isImageLoaded) {
			handleExport();
		}
	}, [isImageLoaded, handleExport]);

	return (
		<div className="main-container">
			<Select
				onChange={handleSelect}
				value={selectedTag}
				data={memoizedTags}
			/>
			<div className="content" ref={contentRef}>
				<Image data={catImg} count={count} onLoad={handleImageLoad} />
				{catFact && <p>{catFact}</p>}
				<button onClick={handleExport} className="export-btn">
					Export
				</button>
			</div>
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
