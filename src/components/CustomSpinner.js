import React from "react";
import { css } from "@emotion/core";
import SquareLoader from "react-spinners/GridLoader";
import Lottie from "react-lottie";
import * as animationData from "assets/lottie/spinner2.json";

const CustomSpinner = ({
	size,
	margin,
	color,
	className,
	height = "80vh",
	marginTop,
}) => {
	// const override = css`
	// 	display: block;
	// 	margin: 10px;
	// 	border-color: red;
	// `;

	const defaultOptions = {
		loop: true,
		autoPlay: true,
		animationData: animationData.default,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return (
		<div
			className={className}
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height,
			}}
		>
			<Lottie options={defaultOptions} height={"200"} width={"200"} />
			{/* <SquareLoader
				// 		// css={override}
				size={size || 50}
				margin={margin || 10}
				color={color || "var(--secondary)"}
				loading={true}
			/> */}
		</div>
	);
};

export default CustomSpinner;
