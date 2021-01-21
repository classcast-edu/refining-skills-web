import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import style from "./customRadio.module.css";
import { FaTimes } from "react-icons/fa";

const RenderHTML = (props) => (
	<span dangerouslySetInnerHTML={{ __html: props.HTML }}></span>
);
function RadioButtons(props) {
	const { label, name, options } = props;

	const string = "AABCD";
	return (
		<>
			<label className={`d-block`}>{label}</label>
			<div className={style.container}>
				<Field name={name}>
					{({ field, ...rest }) => {
						// console.log(rest.form.errors);
						return options.map((option, index) => {
							index = Number(index) + 1;
							const error = rest.form.errors.option == index;
							return (
								<React.Fragment key={index}>
									<input
										type="radio"
										id={field.name + index}
										{...field}
										{...rest}
										// onChange={(e) =>
										// 	form.setFieldValue(name, parseInt(e.target.value))
										// }
										className={style.radio}
										value={index}
										checked={field.value == index}
									/>
									<label
										htmlFor={field.name + index}
										className={`${style.label}`}
										style={{
											boxShadow: error && "0px 0px 0px 2px var(--danger)",
											color: error && "var(--danger)",
										}}
									>
										<p
											className={style.optionIndex}
											style={{
												color: error && "var(--danger)",
												border: error && "2px solid var(--danger)",
											}}
										>
											{string[index]}
										</p>
										<RenderHTML HTML={option} />
										{error && <FaTimes style={{ marginLeft: "auto" }} />}
										{/* {option.display_name || option.name} */}
									</label>
								</React.Fragment>
							);
						});
					}}
				</Field>
			</div>
			{/* <ErrorMessage component={TextError} name={name} /> */}
		</>
	);
}

export default RadioButtons;
