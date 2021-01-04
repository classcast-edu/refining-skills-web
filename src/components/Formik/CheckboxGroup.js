import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import style from "./checkBoxButton.module.css";

function CheckboxGroup(props) {
	const { label, name, options, ...rest } = props;
	return (
		<>
			<label className={`d-block`}>{label}</label>
			<Field name={name}>
				{({ field }) => {
					return options.map((option) => {
						return (
							<React.Fragment key={option.id}>
								<input
									type="checkbox"
									id={option.name}
									{...field}
									{...rest}
									className={style.checkbox}
									value={option.id}
									checked={field.value.includes(option.id.toString())}
								/>
								<label htmlFor={option.name} className={`${style.label}`}>
									{option.name}
								</label>
							</React.Fragment>
						);
					});
				}}
			</Field>
			<ErrorMessage component={TextError} name={name} />
		</>
	);
}
export default CheckboxGroup;

// import React from "react";
// import { Field, ErrorMessage } from "formik";
// import TextError from "./TextError";
// import { FormGroup } from "reactstrap";

// function CheckboxGroup(props) {
// 	const { label, name, options, ...rest } = props;
// 	// console.log(options);
// 	return (
// 		<FormGroup>
// 			<label className={`d-block`}>{label}</label>
// 			<div className="d-flex flex-wrap">
// 				<Field name={name}>
// 					{({ field }) => {
// 						return options.map((option) => {
// 							return (
// 								<React.Fragment key={option.id}>
// 									<input
// 										type="checkbox"
// 										id={field.name + option.id}
// 										{...field}
// 										{...rest}
// 										value={option.id}
// 										checked={field.value === option.id}
// 									/>
// 									<label htmlFor={field.name + option.id}>
// 										{option.display_name || option.name}
// 									</label>
// 								</React.Fragment>
// 							);
// 						});
// 					}}
// 				</Field>
// 			</div>
// 			<ErrorMessage component={TextError} name={name} />
// 		</FormGroup>
// 	);
// }

// export default CheckboxGroup;
