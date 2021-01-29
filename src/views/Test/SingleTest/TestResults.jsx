import React, { useState } from "react";
import Lottie from "react-lottie";
import * as animationData from "assets/lottie/correct1.json";
import style from "./testResults.module.css";
import {
	RiCheckboxCircleLine,
	RiCheckboxMultipleLine,
	RiTimerLine,
} from "react-icons/ri";
import { FaTimesCircle } from "react-icons/fa";
import { GiArrowScope } from "react-icons/gi";
import { GrScorecard } from "react-icons/gr";
import { useHistory } from "react-router-dom";

const DisplayDataBlock = ({ icon, heading, score }) => (
	<div className={style.data}>
		{icon}
		<div className={style.text}>
			<div className={style.textHeading}>{heading}</div>
			<div>{score}</div>
		</div>
	</div>
);
const TestResults = ({
	onClick,
	stats: { correct, attempt, score, totalQuestions, timeTaken, totalMarks },
}) => {
	const defaultOptions = {
		loop: false,
		autoPlay: true,
		animationData: animationData.default,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	const history = useHistory();

	return (
		<div className={style.container}>
			<Lottie options={defaultOptions} height={200} width={200} />
			<div className={style.scoreCard}>
				<DisplayDataBlock
					icon={<RiTimerLine size={"4rem"} />}
					heading={"Time Taken"}
					score={timeTaken}
				/>
				<DisplayDataBlock
					icon={<RiCheckboxCircleLine size={"4rem"} />}
					heading={"Correct"}
					score={`${correct} / ${attempt}`}
				/>
				<DisplayDataBlock
					icon={<FaTimesCircle size={"4rem"} />}
					heading={"Wrong"}
					score={`${attempt - correct} / ${attempt}`}
				/>
				<DisplayDataBlock
					icon={<GiArrowScope size={"4rem"} />}
					heading={"Accuracy"}
					score={`${correct ? ((correct / attempt) * 100).toFixed(2) : 0}%`}
				/>
				<DisplayDataBlock
					icon={<GrScorecard size={"4rem"} />}
					heading={"Score"}
					score={`${score} / ${totalMarks}`}
				/>
				<DisplayDataBlock
					icon={<RiCheckboxMultipleLine size={"4rem"} />}
					heading={"Attempted"}
					score={`${attempt} / ${totalQuestions}`}
				/>
				<button className="btn-primary" onClick={onClick}>
					See all solutions
				</button>
				<button className="btn-primary" onClick={() => history.goBack(-1)}>
					Take another test
				</button>
			</div>
		</div>
	);
};

export default TestResults;
