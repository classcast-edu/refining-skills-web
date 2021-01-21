import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import style from "./radioButton.module.css";

function RadioButtons(props) {
	const { label, name, options, ...rest } = props;

	return (
		<>
			<label className={`d-block`}>{label}</label>
			<div className={style.container}>
				<Field name={name}>
					{({ field, form }) => {
						return options.map((option) => {
							return (
								<React.Fragment key={option.id}>
									<input
										type="radio"
										id={field.name + option.id}
										{...field}
										{...rest}
										className={style.radio}
										value={option.id}
										checked={
											field.name + field.value === field.name + option.id
										}
									/>
									<label
										htmlFor={field.name + option.id}
										className={`${style.label}`}
									>
										{option.display_name || option.name}
									</label>
								</React.Fragment>
							);
						});
					}}
				</Field>
			</div>
			<ErrorMessage component={TextError} name={name} />
		</>
	);
}

export default RadioButtons;
