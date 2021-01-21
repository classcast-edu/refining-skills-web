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
import TestResults from "./TestResults";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
const SingleTest = () => {
	const [options, setOptions] = useState([]);
	const timerClockRef = useRef(null);
	const { id } = useParams();
	const formikRef = useRef();

	const [studentAnswers, setStudentAnswers] = useState({});
	const [question, setQuestion] = useState(<p></p>);
	const [solution, setSolution] = useState(<p></p>);
	const [showSolution, setShowSolution] = useState(false);

	const [testData, setTestData] = useState([]);
	const [testMeta, setTestMeta] = useState({});

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [initialValues, setInitialValues] = useState({
		option: Number(studentAnswers[Number(currentQuestionIndex)]),
	});
	const instituteId = useSelector((state) => state.instituteId);

	const fetchTestMeta = async () => {
		const response = await axios.get(`/content/test_meta/${id}/`);
		setTestMeta(response.data.data);
		console.log(response.data.data.duration_minutes);
	};
	const fetchData = async () => {
		const response = await axios.get(
			`/content/test_data_v2/${instituteId}/${id}`
		);
		setTestData(response.data.data);
		timerClockRef.current.start();
		console.log(response.data.data);
	};
	useEffect(() => {
		fetchTestMeta();
		fetchData();
	}, []);

	useEffect(() => {
		//setting first question
		if (testData.length) {
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

	const changeQuestion = (value, answer, shouldNotScroll) => {
		if (currentQuestionIndex + value === testData.length) {
			timerClockRef.current.stop();
			return onOpenModal();
		}
		if (formikRef.current.values.option) {
			setStudentAnswers((ans) => {
				return {
					...ans,
					[currentQuestionIndex]: Number(formikRef.current.values.option),
				};
			});
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
			setOptions(Object.values({ option_1, option_2, option_3, option_4 }));
		}

		formikRef.current.resetForm();
		!shouldNotScroll && executeScroll();
	};

	const [correctAnswers, setCorrectAnswers] = useState(0);
	useEffect(() => {
		console.log(correctAnswers);
	}, [correctAnswers]);

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

	const [open, setOpen] = useState();

	const onOpenModal = () => setOpen(true);
	const onCloseModal = () => setOpen(false);
	return (
		<>
			<Modal
				open={open}
				onClose={onCloseModal}
				center
				classNames={{
					// overlay: "customOverlay",
					modal: "customModal",
				}}
			>
				<>
					<TestResults
						changeQuestion={changeQuestion}
						showSolution={(value) => setShowSolution(value)}
					/>
					<button
						className="btn-primary"
						onClick={() => {
							onCloseModal();
							setShowSolution(true);
							// changeQuestion(-testData.length + 1);
						}}
					>
						See solutions
					</button>
				</>
			</Modal>

			<div className={style.container}>
				<QuestionsScroll
					dummyRef={dummyRef}
					changeQuestion={changeQuestion}
					questionButtonRef={questionButtonRef}
					questionsLength={testData.length}
					currentQuestionIndex={currentQuestionIndex}
				/>
				<div>
					{/* <ProgressBar
						progress={`${
							((currentQuestionIndex + 1) * 100) / testData.length
						}%`}
					/> */}
				</div>
				<div className={style.qaContainer}>
					<div className={style.timerContainer}>
						{testMeta.duration_minutes && (
							<TimerClock
								timerClockRef={timerClockRef}
								time={testMeta.duration_minutes}
							/>
						)}

						<button
							className={style.endButton}
							onClick={() => console.log(timerClockRef.current.state)}
						>
							END
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
							// console.log(formik.values);
							return (
								<Form>
									<FormikControl
										control="customRadio"
										name={"option"}
										options={options}
									/>
									{showSolution && (
										<>
											<h2 className="black">Solution</h2>
											<div
												className={style.solution}
												dangerouslySetInnerHTML={{
													__html: solution,
												}}
											></div>
										</>
									)}
									<div className={style.actions}>
										<button
											className={style.previousButton}
											disabled={currentQuestionIndex < 1}
											type="button"
											onClick={() => {
												changeQuestion(-1);
											}}
										>
											<FaAngleLeft />
											Previous
										</button>
										<button className={style.nextButton} type="submit">
											Next
											<FaAngleRight />
										</button>
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
