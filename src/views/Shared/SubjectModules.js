import React, { useEffect, useState } from "react";
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
const CollapseContent = (props) => {
	const { data } = props;
	const history = useHistory();
	// const location = useLocation();

	const fetchTestMeta = async (url) => {
		console.log(url);
		const response = await axios.get(`/content/test_meta/${url}/`);
		console.log(response.data.data);
	};
	const match = useRouteMatch();
	// console.log(match, location);
	return (
		<ul key={props.key}>
			{data &&
				data.map(
					({ datafields: { display_name, url, block_type, chapter_id } }) => {
						return (
							<>
								<li
									onClick={() => {
										if (parseInt(block_type) === 4) fetchTestMeta(url);
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

	const [loading, setLoading] = useState(false);
	const [blocks, setBlocks] = useState([]);
	const [progress, setProgress] = useState(0);
	const defaultOptions = {
		loop: true,
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
	}, []);

	const renderBlocks = () => {
		return (
			blocks.study &&
			blocks.study.map((block, i) => {
				const {
					datafields: { chapter_name, data, index },
				} = block;
				return (
					<div key={index}>
						<Collapsible
							trigger={
								<div key={index}>{`Module ${i + 1} —  ${chapter_name}`}</div>
							}
							key={index}
						>
							<CollapseContent data={data} key={index} />
						</Collapsible>
					</div>
				);
			})
		);
	};
	return (
		<>
			<button
				style={{
					transform: "rotate(180deg)",
					position: "absolute",
					marginTop: "-2rem",
				}}
				onClick={() => history.push(`/admin/practice/${id}`)}
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

					{/* <img
						style={{ width: "40px", objectFit: "cover", margin: 0 }}
						src="https://i.imgur.com/b9NyUGm.png"
						alt="doge"
					/> */}
				</CircularProgressbarWithChildren>
			</div>

			<div className={style.SubjectModules}>
				{loading ? <CustomSpinner height="50vh" /> : <>{renderBlocks()}</>}
			</div>
		</>
	);
};

export default SubjectModules;
