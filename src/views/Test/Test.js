import style from "./test.module.css";
import { ReactComponent as TestIcon } from "../../assets/test/TestIcon.svg";
import { ReactComponent as TimeCircleIcon } from "../../assets/test/TimeCircleIcon.svg";
import { ReactComponent as ViewAllIcon } from "../../assets/test/ViewAllIcon.svg";
const UpcomingLiveTests = () => {
	const colors = [
		"#ff8058",
		"#ffb038",
		"#49c0c1",
		"#ff78a3",
		// "#57628e",
		"#f36450",
	];

	const listBlock = () => {
		return [1, 2, 3].map(() => (
			<div
				className={style.upcomingBlock}
				style={{
					backgroundColor: colors[Math.floor(Math.random() * colors.length)],
				}}
			>
				<h2>Mock Series</h2>
				<div className={style.subTitle}>Science Class 10</div>
				<div className={style.details}>
					<TestIcon />
					Full Syllabus mock exam
				</div>
				<div className={style.details}>
					<TimeCircleIcon />
					Starts in 5 days 3 hours
				</div>
				<button className={style.whiteButton}>Attempt</button>
			</div>
		));
	};

	return (
		<>
			<h2 className={`${style.h2}`}>Upcoming Live Tests</h2>
			<div className={style.upcomingLiveTestContainer}>
				{listBlock()}
				<ViewAllIcon className={style.viewAllIcon} />
			</div>
		</>
	);
};
const OngoingTestSeries = () => {
	const listBlock = () => {
		return [1, 2, 3, 5, 46, 7].map(() => (
			<div className={style.onGoingBlock}>
				<div className={style.header}>
					<h2>Mock Exam Series - Class 10</h2>
					<div>Ends 15th January</div>
				</div>
				<div className={style.headerSub}>10 Test with solution</div>
				<button className={style.whiteButton}>Attempt</button>
			</div>
		));
	};
	return (
		<>
			<h2 className={`${style.h2}`}>Ongoing Test Series</h2>
			<div className={style.upcomingLiveTestContainer}>
				{listBlock()}
				{/* <ViewAllIcon className={style.viewAllIcon} /> */}
			</div>
		</>
	);
};

const Test = () => {
	return (
		<div className="test">
			<h1 className="secondary text-align-center">Test</h1>
			<UpcomingLiveTests />
			<OngoingTestSeries />
		</div>
	);
};

export default Test;
