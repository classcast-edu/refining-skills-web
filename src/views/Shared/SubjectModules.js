import React, { useEffect, useRef, useState } from "react";
import {
	useHistory,
	useLocation,
	useParams,
	useRouteMatch,
} from "react-router-dom";
import CustomSpinner from "components/CustomSpinner";
import axios from "axios";
import Collapsible from "react-collapsible";
import { FaClipboardList, FaPlay } from "react-icons/fa";
import style from "./practiceBySubject.module.css";
import { ReactComponent as ArrowRightCircleIcon } from "../../assets/subjects/ArrowRightCircle.svg";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import getColorById from "components/helpers/getColorById";
import Lottie from "react-lottie";
import * as animationData from "assets/lottie/progress.json";
import "./collapse.css";

import useQuery from "components/hooks/useQuery";

const CollapseContent = (props) => {
	const { data } = props;
	const history = useHistory();

	const match = useRouteMatch();
	return (
		<ul key={props.key}>
			{data &&
				data.map(
					(
						{ datafields: { display_name, url, block_type, chapter_id } },
						index
					) => {
						return (
							<>
								<li
									onClick={() => {
										history.push(`${match.url}/${url}`);
									}}
									key={chapter_id}
								>
									{parseInt(block_type) === 4 ? (
										<FaClipboardList />
									) : (
										<FaPlay />
									)}
									{display_name}
								</li>
							</>
						);
					}
				)}
		</ul>
	);
};
const SubjectModules = () => {
	const { courseId, id } = useParams();
	const history = useHistory();
	const query = useQuery();
	const match = useRouteMatch();
	const [loading, setLoading] = useState(false);
	const [blocks, setBlocks] = useState([]);
	const [progress, setProgress] = useState(0);
	const defaultOptions = {
		loop: false,
		autoPlay: true,
		animationData: animationData.default,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				const res = await axios(`/content/course_details/${courseId}/`);
				const res2 = await axios(`/content/course_completion/${courseId}/`);
				setBlocks(res.data.data);

				const totalBlocks = res.data.data.study.reduce(
					(acc, obj) => acc + obj.datafields.data.length,
					0
				);
				setProgress(((res2.data.blocks / totalBlocks) * 100).toFixed(2));
				setLoading(false);
			} catch (error) {
				// console.log(error.message);
				setLoading(false);
			}
		};
		fetchData();
	}, [courseId]);

	const [open, setOpen] = useState({});

	useEffect(() => {
		if (query.get("redirect")) {
			// console.log("hello");
			setOpen(JSON.parse(window.localStorage.getItem("subjectModules")));
			history.replace(`${match.url}`);
		}
	}, [query]);

	const renderBlocks = () => {
		return (
			Array.isArray(blocks.study) &&
			blocks.study.map((block, i) => {
				const {
					datafields: { chapter_name, data, index },
				} = block;
				return (
					<div key={index}>
						<Collapsible
							trigger={
								<div key={index} className="cursor-pointer">{`Module ${
									i + 1
								} —  
								 ${chapter_name}
								`}</div>
							}
							key={index}
							open={open && open[i]}
							onOpening={() => {
								window.localStorage.setItem(
									"subjectModules",
									JSON.stringify(open)
								);
								setOpen((prevState) => ({ ...prevState, [i]: true }));
							}}
							onClosing={() => {
								window.localStorage.setItem(
									"subjectModules",
									JSON.stringify(open)
								);
								setOpen((prevState) => ({ ...prevState, [i]: false }));
							}}
						>
							<CollapseContent data={data} key={index} />
						</Collapsible>
					</div>
				);
			})
		);
	};
	return loading ? (
		<CustomSpinner />
	) : (
		<>
			<button
				style={{
					transform: "rotate(180deg)",
					position: "absolute",
					marginTop: "-2rem",
				}}
				onClick={() =>
					history.push(`${id ? `/admin/practice/${id}` : "/admin/test"}`)
				}
			>
				<ArrowRightCircleIcon />
			</button>
			<h2
				className="secondary text-align-center"
				style={{ color: getColorById(id) }}
			>
				{blocks.display_name}
			</h2>
			<div
				className={style.progressOfStudent}
				style={{ boxShadow: `0 0 10px ${getColorById(id)}` }}
			>
				<h2 className={"black"}>
					<b>Course Progress</b>
					<div className={style.progressText}>
						You have completed the {progress}% of course
					</div>
				</h2>
				<CircularProgressbarWithChildren
					value={progress}
					maxValue={100}
					className={style.progressCircleBar}
					styles={{
						path: {
							stroke: getColorById(id).toString(),
						},
					}}
				>
					<Lottie options={defaultOptions} />
				</CircularProgressbarWithChildren>
			</div>

			<div className={style.SubjectModules}>{renderBlocks()}</div>
		</>
	);
};

export default SubjectModules;
