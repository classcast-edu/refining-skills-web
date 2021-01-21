import React from "react";
import { css } from "@emotion/core";
import SquareLoader from "react-spinners/SquareLoader";

const CustomSpinner = ({ size, margin, color, className }) => {
	const override = css`
		display: block;
		margin: 10px;
		border-color: red;
	`;

	return (
		<div className={className}>
			<SquareLoader
				css={override}
				size={size || 50}
				margin={margin || 10}
				color={color || "var(--info)"}
				loading={true}
			/>
		</div>
	);
};

export default CustomSpinner;
