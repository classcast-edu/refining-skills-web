import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import style from "./practiceBySubject.module.css";
import { fetchSubjects } from "store/actions/practiceBySubjectActions";
import CustomSpinner from "components/CustomSpinner";
import { ReactComponent as ArrowRightCircleIcon } from "../../../assets/subjects/ArrowRightCircle.svg";

const PerSubjectPractice = () => {
	const { id } = useParams();
	const instituteId = useSelector((state) => state.instituteId);
	const subjects = useSelector((state) => state.subjects);
	const [data, setData] = useState([]);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	const history = useHistory();
	useEffect(() => {
		if (_.isEmpty(subjects)) {
			dispatch(fetchSubjects());
		}
	}, []);
	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			const res = await axios(`/content/practice_context/${instituteId}/`);
			setData(
				_.filter(res.data.data, (item) => item.subjects.includes(Number(id)))
			);
			setLoading(false);
		};
		fetchData();
	}, []);
	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<>
			<button
				style={{
					transform: "rotate(180deg)",
					position: "absolute",
					marginTop: "-2rem",
				}}
				onClick={() => history.push("/admin/practice")}
			>
				<ArrowRightCircleIcon />
			</button>
			<h1 className="text-align-center secondary">
				{subjects[id] && subjects[id].name}
			</h1>
			{loading ? (
				<CustomSpinner />
			) : (
				<>
					<div className={style.perSubjectPractice}>
						{data.map((item) => {
							return (
								<div
									className={style.subBlock}
									key={item.id}
									onClick={() =>
										history.push(`${location.pathname}/${item.id}`)
									}
								>
									<img src={item.dp} className={style.subSubjects} />
									<div className={style.title}>
										{item.display_name}
										<div className={style.subTitle}>
											Modules: {item.study_material.length}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</>
			)}
		</>
	);
};

export default PerSubjectPractice;
