import React from "react";
import Scroll from "components/ScrollMenu";
import style from "./singleTest.module.css";

const QuestionsScroll = ({
	currentQuestionIndex,
	changeQuestion,
	questionsLength,
	questionButtonRef,
	dummyRef,
}) => {
	return (
		<Scroll
			menuItems={Array.from(Array(questionsLength).keys()).map((item) => {
				// console.log(item, currentQuestionIndex);
				return (
					<button
						className={style.questionNumberButton}
						key={item}
						ref={item === currentQuestionIndex ? questionButtonRef : dummyRef}
						style={{
							backgroundColor:
								item === currentQuestionIndex && "var(--primary)",
							color: item === currentQuestionIndex && "white",
						}}
						onClick={() =>
							changeQuestion(item - currentQuestionIndex, null, true)
						}
					>
						{item + 1}
					</button>
				);
			})}
			margin="auto"
			width="100%"
			// width="calc(100% - 4rem)"
			position="static"
			transform="translateY(5%)"
		/>
	);
};

export default QuestionsScroll;
