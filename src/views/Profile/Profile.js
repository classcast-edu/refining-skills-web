// import { ReactComponent as Group16681 } from "../../assets/profile/Group 1668-1.svg";
// import { ReactComponent as Group16682 } from "../../assets/profile/Group 1668-2.svg";
// import { ReactComponent as Group16683 } from "../../assets/profile/Group 1668-3.svg";
// import { ReactComponent as Group16684 } from "../../assets/profile/Group 1668-4.svg";
// import { ReactComponent as Group16685 } from "../../assets/profile/Group 1668-5.svg";
// import { ReactComponent as Group1668 } from "../../assets/profile/Group 1668.svg";
// import { ReactComponent as Group1674 } from "../../assets/profile/Group 1674.svg";
import { ReactComponent as Group1637 } from "../../assets/profile/Group 1637.svg";
// import { ReactComponent as EditSquare } from "../../assets/profile/EditSquare.svg";
import { ReactComponent as DPIcon } from "../../assets/sidenav/dp.svg";

import style from "./profile.module.css";
import ProgressBar from "components/ProgressBar/ProgressBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeInstitute } from "store/actions/instituteActions";

const UserProfile = () => {
	const [points, setPoints] = useState(0);
	const instituteId = useSelector((state) => state.instituteId);
	const displayName = useSelector((state) => state.firebase.auth.displayName);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(`/content/get_points/${instituteId}/`);
			setPoints(response.data.points);
		};
		fetchData();
	}, [instituteId]);

	const dispatch = useDispatch();

	return (
		<>
			{/* <button className={style.editSquare}>
				<EditSquare />
			</button> */}
			<DPIcon className={style.dp} />
			<h2 className={`info text-align-center ${style.name}`}>Hi, Student</h2>
			{/* <h2 className={`info text-align-center ${style.class}`}>Class 10</h2> */}
			<div className={style.pointsScoredContainer}>
				<Group1637 />
				<div>
					<div className={style.points}>{points}</div>
					<h2 className={style.pointsScored}>Points Scored</h2>
				</div>
			</div>

			<div className={style.actions}>
				<button
					className={28 === instituteId && style.btnActive}
					onClick={() => dispatch(changeInstitute(28))}
				>
					CBSE
				</button>
				<button
					className={30 === instituteId && style.btnActive}
					onClick={() => dispatch(changeInstitute(30))}
				>
					IGSCE
				</button>
				<button
					className={31 === instituteId && style.btnActive}
					onClick={() => dispatch(changeInstitute(31))}
				>
					ICSE
				</button>
			</div>
		</>
	);
};

const ProgressCard = () => {
	return (
		<div className={style.progressCardContainer}>
			<div className={style.header}>
				<h2>Learning Track Completion</h2>
				<div>50%</div>
			</div>
			<div className={style.lessons}>
				<span>22 lessons</span>
				<span>44 lessons</span>
			</div>
			<ProgressBar progress={"50%"} />
		</div>
	);
};

const Profile = () => {
	const listSubjects = (block, text) => {
		return (
			<div className={style.subjectBlock}>
				{block}
				<div>{text}</div>
			</div>
		);
	};

	return (
		<div className={style.profileContainer}>
			<h1 className="secondary text-align-center">Profile</h1>
			<UserProfile />
			{/* <div className={style.subjectsContainer}>
				{listSubjects(<Group16685 />, "All")}
				{listSubjects(<Group1668 />, "Maths")}
				{listSubjects(<Group1674 />, "Science")}
				{listSubjects(<Group16681 />, "English")}
				{listSubjects(<Group16684 />, "Social Sciences")}
				{listSubjects(<Group16682 />, "Kannada")}
				{listSubjects(<Group16683 />, "Hindi")}
			</div>
			<div className={style.progressContainer}>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
					<ProgressCard />
				))}
			</div> */}
		</div>
	);
};

export default Profile;
