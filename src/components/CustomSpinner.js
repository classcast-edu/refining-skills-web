import React from "react";
import { css } from "@emotion/core";
import SquareLoader from "react-spinners/GridLoader";

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
			<SquareLoader
				// css={override}
				size={size || 50}
				margin={margin || 10}
				color={color || "var(--secondary)"}
				loading={true}
			/>
		</div>
	);
};

export default CustomSpinner;
