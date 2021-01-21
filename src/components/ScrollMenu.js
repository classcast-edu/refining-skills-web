import { useRef, useState } from "react";
import style from "./scroll.module.css";
import { ReactComponent as AlcBlackIcon } from "assets/subjects/alcBlack.svg";
import { ReactComponent as ArcBlackIcon } from "assets/subjects/arcBlack.svg";
const Scroll = ({ menuItems, width, margin, position, transform }) => {
	const scrollingContainer = useRef();
	const [disableLeftArrow, setDisableLeftArrow] = useState(0);
	const [disableRightArrow, setDisableRightArrow] = useState(false);
	const handleScroll = () => {
		setDisableLeftArrow(scrollingContainer.current.scrollLeft);
		if (
			scrollingContainer.current.offsetWidth +
				scrollingContainer.current.scrollLeft +
				10 >
			scrollingContainer.current.scrollWidth
		) {
			setDisableRightArrow(true);
		} else {
			setDisableRightArrow(false);
		}
	};
	return (
		<div className={style.container} style={{ display: "flex" }}>
			<button
				className={style.arrowLeft}
				onClick={() => {
					scrollingContainer.current.scrollLeft -=
						scrollingContainer.current.offsetWidth;
				}}
				style={{
					display: [disableLeftArrow ? "block" : "none"],
					position,
					transform,
				}}
			>
				<AlcBlackIcon />
			</button>
			<div
				className={style.scrollMenu}
				style={{ width, margin }}
				onScroll={handleScroll}
				ref={scrollingContainer}
			>
				{menuItems}
			</div>
			<button
				className={style.arrowRight}
				onClick={() => {
					scrollingContainer.current.scrollLeft +=
						scrollingContainer.current.offsetWidth;
				}}
				style={{
					display: [disableRightArrow ? "none" : "block"],
					position,
					transform,
				}}
			>
				<ArcBlackIcon />
			</button>
		</div>
	);
};

export default Scroll;
