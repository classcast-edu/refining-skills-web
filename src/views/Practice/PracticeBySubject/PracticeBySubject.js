//subjects
import { ReactComponent as EnglishIcon } from "../../../assets/subjects/EnglishIcon.svg";
import { ReactComponent as HindiIcon } from "../../../assets/subjects/Hindi.svg";
import { ReactComponent as KannadaIcon } from "../../../assets/subjects/Kannada.svg";
import { ReactComponent as MathIcon } from "../../../assets/subjects/MathIcon.svg";
import { ReactComponent as ScienceIcon } from "../../../assets/subjects/ScienceIcon.svg";
import { ReactComponent as SocialSciencesIcon } from "../../../assets/subjects/SocialSciences.svg";

import { ReactComponent as ArrowRightCircleIcon } from "../../../assets/subjects/ArrowRightCircle.svg";
import { ReactComponent as ComputerApplicationsIcon } from "../../../assets/subjects/ComputerApplications.svg";
import style from "./practiceBySubject.module.css";

// import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { fetchSubjects } from "store/actions/practiceBySubjectActions";
import CustomSpinner from "components/CustomSpinner";
// import getColorById from "components/helpers/getColorById";
const PracticeBySubject = (props) => {
	const subjects = useSelector((state) => Object.values(state.subjects));
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchSubjects());
	}, []);

	const getIconById = (id) => {
		switch (id) {
			case 22:
				return <MathIcon />;
			case 23:
			case 24:
			case 25:
			case 26:
				return <ScienceIcon />;
			case 33:
			case 42:
				return <HindiIcon />;
			case 20:
			case 35:
			case 48:
			case 46:
			case 47:
				return <SocialSciencesIcon />;
			case 36:
			case 37:
			case 38:
			case 41:
			case 43:
			case 45:
				return <EnglishIcon />;
			case 34:
				return <KannadaIcon />;
			case 44:
				return <ComputerApplicationsIcon />;
			default:
				// console.log(id);
				return <KannadaIcon />;
		}
	};
	// const getIconById = (id) => {
	// 	switch (id) {
	// 		case 22:
	// 			return <MathIcon />;
	// 		case 25:
	// 			return <ScienceIcon />;
	// 		case 33:
	// 			return <HindiIcon />;
	// 		case 35:
	// 			return <SocialSciencesIcon />;
	// 		case 36:
	// 		case 37:
	// 		case 38:
	// 			return <EnglishIcon />;
	// 		default:
	// 			console.log(id);
	// 			return <KannadaIcon />;
	// 	}
	// };

	const listBlock = () => {
		return (
			subjects &&
			subjects.map((subject) => {
				return (
					<Link
						className={style.subjectsBlock}
						key={subject.id}
						to={`${location.pathname}/${subject.id}`}
					>
						{getIconById(subject.id)}
						<span className={style.subjectName}>{subject.name}</span>
						<button className={style.subjectArrow}>
							<ArrowRightCircleIcon
								style={{ height: "4.5rem", width: "4.5rem" }}
							/>
						</button>
					</Link>
				);
			})
		);
	};

	return (
		<div className="w-100">
			<h2 className={`${style.h2} primary`}>Practice by Subject</h2>
			{subjects.length > 0 ? (
				<div className={style.subjects}> {listBlock()}</div>
			) : (
				<CustomSpinner height="100%" />
			)}
		</div>
	);
};

export default PracticeBySubject;
