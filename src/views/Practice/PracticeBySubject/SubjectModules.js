import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CustomSpinner from "components/CustomSpinner";
import axios from "axios";
import Collapsible from "react-collapsible";
import { FaClipboardList, FaPlay } from "react-icons/fa";
import style from "./practiceBySubject.module.css";
import { ReactComponent as ArrowRightCircleIcon } from "../../../assets/subjects/ArrowRightCircle.svg";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const CollapseContent = (props) => {
	const { data } = props;
	const history = useHistory();
	const fetchTestMeta = async (url) => {
		console.log(url);
		const response = await axios.get(`/content/test_meta/${url}/`);
		console.log(response.data.data);
	};
	return (
		<ul>
			{data &&
				data.map(
					({ datafields: { display_name, url, block_type, chapter_id } }) => {
						return (
							<>
								<li
									onClick={() => {
										if (parseInt(block_type) === 4) fetchTestMeta(url);
										history.push(`/admin/test/${url}`);
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
	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				const res = await axios(`/content/course_details/${courseId}/`);
				const res2 = await axios(`/content/subject_completion/24/3/`);
				setBlocks(res.data.data);
				console.log(res2.data.data);
				setLoading(false);
			} catch (error) {
				console.log(error.message);
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
					<Collapsible
						trigger={`Module ${i + 1} —  ${chapter_name}`}
						key={index}
					>
						<CollapseContent data={data} />
					</Collapsible>
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
			<h2 className="secondary text-align-center">{blocks.display_name}</h2>
			<div className={style.progressOfStudent}>
				<h2 className={"black"}>
					<b>Course Progress</b>
					<div className={style.progressText}>
						You have completed the 2.44% of course{" "}
					</div>
				</h2>
				<CircularProgressbarWithChildren
					value={66}
					className={style.progressCircleBar}
					styles={{
						path: {
							stroke: "#ff8058",
						},
					}}
				>
					<img
						style={{ width: "40px", objectFit: "cover", margin: 0 }}
						src="https://i.imgur.com/b9NyUGm.png"
						alt="doge"
					/>
				</CircularProgressbarWithChildren>
			</div>

			<div className={style.SubjectModules}>
				{loading ? <CustomSpinner /> : <>{renderBlocks()}</>}
			</div>
		</>
	);
};

export default SubjectModules;
