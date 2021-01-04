// import React from "react";
// import { Field, ErrorMessage } from "formik";
// import TextError from "./TextError";
// import { FormGroup, Row, Col, Button } from "reactstrap";
// import style from "./checkBoxButton.module.css";
// import { useDispatch } from "react-redux";
// import { deletePlan } from "../../../../store/actions/planActions";
// function CheckboxGroup(props) {
// 	const { label, name, options, editPlan, ...rest } = props;
// 	const dispatch = useDispatch();

// 	return (
// 		<FormGroup>
// 			<label className={`d-block`}>{label}</label>
// 			<Field name={name}>
// 				{({ field }) => {
// 					return options.map((option) => {
// 						return (
// 							<React.Fragment key={option.id}>
// 								<input
// 									type="checkbox"
// 									id={option.name}
// 									{...field}
// 									{...rest}
// 									className={style.checkbox}
// 									value={option.id}
// 									checked={field.value.includes(option.id.toString())}
// 								/>
// 								<label
// 									htmlFor={option.name}
// 									className={`m-1 btn btn-secondary w-100 ${style.label}`}
// 								>
// 									<Row className="align-items-center">
// 										<Col xs={8} className="text-left">
// 											<div className="text-uppercase">{option.name}</div>
// 											<div> Validity: {option.validity_days} Days</div>
// 										</Col>
// 										<Col className="d-flex justify-content-end">
// 											<Button
// 												color="info"
// 												size="sm"
// 												onClick={() => editPlan(option)}
// 											>
// 												Edit
// 											</Button>
// 											<Button
// 												color="danger"
// 												size="sm"
// 												onClick={() => dispatch(deletePlan({ id: option.id }))}
// 											>
// 												Delete
// 											</Button>
// 										</Col>
// 										<div className="w-100" />
// 										<Col xs={8} className="text-left">
// 											<span>{option.description}</span>
// 										</Col>
// 										<Col className="d-flex justify-content-end">
// 											<div className="display-3 ">₹ {option.price}</div>
// 										</Col>
// 									</Row>
// 								</label>
// 							</React.Fragment>
// 						);
// 					});
// 				}}
// 			</Field>
// 			<ErrorMessage component={TextError} name={name} />
// 		</FormGroup>
// 	);
// }
// export default CheckboxGroup;
