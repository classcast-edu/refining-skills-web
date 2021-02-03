//subjects
import { ReactComponent as EnglishIcon } from "../../../assets/subjects/EnglishIcon.svg";
import { ReactComponent as HindiIcon } from "../../../assets/subjects/Hindi.svg";
import { ReactComponent as KannadaIcon } from "../../../assets/subjects/Kannada.svg";
import { ReactComponent as MathIcon } from "../../../assets/subjects/MathIcon.svg";
import { ReactComponent as ScienceIcon } from "../../../assets/subjects/ScienceIcon.svg";
import { ReactComponent as SocialSciencesIcon } from "../../../assets/subjects/SocialSciences.svg";

import { ReactComponent as ArrowRightCircleIcon } from "../../../assets/subjects/ArrowRightCircle.svg";
import style from "./practiceBySubject.module.css";

// import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
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
			case 25:
				return <ScienceIcon />;
			case 33:
				return <HindiIcon />;
			case 35:
				return <SocialSciencesIcon />;
			case 36:
			case 37:
			case 38:
				return <EnglishIcon />;
			default:
				return <KannadaIcon />;
		}
	};

	const listBlock = () => {
		return (
			subjects &&
			subjects.map((subject) => {
				return (
					<div className={style.subjectsBlock} key={subject.id}>
						{getIconById(subject.id)}
						<button
							className={style.subjectArrow}
							onClick={() => history.push(`${location.pathname}/${subject.id}`)}
						>
							<ArrowRightCircleIcon
								style={{ height: "4.5rem", width: "4.5rem" }}
							/>
						</button>
					</div>
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
