import FormikControl from "components/Formik/FormikControl";
import { Form, Formik } from "formik";

import style from "./singleTest.module.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { FaAngleRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import TimerClock from "./TimerClock";

import PracticeResults from "./PracticeResults";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import CustomSpinner from "components/CustomSpinner";
import QuestionsScroll from "./QuestionsScroll";

const QUESTION_TYPES = {
	FILL: 4,
	TRUE_FALSE: 5,
	SUBJECTIVE: 6,
};

const SingleTest = () => {
	const { id, courseId, testId } = useParams();

	const timerClockRef = useRef(null);
	const formikRef = useRef();
	const questionRef = useRef();
	const solutionRef = useRef();

	const [options, setOptions] = useState([]);

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
		option:
			testData[currentQuestionIndex] &&
			studentAnswers[Number(currentQuestionIndex)],
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
					`/content/test_data_v2/${instituteId}/${testId}/`
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
		//if user has answered a question it is stored in an object
		//which is accessed whenever that question is again viewed
		setInitialValues({
			option:
				testData[currentQuestionIndex] &&
				studentAnswers[Number(currentQuestionIndex)],
		});
		setCorrectAnswer(null);
		setShowCorrectAnswer(false);
		if (
			testData[currentQuestionIndex] &&
			testData[currentQuestionIndex].question_type == QUESTION_TYPES.SUBJECTIVE
		) {
			setDisableSolutionButton(false);
			setShowCorrectAnswer(true);
		} else setDisableSolutionButton(true);
		setShowSolution(false);
	}, [currentQuestionIndex]);

	const [studentTestData, setStudentTestData] = useState({});
	const handleStudentTestData = () => {
		const {
			question_type,
			fitb_correct,
			is_True,
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
		if (question_type == QUESTION_TYPES.FILL) {
			const fillAnswer = fitb_correct.trim().replace(".", "").toLowerCase();
			if (answer.trim().toLowerCase() === fillAnswer) {
				return studentTestDataHelper(true, true, max_marks, negative_marks);
			} else {
				return studentTestDataHelper(false, true, max_marks, negative_marks);
			}
		} else if (question_type == QUESTION_TYPES.TRUE_FALSE) {
			// console.log(answer, is_True);
			return studentTestDataHelper(
				is_True ? "1" == answer : "2" == answer,
				true,
				max_marks,
				negative_marks
			);
		} else if (options[Number(answer) - 1]) {
			return studentTestDataHelper(true, true, max_marks, negative_marks);
		} else {
			return studentTestDataHelper(false, true, max_marks, negative_marks);
		}
	};

	const studentTestDataHelper = (
		correct,
		attempt = true,
		max_marks,
		negative_marks
	) =>
		setStudentTestData((ans) => {
			return {
				...ans,
				[Number(currentQuestionIndex)]: {
					correct,
					attempt,
					max_marks,
					negative_marks,
				},
			};
		});

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
					[currentQuestionIndex]: formikRef.current.values.option,
				};
			});
		}
		if (testData[currentQuestionIndex + value].question_type != 6) {
			handleStudentTestData();
		}
		setCurrentQuestionIndex(currentQuestionIndex + value);
		const { option_1, option_2, option_3, option_4, question, solution } =
			testData[currentQuestionIndex + value];
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
		//if there is no value then we have to make sure nothing happens
		if (!values.option && testData[currentQuestionIndex].question_type != 6) {
			return null;
		}
		//saving user option
		setStudentAnswers((ans) => {
			return { ...ans, [currentQuestionIndex]: Number(values.option) };
		});
		const {
			is_True,
			fitb_correct,
			question_type,
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

		//same concept as pulling options
		//we pull which options are correct arrange them in array
		//then check it it's true since we get the option number from
		//values object which comes from formik valus.option
		setDisableSolutionButton(false);
		setCorrectAnswer(
			_.findIndex(checkOptions, (option) => option === true) + 1
		);
		const answer = values.option;

		const fillAnswer = fitb_correct.trim().replace(".", "").toLowerCase();
		if (question_type == QUESTION_TYPES.FILL) {
			if (answer.trim().toLowerCase() === fillAnswer) {
				submitProps.setErrors({
					option: fillAnswer,
				});
				return setShowCorrectAnswer(true);
			} else submitProps.setErrors({ option: fillAnswer });
		}
		if (
			question_type == QUESTION_TYPES.TRUE_FALSE && is_True
				? "1" == answer
				: "2" == answer
		) {
			return setShowCorrectAnswer(true);
		}
		if (checkOptions[Number(values.option) - 1]) {
			setCorrectAnswer(
				_.findIndex(checkOptions, (option) => option === true) + 1
			);
			return setShowCorrectAnswer(true);
		} else {
			submitProps.setErrors({
				option:
					question_type == QUESTION_TYPES.FILL ? fillAnswer : values.option,
			});
		}
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
			setStopTime(true);
			calculateStats();
			onOpenModal();
			setEndTest(false);
		}
	}, [studentTestData, endTest, calculateStats]);

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
		// if user is on a question and clicks on end test then
		// we still need to store the answer and calc stats accordingly
		if (formikRef.current.values.option) {
			changeQuestion(0);
		} else {
			calculateStats();
			onOpenModal();
			setEndTest(false);
		}
	};
	useEffect(() => {
		if (showSolution) {
			solutionRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "start",
			});
		}
	}, [showSolution]);

	useEffect(() => {
		if (questionRef.current) questionRef.current.scrollTop = 0;
	}, [questionRef, question]);

	return loading ? (
		<CustomSpinner />
	) : testData.length === 0 ? (
		<h2
			className={`black text-center`}
			style={{
				display: "flex",
				justifyContent: "center",
				marginTop: "5.4rem",
			}}
		>
			This test is not available yet
		</h2>
	) : (
		<div className={style.paddingBox}>
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

			<Formik
				initialValues={initialValues}
				key={currentQuestionIndex}
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
							{/* {JSON.stringify(formik.errors)} */}
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
									End
								</button>
							</div>
							<div className={style.container}>
								<div className={style.question} ref={questionRef}>
									<span className={style.questionNumber}>
										Q {currentQuestionIndex + 1}{" "}
									</span>
									<span
										dangerouslySetInnerHTML={{
											__html: question,
										}}
									></span>
								</div>
								{testData[currentQuestionIndex] &&
								testData[currentQuestionIndex].question_type ==
									QUESTION_TYPES.FILL ? (
									<FormikControl
										control="customInput"
										name="option"
										disabled={showSolution}
										showCorrectAnswer={showCorrectAnswer}
										solution={testData[currentQuestionIndex].fitb_correct}
									/>
								) : testData[currentQuestionIndex].question_type ==
								  QUESTION_TYPES.TRUE_FALSE ? (
									<FormikControl
										control="customRadio"
										name={"option"}
										options={["True", "False"]}
										showCorrectAnswer={showCorrectAnswer}
										correctAnswer={
											testData[currentQuestionIndex].is_True ? "1" : "2"
										}
									/>
								) : (
									<FormikControl
										control="customRadio"
										name={"option"}
										options={options}
										showCorrectAnswer={showCorrectAnswer}
										correctAnswer={correctAnswer}
										// disabled={showCorrectAnswer}
									/>
								)}

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
									disabled={
										(testData[currentQuestionIndex] &&
											![...Object.values(QUESTION_TYPES), 1].includes(
												Number(testData[currentQuestionIndex].question_type)
											)) ||
										disableSolutionButton
									}
									type="button"
									onClick={() => {
										setShowSolution(true);
										setShowCorrectAnswer(true);
									}}
								>
									View Solution
								</button>
								{/* OutDated: if question type is not 1 then show next button */}
								{showCorrectAnswer ||
								![...Object.values(QUESTION_TYPES), 1].includes(
									Number(testData[currentQuestionIndex].question_type)
								) ? (
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
								) : (
									<button className={style.nextButton} type="submit">
										Check
									</button>
								)}
							</div>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default SingleTest;
