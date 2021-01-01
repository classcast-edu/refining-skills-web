import { ReactComponent as MindMapsIcon } from "../../assets/read/Group 1631.svg";
import { ReactComponent as RevisionNotesIcon } from "../../assets/read/Group 1632.svg";
import { ReactComponent as PastYearIcon } from "../../assets/read/Group 1633.svg";
import { ReactComponent as FormulasIcon } from "../../assets/read/Group 1634.svg";
import { ReactComponent as NcertBooksIcon } from "../../assets/read/Group 1650.svg";

import { ReactComponent as ArrowRightCircleIcon } from "../../assets/subjects/ArrowRightCircle.svg";

import style from "./read.module.css";

const Read = () => {
	const listBlock = (block) => {
		return (
			<div className={style.readBlock}>
				{block}
				<button className={style.readArrow}>
					<ArrowRightCircleIcon style={{ height: "7.3rem", width: "7.3rem" }} />
				</button>
			</div>
		);
	};
	return (
		<>
			<h1 className="secondary text-align-center">Read</h1>
			<div className={style.read}>
				{listBlock(<MindMapsIcon />)}
				{listBlock(<RevisionNotesIcon />)}
				{listBlock(<PastYearIcon />)}
				{listBlock(<NcertBooksIcon />)}
				{listBlock(<FormulasIcon />)}
			</div>
		</>
	);
};

export default Read;
