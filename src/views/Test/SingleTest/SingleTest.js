import FormikControl from "components/Formik/FormikControl";
import { Form, Formik } from "formik";

import style from "./singleTest.module.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import TimerClock from "./TimerClock";
import QuestionsScroll from "./QuestionsScroll";
import TestResults from "./TestResults";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import CustomSpinner from "components/CustomSpinner";

const SingleTest = () => {
	const [options, setOptions] = useState([]);
	const timerClockRef = useRef(null);
	const { testId } = useParams();

	const formikRef = useRef();
	const solutionRef = useRef();
	const containerRef = useRef();

	const [loading, setLoading] = useState(false);
	const [studentAnswers, setStudentAnswers] = useState({});
	const [question, setQuestion] = useState(<p></p>);
	const [solution, setSolution] = useState("");
	const [showSolution, setShowSolution] = useState(false);

	const [testData, setTestData] = useState([]);
	const [testMeta, setTestMeta] = useState({});

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [initialValues, setInitialValues] = useState({
		option: Number(studentAnswers[Number(currentQuestionIndex)]),
	});
	const instituteId = useSelector((state) => state.instituteId);

	useEffect(() => {
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
	}, [currentQuestionIndex]);
	useEffect(() => {
		if (containerRef.current) containerRef.current.scrollTop = 0;
	}, [containerRef, question]);

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
		const { m, s } = timerClockRef.current.state;
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
		// if (currentQuestionIndex + value === testData.length && shouldNotScroll) {
		// 	// timerClockRef.current.stop();
		// 	return endTestHandler();
		// }
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

		formikRef.current && formikRef.current.resetForm();
		!shouldNotScroll && executeScroll();
	};

	const [correctAnswers, setCorrectAnswers] = useState(0);

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
		if (checkOptions[Number(values.option) - 1]) {
			setCorrectAnswers((ca) => ca + 1);
		}
		// submitProps.resetForm();
		changeQuestion(1);
		//same concept as pulling options
		//we pull which options are correct arrange them in array
		//then check it it's true since we get the option number from
		//values object which comes from formik valus.option

		// if (!values.option) {
		// 	changeQuestion(1);
		// 	submitProps.resetForm();
		// } else if (checkOptions[Number(values.option) - 1]) {
		// 	changeQuestion(1);
		// 	submitProps.resetForm();
		// } else {
		// 	// console.log(submitProps);
		// 	submitProps.setErrors({ option: values.option });
		// }
	};
	const questionButtonRef = useRef(null);
	const dummyRef = useRef(null);
	const executeScroll = () => {
		// console.log(questionButtonRef.current);
		questionButtonRef.current &&
			questionButtonRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "center",
			});
	};

	const [open, setOpen] = useState(false);
	const onOpenModal = () => setOpen(true);
	const onCloseModal = () => setOpen(false);
	const [endTest, setEndTest] = useState(false);
	const [stopTime, setStopTime] = useState(false);

	useEffect(() => {
		if (endTest) {
			// setStopTime(true);
			calculateStats();
			onOpenModal();
			setEndTest(false);
		}
	}, [studentTestData]);

	const endTestHandler = () => {
		if (window.confirm("Do you want to end the test?")) {
			setStopTime(true);
			timerClockRef.current.stop();
			setEndTest(() => true);
			if (formikRef.current.values.option) {
				return changeQuestion(0);
			} else {
				calculateStats();
				onOpenModal();
				return setEndTest(false);
			}
		} else return;
	};

	return loading ? (
		<>
			<CustomSpinner />
		</>
	) : (
		<div className={style.paddingBox}>
			<Modal
				open={open}
				onClose={onCloseModal}
				center
				classNames={{
					// overlay: "customOverlay",
					modal: "customModal",
				}}
			>
				<div>
					<TestResults
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

			<Formik
				initialValues={initialValues}
				enableReinitialize
				onSubmit={onSubmit}
				innerRef={formikRef}
			>
				{(formik) => {
					return (
						<Form>
							<QuestionsScroll
								dummyRef={dummyRef}
								changeQuestion={changeQuestion}
								questionButtonRef={questionButtonRef}
								questionsLength={testData.length}
								currentQuestionIndex={currentQuestionIndex}
							/>
							<div className={style.timerContainer}>
								{testMeta.duration_minutes && testData.length > 0 && (
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
									type="button"
								>
									{stopTime ? "View Results" : "End"}
								</button>
							</div>
							<div className={style.container} ref={containerRef}>
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

								<FormikControl
									control="customRadio"
									name={"option"}
									options={options}
								/>
								{showSolution && solution && (
									<div className={style.solutionBox} ref={solutionRef}>
										<h3 className={style.solutionText}>Solution</h3>
										<span
											className={style.solution}
											dangerouslySetInnerHTML={{
												__html: solution,
											}}
										></span>
									</div>
								)}
							</div>
							<div className={style.actions}>
								<button
									className={style.previousButton}
									disabled={currentQuestionIndex < 1}
									type="button"
									onClick={() => changeQuestion(-1)}
								>
									<FaAngleLeft />
									Previous
								</button>
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
							</div>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default SingleTest;
