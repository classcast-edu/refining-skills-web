import FormikControl from "components/Formik/FormikControl";
import ProgressBar from "components/ProgressBar/ProgressBar";
import { Form, Formik, useFormik, useFormikContext } from "formik";

import style from "./singleTest.module.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import TimerClock from "./TimerClock";
import QuestionsScroll from "./QuestionsScroll";
import CustomModal from "components/CustomModal";
import PracticeResults from "./PracticeResults";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import CustomSpinner from "components/CustomSpinner";
const SingleTest = () => {
	const [options, setOptions] = useState([]);
	const timerClockRef = useRef(null);
	const { id, courseId, testId } = useParams();
	const formikRef = useRef();
	const [loading, setLoading] = useState(false);
	const [studentAnswers, setStudentAnswers] = useState({});
	const [question, setQuestion] = useState(<p></p>);
	const [solution, setSolution] = useState("");
	const [showSolution, setShowSolution] = useState(false);

	const [testData, setTestData] = useState([]);
	const [testMeta, setTestMeta] = useState({});
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
	const [disableSolutionButton, setDisableSolutionButton] = useState(true);
	const [correctAnswer, setCorrectAnswer] = useState(null);
	const [initialValues, setInitialValues] = useState({
		option: Number(studentAnswers[Number(currentQuestionIndex)]),
	});
	const instituteId = useSelector((state) => state.instituteId);

	const fetchTestMeta = async () => {
		const response = await axios.get(`/content/test_meta/${testId}/`);
		setTestMeta(response.data.data);
	};
	const fetchData = async () => {
		try {
			setLoading(true);
			const response = await axios.get(
				`/content/test_data_v2/${instituteId}/${testId}`
			);
			setTestData(response.data.data);
			setLoading(false);
			// console.log(response.data.data);
		} catch (error) {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchTestMeta();
		fetchData();
	}, []);

	useEffect(() => {
		//setting first question
		if (testData.length > 0) {
			changeQuestion(0);
		}
	}, [testData]);

	useEffect(() => {
		//if user has answered a question it iw stored in an object
		//which is accessed whenever that question is again viewed
		setInitialValues({
			option: Number(studentAnswers[Number(currentQuestionIndex)]),
		});
		setCorrectAnswer(null);
		setShowCorrectAnswer(false);
		setDisableSolutionButton(true);
		setShowSolution(false);
	}, [currentQuestionIndex]);

	const [studentTestData, setStudentTestData] = useState({});
	const handleStudentTestData = () => {
		const {
			is_option_1_correct,
			is_option_2_correct,
			is_option_3_correct,
			is_option_4_correct,
			max_marks,
			negative_marks,
		} = testData[currentQuestionIndex];
		const options = [
			is_option_1_correct,
			is_option_2_correct,
			is_option_3_correct,
			is_option_4_correct,
		];

		const answer = formikRef.current && formikRef.current.values.option;
		if (!answer) return null;
		else if (options[Number(answer) - 1]) {
			setStudentTestData((ans) => {
				return {
					...ans,
					[Number(currentQuestionIndex)]: {
						correct: true,
						attempt: true,
						max_marks,
						negative_marks,
					},
				};
			});
		} else {
			setStudentTestData((ans) => {
				return {
					...ans,
					[Number(currentQuestionIndex)]: {
						correct: false,
						attempt: true,
						max_marks,
						negative_marks,
					},
				};
			});
		}
	};

	const [stats, setStats] = useState({
		correct: 0,
		attempt: 0,
		score: 0,
		totalQuestions: 0,
	});
	const calculateStats = () => {
		const { h, m, s } = timerClockRef.current.state;
		setStats(() => {
			return {
				correct: 0,
				attempt: 0,
				score: 0,
				totalQuestions: testData.length,
				timeTaken: `${testMeta.duration_minutes - m - 1} mins ${60 - s}  sec`,
				totalMarks: testData.reduce((acc, obj) => acc + obj.max_marks, 0),
			};
		});

		return Object.values(studentTestData).map((question) => {
			if (question.attempt) {
				setStats((prevState) => {
					return {
						...prevState,
						attempt: prevState.attempt + 1,
					};
				});
				if (question.correct) {
					return setStats((prevState) => {
						return {
							...prevState,
							correct: prevState.correct + 1,
							score: prevState.score + question.max_marks,
						};
					});
				} else {
					return setStats((prevState) => {
						return {
							...prevState,
							score: prevState.score - question.negative_marks,
						};
					});
				}
			}
		});
	};

	const changeQuestion = (value, answer, shouldNotScroll) => {
		if (currentQuestionIndex + value === testData.length) {
			return endTestHandler();
		}
		if (formikRef.current && formikRef.current.values.option) {
			setStudentAnswers((ans) => {
				return {
					...ans,
					[currentQuestionIndex]: Number(formikRef.current.values.option),
				};
			});
		}
		if (testData[currentQuestionIndex + value].question_type != 6) {
			handleStudentTestData();
		}
		setCurrentQuestionIndex(currentQuestionIndex + value);
		const {
			option_1,
			option_2,
			option_3,
			option_4,
			question,
			solution,
		} = testData[currentQuestionIndex + value];
		//putting 4 options in an array and setting it whenever question changes
		setQuestion(question);
		setSolution(solution);
		if (testData[currentQuestionIndex + value].question_type != 6) {
			setOptions(
				Object.values({ option_1, option_2, option_3, option_4 }).filter((x) =>
					Boolean(x)
				)
			);
		}
		return formikRef.current && formikRef.current.resetForm();

		// !shouldNotScroll && executeScroll();
	};

	const onSubmit = (values, submitProps) => {
		//saving user option
		setStudentAnswers((ans) => {
			return { ...ans, [currentQuestionIndex]: Number(values.option) };
		});
		const {
			is_option_1_correct,
			is_option_2_correct,
			is_option_3_correct,
			is_option_4_correct,
		} = testData[currentQuestionIndex];
		const checkOptions = [
			is_option_1_correct,
			is_option_2_correct,
			is_option_3_correct,
			is_option_4_correct,
		];

		// changeQuestion(1);
		// submitProps.resetForm();
		// if (checkOptions[Number(values.option) - 1]) {
		// 	setCorrectAnswers((ca) => ca + 1);
		// }
		// submitProps.resetForm();
		// changeQuestion(1);
		//same concept as pulling options
		//we pull which options are correct arrange them in array
		//then check it it's true since we get the option number from
		//values object which comes from formik valus.option
		setDisableSolutionButton(false);
		setCorrectAnswer(
			_.findIndex(checkOptions, (option) => option === true) + 1
		);
		if (checkOptions[Number(values.option) - 1]) {
			setCorrectAnswer(
				_.findIndex(checkOptions, (option) => option === true) + 1
			);
			return setShowCorrectAnswer(true);

			// changeQuestion(1);
			// submitProps.resetForm();
		} else {
			submitProps.setErrors({ option: values.option });
			// setShowSolution(true);
		}
	};

	const [open, setOpen] = useState(false);

	const onOpenModal = () => setOpen(true);
	const onCloseModal = () => setOpen(false);
	const [endTest, setEndTest] = useState(false);
	const [stopTime, setStopTime] = useState(false);

	useEffect(() => {
		if (endTest) {
			setStopTime(true);
			calculateStats();
			onOpenModal();
			setEndTest(false);
		}
	}, [studentTestData]);

	const endTestHandler = () => {
		axios.post("/content/update_progress/", {
			courseid: courseId,
			subject: id,
			block_id: testId,
			insti: instituteId,
			percentage: 100,
		});
		setStopTime(true);
		timerClockRef.current.stop();
		setEndTest(() => true);
		if (formikRef.current.values.option) {
			changeQuestion(0);
		} else {
			calculateStats();
			onOpenModal();
			setEndTest(false);
		}
	};

	return loading ? (
		<CustomSpinner />
	) : (
		<>
			<Modal
				open={open}
				onClose={onCloseModal}
				center
				classNames={{
					// overlay: "customOverlay",
					modal: "customModalPractice",
				}}
			>
				<div>
					<PracticeResults
						changeQuestion={changeQuestion}
						showSolution={(value) => setShowSolution(value)}
						onClick={() => {
							onCloseModal();
							setShowSolution(true);
							// changeQuestion(-testData.length + 1);
						}}
						stats={stats}
					/>
				</div>
			</Modal>

			<div className={style.container}>
				<div className={style.qaContainer}>
					<div className={style.timerContainer}>
						{testMeta.duration_minutes && (
							<TimerClock
								timerClockRef={timerClockRef}
								time={testMeta.duration_minutes}
								endTestHandler={endTestHandler}
								stopTime={stopTime}
							/>
						)}

						<button
							className={style.endButton}
							onClick={stopTime ? onOpenModal : endTestHandler}
						>
							{stopTime ? "View Results" : "End"}
						</button>
					</div>
					<div className={style.question}>
						<span className={style.questionNumber}>
							Q {currentQuestionIndex + 1}{" "}
						</span>
						<span
							dangerouslySetInnerHTML={{
								__html: question,
							}}
						></span>
					</div>

					<Formik
						initialValues={initialValues}
						enableReinitialize
						onSubmit={onSubmit}
						innerRef={formikRef}
					>
						{(formik) => {
							return (
								<Form>
									<FormikControl
										control="customRadio"
										name={"option"}
										options={options}
										showCorrectAnswer={showCorrectAnswer}
										correctAnswer={correctAnswer}
										// disabled={showCorrectAnswer}
									/>
									{showSolution && solution && (
										<div>
											<h3 className={style.solutionText}>Solution</h3>
											<div
												className={style.solution}
												dangerouslySetInnerHTML={{
													__html: solution,
												}}
											></div>
										</div>
									)}
									<div className={style.actions}>
										<button
											className={style.previousButton}
											disabled={disableSolutionButton}
											type="button"
											onClick={() => {
												setShowSolution(true);
												setShowCorrectAnswer(true);
											}}
										>
											View Solution
										</button>
										{!showCorrectAnswer ? (
											<button className={style.nextButton} type="submit">
												Check
											</button>
										) : (
											<button
												className={style.nextButton}
												type="button"
												onClick={() => changeQuestion(1)}
											>
												{currentQuestionIndex + 1 === testData.length ? (
													"Submit"
												) : (
													<>
														Next
														<FaAngleRight />
													</>
												)}
											</button>
										)}
									</div>
								</Form>
							);
						}}
					</Formik>
				</div>
			</div>
		</>
	);
};

export default SingleTest;
