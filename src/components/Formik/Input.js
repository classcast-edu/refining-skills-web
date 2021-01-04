import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import style from "./formik.module.css";
function Input(props) {
	const { label, name, ...rest } = props;
	return (
		<div className="form-control">
			<label htmlFor={name}>{label}</label>
			<Field id={name} name={name} {...rest} className={style.input} />
			<ErrorMessage component={TextError} name={name} />
		</div>
	);
}

export default Input;
