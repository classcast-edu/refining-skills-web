import React, { useState } from "react";
import Lottie from "react-lottie";
import * as animationData from "assets/lottie/correct1.json";
import style from "./practice.module.css";
import {
	RiCheckboxCircleLine,
	RiCheckboxMultipleLine,
	RiTimerLine,
} from "react-icons/ri";
import { FaTimesCircle } from "react-icons/fa";
import { GiArrowScope } from "react-icons/gi";
import { GrScorecard } from "react-icons/gr";
import { useHistory, useLocation, useParams } from "react-router-dom";

const DisplayDataBlock = ({ icon, heading, score }) => (
	<div className={style.data}>
		{icon}
		<div className={style.text}>
			<div>{heading}</div>
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
	const { id, courseId } = useParams();
	// console.log(id, courseId);
	return (
		<div className={style.container}>
			<Lottie options={defaultOptions} height={200} width={200} />
			<button
				className="btn-primary"
				onClick={() =>
					history.push(`/admin/practice/${id}/${courseId}?redirect=true`)
				}
			>
				Take another test
			</button>
		</div>
	);
};

export default TestResults;
