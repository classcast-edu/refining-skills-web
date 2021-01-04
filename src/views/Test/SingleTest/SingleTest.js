import FormikControl from "components/Formik/FormikControl";
import ProgressBar from "components/ProgressBar/ProgressBar";
import { Form, Formik } from "formik";

import style from "./singleTest.module.css";

const SingleTest = () => {
	const options = [
		{ id: 1, name: "Ayush" },
		{ id: 2, name: "Raj" },
		{ id: 3, name: "fdsfasf" },
		{ id: 4, name: "fdsaf" },
	];

	const initialValues = {
		options: "",
	};
	return (
		<>
			<div className={style.container}>
				<div style={{ margin: "2rem 0" }}>
					<ProgressBar progress={"10%"} />
				</div>
				<span className={style.questionNumber}>Q.1 </span>
				<span className={style.question}>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat sed,
					cum, blanditiis ratione iste, facilis quae architecto optio quod
					exercitationem ex quidem numquam porro. Nulla ad cumque sequi commodi
					sint?
				</span>
				<Formik initialValues={initialValues}>
					<Form>
						<FormikControl control="radio" name={"options"} options={options} />
					</Form>
				</Formik>
				{/* <button className={style.submitButton}>submit</button> */}

				<div className={style.actions}>
					<button className={style.previousButton}>View Solution</button>
					<button className={style.nextButton}>Submit</button>
				</div>
				{/* <div>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint ut
					illum dolorem temporibus atque pariatur, at eligendi cupiditate rem
					vitae? Quasi, asperiores incidunt dolores repellendus consectetur
					voluptatum perspiciatis repellat vel. illum dolorem temporibus atque
					pariatur, at eligendi cupiditate rem vitae? Quasi, asperiores incidunt
					dolores repellendus consectetur voluptatum perspiciatis repellat vel.
					illum dolorem temporibus atque pariatur, at eligendi cupiditate rem
					vitae? Quasi, asperiores incidunt dolores repellendus consectetur
					voluptatum perspiciatis repellat vel. illum dolorem temporibus atque
					pariatur, at eligendi cupiditate rem vitae? Quasi, asperiores incidunt
					dolores repellendus consectetur voluptatum perspiciatis repellat vel.
				</div> */}
			</div>
		</>
	);
};

export default SingleTest;
