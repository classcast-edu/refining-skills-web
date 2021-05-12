import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import style from "./customInput.module.css";
import { FaCheck, FaTimes } from "react-icons/fa";

function CustomInput(props) {
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
						if (field?.value?.trim().toLowerCase() === fillAnswer) {
							isCorrect = true;
						} else {
							isCorrect = false;
						}
					}
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
										? meta.touched &&
										  isCorrect !== null &&
										  "2px solid var(--danger)"
										: meta.touched &&
										  isCorrect !== null &&
										  "2px solid var(--success)",
								}}
							/>

							{!isCorrect
								? meta.touched &&
								  isCorrect !== null && (
										<FaTimes
											style={{
												marginLeft: "auto",
												color: "var(--danger)",
												position: "absolute",
												right: "4rem",
											}}
										/>
								  )
								: meta.touched &&
								  isCorrect !== null && (
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
