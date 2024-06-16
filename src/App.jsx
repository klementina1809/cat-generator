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
			setIsImageLoaded(false); // Устанавливаем флаг загрузки изображения
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
				const { width, height } =
					contentRef.current.getBoundingClientRect();
				const canvas = await html2canvas(contentRef.current, {
					useCORS: true,
					scale: 2,
					width: width * 2, // Устанавливаем ширину canvas в пикселях
					height: height * 2, // Устанавливаем высоту canvas в пикселях
				});
				const imgData = canvas.toDataURL("image/jpeg");
				const pdf = new jsPDF({
					orientation: "portrait",
					unit: "mm",
					format: [width, height], // Устанавливаем размеры PDF документа равные размерам контейнера
				});
				pdf.addImage(imgData, "JPEG", 0, 0, width, height);
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
			<button onClick={handleExport}>Export</button>
		</div>
	);
}

export default App;
