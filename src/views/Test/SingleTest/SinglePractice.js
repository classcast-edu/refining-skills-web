import FormikControl from "components/Formik/FormikControl";
import { Form, Formik } from "formik";
import parse, { attributesToProps } from "html-react-parser";
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
import { toast } from "react-hot-toast";
import Lottie from "react-lottie";
import animationData from "assets/lottie/wrong_answer.json";
import correctAnswerr from "assets/lottie/correct_answer.json";
import correctAnswerAudio from "assets/audio/correct.mp3";
import incorrectAnswerAudio from "assets/audio/incorrect.mp3";
import submitAnswerAudio from "assets/audio/popup.mp3";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
var visitedQuestions = [];
var wasWrongAnswer = [];
var solutionEnabled = [];

const QUESTION_TYPES = {
  FILL: 4,
  TRUE_FALSE: 5,
  SUBJECTIVE: 6,
};

const wrongAnswerLottie = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const toastStyleCorrect = { border: "3px solid #00F85A" };

const toastStyleWrong = {
  border: "3px solid #FF5050",
};

const correctAnswerLottie = {
  loop: true,
  autoplay: true,
  animationData: correctAnswerr,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const zoomOptions = {
  replace: (domNode) => {
    if (domNode.attribs && domNode.name === "img") {
      const props = attributesToProps(domNode.attribs);
      return (
        <div style={{ position: "relative" }}>
          <TransformWrapper initialScale={1}>
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <>
                <div className={["tools", style.toolBarContainer].join(" ")}>
                  <button
                    type="button"
                    className={style.zoomControlsStyles}
                    onClick={() => zoomIn()}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className={style.zoomControlsStyles}
                    onClick={() => zoomOut()}
                  >
                    -
                  </button>
                  {/* <button
                    type="button"
                    className={style.zoomControlsStyles}
                    sonClick={() => resetTransform()}
                  >
                    x
                  </button> */}
                </div>
                <TransformComponent>
                  <img {...props} />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>
      );
    }
  },
};

const SingleTest = () => {
  const correctAudio = new Audio(correctAnswerAudio);
  const incorrectAudio = new Audio(incorrectAnswerAudio);
  const submitAudio = new Audio(submitAnswerAudio);

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
  const [disableCheck, setDisableCheck] = useState(false);
  const [initialErrors, setInitialErrors] = useState(null);
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

    if (
      testData &&
      testData.length > 0 &&
      Number(testData[0].question_type) === QUESTION_TYPES.SUBJECTIVE
    ) {
      setDisableSolutionButton(false);
    }
  }, [testData]);

  useEffect(() => {
    //if user has answered a question it is stored in an object
    //which is accessed whenever that question is again viewed
    setCorrectAnswer(null);
    setShowSolution(false);
    setShowCorrectAnswer(false);
    setInitialErrors(null);
    setInitialValues({
      option:
        testData[currentQuestionIndex] &&
        studentAnswers[Number(currentQuestionIndex)],
    });

    if (currentQuestionIndex && testData.length > 0) {
      if (visitedQuestions.includes(currentQuestionIndex)) {
        // formikRef.current.setErrors({ options: 1 });
        console.log(
          "question index",
          currentQuestionIndex,
          testData[currentQuestionIndex]
        );
        const {
          is_option_1_correct,
          is_option_2_correct,
          is_option_3_correct,
          is_option_4_correct,
          solution,
          question_type,
          fitb_correct,
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
        setDisableSolutionButton(true);
        setInitialValues({
          option:
            testData[currentQuestionIndex] &&
            studentAnswers[Number(currentQuestionIndex)],
        });

        if (wasWrongAnswer.includes(currentQuestionIndex))
          if (Number(question_type) == QUESTION_TYPES.FILL) {
            const fillAnswer = fitb_correct
              .trim()
              .replace(".", "")
              .toLowerCase();

            setInitialErrors({
              option: fillAnswer,
            });
          } else {
            setInitialErrors({
              option:
                testData[currentQuestionIndex] &&
                studentAnswers[Number(currentQuestionIndex)],
            });
          }

        setCorrectAnswer(
          _.findIndex(checkOptions, (option) => option === true) + 1
        );
        setSolution(solution);
        setShowCorrectAnswer(true);
        setShowSolution(true);
      }
      // setCorrectAnswer(null);
      // setShowCorrectAnswer(false);
      if (
        testData[currentQuestionIndex] &&
        testData[currentQuestionIndex].question_type ==
          QUESTION_TYPES.SUBJECTIVE
      ) {
        setDisableSolutionButton(false);
        setShowCorrectAnswer(true);
      }
    }
    // } else setDisableSolutionButton(true);
    // setShowSolution(false);
  }, [currentQuestionIndex, testData]);

  const [studentTestData, setStudentTestData] = useState({});

  const playSound = (type) => {
    if (type === "correct") {
      correctAudio.play();
    }
    if (type === "incorrect") {
      incorrectAudio.play();
    }
    if (type === "submit") {
      submitAudio.play();
    }
  };

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
      playSound("submit");
      return endTestHandler();
    }

    if (Number(testData[currentQuestionIndex].question_type) === 6) {
      if (disableCheck) setDisableCheck(false);
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
    if (Number(testData[currentQuestionIndex].question_type) === 6) {
      setDisableCheck(true);
    }

    //saving user option
    setStudentAnswers((ans) => {
      return { ...ans, [currentQuestionIndex]: Number(values.option) };
    });
    visitedQuestions.push(currentQuestionIndex);
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
        playSound("correct");
        toast(
          <div className="d-flex align-items-center">
            <span
              className="font-weight-bolder"
              style={{ fontSize: "1.2em !important" }}
            >
              You got it; Keep it up
            </span>
          </div>,
          {
            style: toastStyleCorrect,
            icon: (
              <Lottie options={correctAnswerLottie} height={80} width={80} />
            ),
          }
        );
        setShowSolution(true);
        return setShowCorrectAnswer(true);
      } else {
        submitProps.setErrors({ option: fillAnswer });
        // If the answer in wrong, show the correct solution
        setShowSolution(true);
        setShowCorrectAnswer(true);
      }
    }
    if (
      question_type == QUESTION_TYPES.TRUE_FALSE && is_True
        ? "1" == answer
        : "2" == answer
        ? question_type == QUESTION_TYPES.TRUE_FALSE
          ? true
          : false
        : false
    ) {
      playSound("correct");
      toast(
        <div className="d-flex align-items-center">
          <span
            className="font-weight-bolder"
            style={{ fontSize: "1.2em !important" }}
          >
            You got it; Keep it up
          </span>
        </div>,
        {
          style: toastStyleCorrect,
          icon: <Lottie options={correctAnswerLottie} height={80} width={80} />,
        }
      );
      // if (
      //     (question_type == QUESTION_TYPES.SUBJECTIVE && is_True
      //       ? "1" == answer
      //       : "2" == answer) == false
      //   ) {
      //     console.log("SUBJECTIVE");
      //   } else {
      //     console.log("ELSE BLOCK");
      //     toast(
      //       <div className="d-flex align-items-center">
      //         <span
      //           className="font-weight-bolder"
      //           style={{ fontSize: "1.2em !important" }}
      //         >
      //           You got it; Keep it up
      //         </span>
      //       </div>,
      //       {
      //         icon: (
      //           <Lottie options={correctAnswerLottie} height={80} width={80} />
      //         ),
      //       }
      //     );
      //   }

      // If the answer in wrong, show the correct solution
      setShowSolution(true);
      setShowCorrectAnswer(true);
      return setShowCorrectAnswer(true);
    }

    if (question_type == QUESTION_TYPES.SUBJECTIVE) {
      setShowSolution(true);
      setShowCorrectAnswer(true);
      return setShowCorrectAnswer(true);
    }

    if (checkOptions[Number(values.option) - 1]) {
      setCorrectAnswer(
        _.findIndex(checkOptions, (option) => option === true) + 1
      );
      playSound("correct");
      toast(
        <div className="d-flex align-items-center">
          <span
            className="font-weight-bolder"
            style={{ fontSize: "1.2em !important" }}
          >
            You got it; Keep it up
          </span>
        </div>,
        {
          style: toastStyleCorrect,
          icon: <Lottie options={correctAnswerLottie} height={80} width={80} />,
        }
      );
      setShowSolution(true);
      setShowCorrectAnswer(true);
      // playSound("correct");
      // toast(
      //   <div className="d-flex align-items-center">
      //     <span
      //       className="font-weight-bolder"
      //       style={{ fontSize: "1.2em !important" }}
      //     >
      //       You got it; Keep it up
      //     </span>
      //   </div>,
      //   {
      //     style: toastStyleCorrect,
      //     icon: <Lottie options={correctAnswerLottie} height={80} width={80} />,
      //   }
      // );
    } else {
      submitProps.setErrors({
        option:
          question_type == QUESTION_TYPES.FILL ? fillAnswer : values.option,
      });
      // If the answer in wrong, show the correct solution
      wasWrongAnswer.push(currentQuestionIndex);
      setShowSolution(true);
      setShowCorrectAnswer(true);
      playSound("incorrect");
      toast(
        <div className="d-flex align-items-center">
          <span
            className="font-weight-bolder"
            style={{ fontSize: "1.2em !important" }}
          >
            oops, that's incorrect
          </span>
        </div>,
        {
          icon: <Lottie options={wrongAnswerLottie} height={80} width={80} />,
          style: toastStyleWrong,
        }
      );
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
        initialErrors={initialErrors}
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
                  <span className={style.questionContentContainer}>
                    {parse(question, zoomOptions)}
                  </span>
                </div>
                {testData[currentQuestionIndex] &&
                testData[currentQuestionIndex].question_type ==
                  QUESTION_TYPES.FILL ? (
                  <FormikControl
                    control="customInput"
                    name="option"
                    // disabled={showSolution}
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
                  <>
                    <FormikControl
                      control="customRadio"
                      name={"option"}
                      options={options}
                      showCorrectAnswer={showCorrectAnswer}
                      correctAnswer={correctAnswer}
                      // disabled={showCorrectAnswer}
                    />
                  </>
                )}
                {showSolution && solution && (
                  <div className={style.solutionBox} ref={solutionRef}>
                    <h3 className={style.solutionText}>Solution</h3>
                    <span className={style.solution}>
                      {parse(solution, zoomOptions)}
                    </span>
                  </div>
                )}
              </div>
              <div className={style.actions}>
                {/* <button
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
                </button> */}
                {/* OutDated: if question type is not 1 then show next button */}

                {showCorrectAnswer ||
                ![...Object.values(QUESTION_TYPES), 1].includes(
                  Number(testData[currentQuestionIndex].question_type)
                ) ||
                Number(testData[currentQuestionIndex].question_type) === 6 ? (
                  <>
                    {Number(testData[currentQuestionIndex].question_type) ===
                    6 ? (
                      <button
                        className={[style.nextButton, style.mr_1].join(" ")}
                        type="submit"
                        disabled={disableCheck}
                      >
                        Answer/Solution
                      </button>
                    ) : (
                      ""
                    )}

                    <button
                      className={[style.nextButton, style.ml_1].join(" ")}
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
                  </>
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
