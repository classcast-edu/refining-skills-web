import axios from "axios";
import Collapse from "components/Collapse";
import { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as MindMapsIcon } from "../../assets/read/Group 1631.svg";
import { ReactComponent as RevisionNotesIcon } from "../../assets/read/Group 1632.svg";
import { ReactComponent as PastYearIcon } from "../../assets/read/Group 1633.svg";
import { ReactComponent as FormulasIcon } from "../../assets/read/Group 1634.svg";
import { ReactComponent as NcertBooksIcon } from "../../assets/read/Group 1650.svg";

import { ReactComponent as ArrowRightCircleIcon } from "../../assets/subjects/ArrowRightCircle.svg";
import style from "./read.module.css";
import { useIsMount } from "components/hooks/useIsMount";
import { fetchReadables } from "store/actions/readActions";
import { useHistory } from "react-router-dom";

const Read = () => {
	const history = useHistory();
	const isMount = useIsMount();
	const dispatch = useDispatch();
	const { loading, error, data, types } = useSelector(
		(state) => state.readables
	);

	useEffect(() => {
		if (!isMount) {
			dispatch(fetchReadables());
		}
	}, []);

	// useEffect(() => {
	// 	Object.values(types).map(({ name }) =>
	// 		console.log(
	// 			_.filter(data, (item) => item.parent.includes(name)),
	// 			name
	// 		)
	// 	);
	// }, [data]);

	const getIconByName = (name) => {
		switch (name) {
			case "Mind Maps":
				return <MindMapsIcon />;
			case "Past Year":
				return <PastYearIcon />;
			case "Revision Notes":
				return <RevisionNotesIcon />;
			case "Textbooks":
				return <NcertBooksIcon />;
			case "Formulas":
				return <FormulasIcon />;
			default:
				break;
		}
	};

	const listBlock = () => {
		return Object.values(types).map(({ name }) => (
			<div className={style.readBlock} key={name}>
				{getIconByName(name)}
				<button
					className={style.readArrow}
					onClick={() => history.push(`/admin/read/${name}`)}
				>
					<ArrowRightCircleIcon style={{ height: "7.3rem", width: "7.3rem" }} />
				</button>
			</div>
		));
	};
	return (
		<>
			<h1 className="secondary text-align-center">Read</h1>
			<div className={style.read}>{listBlock()}</div>
		</>
	);
};

export default Read;
