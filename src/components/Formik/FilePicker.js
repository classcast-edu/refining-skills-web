import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
const FilePicker = (props) => {
	const { label, name, setFieldValue, ...rest } = props;
	return (
		<>
			<label htmlFor={name}>{label}</label>
			<div className="custom-file">
				<input
					className="custom-file-input"
					{...rest}
					onChange={(event) => {
						setFieldValue(name, event.currentTarget.files[0]);
					}}
				/>
				<label className="custom-file-label">{label}</label>
			</div>
		</>
	);
};

export default FilePicker;
