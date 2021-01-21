import style from "./practice.module.css";
import { ReactComponent as OverallScoreIcon } from "../../assets/stats/OverallScore.svg";
import { ReactComponent as TestAttemptsIcon } from "../../assets/stats/TestAttempts.svg";
import { ReactComponent as TopicsPracticedIcon } from "../../assets/stats/TopicsPracticed.svg";
import { ReactComponent as ViewDashBoardIcon } from "../../assets/stats/ViewDashBoardIcon.svg";

import ScrollMenu from "../../components/ScrollMenu";
import PracticeBySubject from "./PracticeBySubject/PracticeBySubject";
const Statistics = () => {
	const listBlock = (block, value) => {
		return (
			<div className={style.statisticsBlock}>
				{block}
				<div className={style.statisticsBlockValue}>{value}</div>
			</div>
		);
	};

	return (
		<>
			<h2 className={` ${style.h2}`}>Your Statistics</h2>
			<div className={style.statistics}>
				{listBlock(<OverallScoreIcon />, 123)}
				{listBlock(<TestAttemptsIcon />, 123)}
				{listBlock(<TopicsPracticedIcon />, 123)}
				{listBlock(<ViewDashBoardIcon />)}
			</div>
		</>
	);
};

const Continue = () => {
	const fakeItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	const listBlock = () => {
		return fakeItems.map((item) => {
			return (
				<div className={style.continueCard} key={item}>
					<img
						src={
							"https://images.unsplash.com/photo-1609269310346-e03f6800ca12?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
						}
						alt="lodu"
					/>
					<div className={style.title}>
						Acid bases and salts explained {item}
					</div>
					<div className={style.subTitle}>By Ramesh Prasad</div>
					<button className={style.filledButton}>Continue</button>
				</div>
			);
		});
	};

	return (
		<>
			<h2 className={`${style.h2}`}>Continue where you left</h2>
			<ScrollMenu menuItems={listBlock()} />
		</>
	);
};

const RsCorner = () => {
	const listBlock = () => {
		return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
			return (
				<div className={style.rsCornerCard} key={item}>
					<img
						src={
							"https://images.unsplash.com/photo-1609269310346-e03f6800ca12?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
						}
						alt=""
					/>
					<div className={style.title}>
						How I scored 98/100 without coaching
						<div className={style.subTitle}>By Anukriti Pattopadhya</div>
					</div>
					<button className={style.filledButton}>Read</button>
				</div>
			);
		});
	};
	return (
		<>
			<h2 className={`${style.h2}`}>Rs Corner</h2>
			<ScrollMenu menuItems={listBlock()} />
		</>
	);
};

const Practice = (props) => {
	return (
		<div className={style.root}>
			<h1 className="secondary text-align-center">Practice</h1>
			<Statistics />
			{/* <Continue /> */}
			<PracticeBySubject {...props} />
			{/* <RsCorner /> */}
		</div>
	);
};

export default Practice;
