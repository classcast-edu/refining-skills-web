import React from "react";

const Collapse = ({ isOpen }) => {
	return (
		<details>
			<summary>This is what you want to show before expanding</summary>
			<p>This is where you put the details that are shown once expanded</p>
		</details>
	);
};

export default Collapse;
