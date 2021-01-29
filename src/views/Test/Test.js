import style from "./test.module.css";
import { ReactComponent as TestIcon } from "../../assets/test/TestIcon.svg";
import { ReactComponent as TimeCircleIcon } from "../../assets/test/TimeCircleIcon.svg";
import { ReactComponent as ViewAllIcon } from "../../assets/test/ViewAllIcon.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaLeaf } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import CustomSpinner from "components/CustomSpinner";
import Practice from "views/Practice/Practice";
const UpcomingLiveTests = () => {
	const colors = [
		"#ff8058",
		"#ffb038",
		"#49c0c1",
		"#ff78a3",
		// "#57628e",
		"#f36450",
	];
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await axios(`/content/past_test_series/28/`);
				console.log(res.data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

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
				<button className={style.whiteButton}>View</button>
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
	const [testData, setTestData] = useState([
		{
			description: "Loading..",
			display_name: "Loading... ",
			id: 461,
			start_time: new Date(),
			study_material: [],
			disabled: true,
		},
		{
			description: "Loading..",
			display_name: "Loading... ",
			id: 461,
			start_time: new Date(),
			study_material: [],
			disabled: true,
		},
		{
			description: "Loading..",
			display_name: "Loading... ",
			id: 461,
			start_time: new Date(),
			study_material: [],
			disabled: true,
		},
	]);
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await axios(`/content/past_test_series/28/`);
				setTestData(res.data.data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};
		fetchData();
	}, []);
	const listBlock = () => {
		return testData.map((test) => (
			<div className={style.onGoingBlock}>
				<div className={style.header}>
					<h2>
						{test.display_name}
						{/* {test.description} */}
					</h2>
					<div>
						Started on{" "}
						{Intl.DateTimeFormat("en-US", {
							day: "numeric",
							month: "short",
							year: "numeric",
						}).format(new Date(test.start_time))}
					</div>
				</div>
				<div className={style.headerSub}>
					{test.study_material.length} Test with solution
				</div>
				<Link to={`${location.pathname}/${test.id}`}>
					<button className={style.whiteButton} disabled={test.disabled}>
						Attempt
					</button>
				</Link>
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
			{/* <OngoingTestSeries /> */}
		</div>
	);
};

export default Test;
