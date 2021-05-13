import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import style from "./customInput.module.css";
import { FaCheck, FaTimes } from "react-icons/fa";
import React from "react";
function CustomInput(props) {
	const ref = React.createRef(null);

	//   	const handleMouseOut = (currentRef) => {
	//     if (document.activeElement === currentRef) {
	//       console.log("Yesss");
	//     }
	//   };
	const { label, name, solution, ...rest } = props;
	return (
		<div className="form-control">
			<label htmlFor={name} className={style.inputLabel}>
				{label}
			</label>
			<Field name={name}>
				{({
					field, // { name, value, onChange, onBlur }
					form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
					meta,
				}) => {
					const fillAnswer = solution?.trim().replace(".", "").toLowerCase();
					let isCorrect = null;
					// console.log(rest);
					if (fillAnswer) {
						if (field?.value?.trim()?.toLowerCase() === fillAnswer) {
							isCorrect = true;
						} else {
							isCorrect = false;
						}
					}
					const show = meta.touched && isCorrect !== null;
					return (
						<div className={style.inputBox}>
							<input
								type="text"
								{...field}
								{...rest}
								id={name}
								className={style.input}
								style={{
									border: !isCorrect
										? show && "2px solid var(--danger)"
										: show && "2px solid var(--success)",
								}}
							/>

							{!isCorrect
								? show && (
										<FaTimes
											style={{
												marginLeft: "auto",
												color: "var(--danger)",
												position: "absolute",
												right: "4rem",
											}}
										/>
								  )
								: show && (
										<FaCheck
											style={{
												marginLeft: "auto",
												color: "var(--success)",
												position: "absolute",
												right: "4rem",
											}}
										/>
								  )}
						</div>
					);
				}}
			</Field>
			{/* <ErrorMessage component={TextError} name={name} /> */}
		</div>
	);
}

export default CustomInput;
