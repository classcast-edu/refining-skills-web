import style from "./practice.module.css";
import { ReactComponent as OverallScoreIcon } from "../../assets/stats/OverallScore.svg";
import { ReactComponent as TestAttemptsIcon } from "../../assets/stats/TestAttempts.svg";
import { ReactComponent as TopicsPracticedIcon } from "../../assets/stats/TopicsPracticed.svg";
import { ReactComponent as ViewDashBoardIcon } from "../../assets/stats/ViewDashBoardIcon.svg";

//subjects
import { ReactComponent as EnglishIcon } from "../../assets/subjects/EnglishIcon.svg";
import { ReactComponent as HindiIcon } from "../../assets/subjects/Hindi.svg";
import { ReactComponent as KannadaIcon } from "../../assets/subjects/Kannada.svg";
import { ReactComponent as MathIcon } from "../../assets/subjects/MathIcon.svg";
import { ReactComponent as ScienceIcon } from "../../assets/subjects/ScienceIcon.svg";
import { ReactComponent as SocialSciencesIcon } from "../../assets/subjects/SocialSciences.svg";

import { ReactComponent as ArrowRightCircleIcon } from "../../assets/subjects/ArrowRightCircle.svg";

import ScrollMenu from "./ScrollMenu";
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
			<h2 className={`primary ${style.h2}`}>Your Statistics</h2>
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
				<div className={style.continueCard}>
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
			<h2 className={`primary ${style.h2}`}>Continue where you left</h2>
			<ScrollMenu menuItems={listBlock()} />
		</>
	);
};

const Subjects = () => {
	const listBlock = (block) => {
		return (
			<div className={style.subjectsBlock}>
				{block}
				<button className={style.subjectArrow}>
					<ArrowRightCircleIcon style={{ height: "4.5rem", width: "4.5rem" }} />
				</button>
			</div>
		);
	};

	return (
		<>
			<h2 className={`primary ${style.h2}`}>Practice by Subject</h2>
			<div className={style.subjects}>
				{listBlock(<EnglishIcon />)}
				{listBlock(<HindiIcon />)}
				{listBlock(<SocialSciencesIcon />)}
				{listBlock(<ScienceIcon />)}
				{listBlock(<MathIcon />)}
				{listBlock(<KannadaIcon />)}
			</div>
		</>
	);
};

const RsCorner = () => {
	const listBlock = () => {
		return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
			return (
				<div className={style.rsCornerCard}>
					<img
						src={
							"https://images.unsplash.com/photo-1609269310346-e03f6800ca12?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
						}
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
			<h2 className={`primary ${style.h2}`}>Rs Corner</h2>
			<ScrollMenu menuItems={listBlock()} />
		</>
	);
};

const Practice = () => {
	return (
		<div className={"practice"}>
			<h1 className="secondary text-align-center">Practice</h1>
			<Statistics />
			<Continue />
			<Subjects />
			<RsCorner />
		</div>
	);
};

export default Practice;
