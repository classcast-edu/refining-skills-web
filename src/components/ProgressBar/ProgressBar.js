import style from "./progressBar.module.css";
const ProgressBar = ({ progress }) => {
	return (
		<div className={style.progressBarContainer}>
			<span
				className={style.progressBar}
				style={{ width: [progress || "0%"] }}
			></span>
		</div>
	);
};

export default ProgressBar;
