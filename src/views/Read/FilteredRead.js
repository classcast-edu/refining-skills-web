// import { useIsMount } from "components/hooks/useIsMount";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory, useParams } from "react-router-dom";
// import { fetchSubjects } from "store/actions/practiceBySubjectActions";
// import { fetchReadables } from "store/actions/readActions";
// // import colors from "nice-color-palettes/200";
// import styles from "./read.module.css";
// import { ReactComponent as ArrowRightCircleIcon } from "../../assets/subjects/ArrowRightCircle.svg";
// import CustomSpinner from "components/CustomSpinner";

// const FilteredRead = () => {
// 	const { id } = useParams();
// 	const [readablesList, setReadablesList] = useState([]);

// 	const isMount = useIsMount();
// 	const dispatch = useDispatch();
// 	const history = useHistory();
// 	const [search, setSearch] = useState(
// 		window.localStorage.getItem("readablesSearch") || ""
// 	);
// 	useEffect(() => {
// 		window.localStorage.setItem("readablesSearch", search);
// 	}, [search]);

// 	const subjects = useSelector((state) => Object.values(state.subjects));

// 	const { loading, error, types, data } = useSelector(
// 		(state) => state.readables
// 	);
// 	const books = Object.values(data);

// 	const listReadables = () => {
// 		return (
// 			readablesList &&
// 			readablesList.map((readable) => {
// 				return (
// 					readable.display_name && (
// 						<div
// 							key={readable.id}
// 							className={styles.filteredReadable}
// 							style={{
// 								backgroundColor:
// 									colors[Math.floor(Math.random() * colors.length)],
// 							}}
// 							onClick={() => history.push(`/admin/read/${id}/${readable.id}`)}
// 						>
// 							{readable.display_name}
// 						</div>
// 					)
// 				);
// 			})
// 		);
// 	};
// 	const resetReadables = () => {
// 		// console.log(books);
// 		setReadablesList(books.filter((item) => item.parent.includes(id)));
// 	};
// 	const filterReadables = (key, parameter) => {
// 		if (key === "display_name") {
// 			return setReadablesList(
// 				books
// 					.filter((item) => item.parent.includes(id))
// 					.filter((item) =>
// 						item.display_name.toLowerCase().includes(parameter.toLowerCase())
// 					)
// 			);
// 		}
// 		setReadablesList(
// 			books
// 				.filter((item) => item.parent.includes(id))
// 				.filter((item) => item[key].includes(parameter))
// 		);
// 		setSearch("");
// 	};

// 	const renderSubjects = () => {
// 		const colors = [
// 			"#ff8058",
// 			"#ffb038",
// 			"#49c0c1",
// 			"#ff78a3",
// 			// "#57628e",
// 			"#f36450",
// 			"#809900",
// 			"#E6B3B3",
// 			"#6680B3",
// 			"#66991A",
// 			"#FF99E6",
// 			"#49c0c1",
// 		];
// 		return subjects.map(({ name, id, bgcolor }, index) => (
// 			<button
// 				style={{ backgroundColor: colors[index] }}
// 				key={id}
// 				className={styles.filterBySubjectButton}
// 				onClick={() => {
// 					// filterReadables("subjects", id);
// 					window.localStorage.setItem("readablesSubject", id);
// 				}}
// 			>
// 				{name}
// 			</button>
// 		));
// 	};

// 	const searchBox = () => {
// 		return (
// 			<input
// 				type="search"
// 				className={styles.searchBox}
// 				placeholder="Search by readable name"
// 				value={search}
// 				onChange={(e) => {
// 					setSearch(e.target.value);
// 					// filterReadables("display_name", e.target.value);
// 				}}
// 			/>
// 		);
// 	};

// 	useEffect(() => {
// 		// resetReadables();
// 		dispatch(fetchSubjects());
// 		dispatch(fetchReadables());
// 		if (window.localStorage.getItem("readablesSearch")) {
// 			filterReadables(
// 				"display_name",
// 				window.localStorage.getItem("readablesSearch")
// 			);
// 		}

// 		if (window.localStorage.getItem("readablesSubject")) {
// 			console.log(window.localStorage.getItem("readablesSubject"));

// 			filterReadables(
// 				"subjects",
// 				window.localStorage.getItem("readablesSubject")
// 			);
// 		}
// 		return () => {
// 			// window.localStorage.setItem("readablesSearch", search);
// 			// setReadablesList([]);
// 		};
// 	}, []);

// 	useEffect(() => {
// 		resetReadables();
// 		// window.localStorage.removeItem("readablesSearch");
// 		// window.localStorage.removeItem("readablesSubject");
// 	}, [loading]);

// 	return loading ? (
// 		<CustomSpinner />
// 	) : (
// 		<>
// 			<button
// 				style={{
// 					transform: "rotate(180deg)",
// 					position: "absolute",
// 					marginTop: "-2.2rem",
// 				}}
// 				onClick={() => history.push(`/admin/read`)}
// 			>
// 				<ArrowRightCircleIcon />
// 			</button>
// 			<h1 className="secondary text-align-center">{id}</h1>
// 			<div className={styles.filterBySubjectContainer}>
// 				<h2 className="text-align-center primary">Filter by Subject</h2>
// 				{searchBox()}
// 				<button
// 					style={{ backgroundColor: colors[1] }}
// 					className={styles.filterBySubjectButton}
// 					onClick={resetReadables}
// 				>
// 					All subjects
// 				</button>
// 				{renderSubjects()}
// 			</div>

// 			<div className={styles.filteredReadablesContainer}>{listReadables()}</div>
// 		</>
// 	);
// };

// export default FilteredRead;
// const colors = [
// 	"#FF6633",
// 	"#FFB399",
// 	"#FF33FF",
// 	"#00B3E6",
// 	"#E6B333",
// 	"#3366E6",
// 	"#999966",

// 	"#B34D4D",
// 	"#80B300",
// 	"#809900",
// 	"#E6B3B3",
// 	"#6680B3",
// 	"#66991A",
// 	"#FF99E6",

// 	"#FF1A66",
// 	"#E6331A",

// 	"#66994D",
// 	"#B366CC",
// 	"#4D8000",
// 	"#B33300",
// 	"#CC80CC",
// 	"#66664D",
// 	"#991AFF",
// 	"#E666FF",
// 	"#4DB3FF",
// 	"#1AB399",
// 	"#E666B3",
// 	"#33991A",
// 	"#CC9999",
// 	"#B3B31A",

// 	"#4D8066",
// 	"#809980",

// 	"#999933",
// 	"#FF3380",
// 	"#CCCC00",

// 	"#4D80CC",
// 	"#9900B3",
// 	"#E64D66",
// 	"#4DB380",
// 	"#FF4D4D",

// 	"#6666FF",
// ];

import { useIsMount } from "components/hooks/useIsMount";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchSubjects } from "store/actions/practiceBySubjectActions";
import { fetchReadables } from "store/actions/readActions";
// import colors from "nice-color-palettes/200";
import styles from "./read.module.css";
import { ReactComponent as ArrowRightCircleIcon } from "../../assets/subjects/ArrowRightCircle.svg";
import CustomSpinner from "components/CustomSpinner";

const FilteredRead = () => {
	const { id } = useParams();
	const [readablesList, setReadablesList] = useState([]);

	const isMount = useIsMount();
	const dispatch = useDispatch();
	const history = useHistory();
	const [search, setSearch] = useState(
		window.localStorage.getItem("readablesSearch") || ""
	);
	// useEffect(() => {
	// 	window.localStorage.setItem("readablesSearch", search);
	// }, [search]);

	const subjects = useSelector((state) => Object.values(state.subjects));

	const { loading, error, types, data } = useSelector(
		(state) => state.readables
	);
	const books = Object.values(data);

	const listReadables = () => {
		return (
			readablesList &&
			readablesList.map((readable) => {
				return (
					readable.display_name && (
						<div
							key={readable.id}
							className={styles.filteredReadable}
							style={{
								backgroundColor:
									colors[Math.floor(Math.random() * colors.length)],
							}}
							onClick={() => history.push(`/admin/read/${id}/${readable.id}`)}
						>
							{readable.display_name}
						</div>
					)
				);
			})
		);
	};
	const resetReadables = () => {
		// console.log(books);
		setReadablesList(books.filter((item) => item.parent.includes(id)));
	};
	const filterReadables = (key, parameter) => {
		if (key === "display_name") {
			return setReadablesList(
				books
					.filter((item) => item.parent.includes(id))
					.filter((item) =>
						item.display_name.toLowerCase().includes(parameter.toLowerCase())
					)
			);
		}
		setReadablesList(
			books
				.filter((item) => item.parent.includes(id))
				.filter((item) => item[key].includes(parameter))
		);
		setSearch("");
	};

	const renderSubjects = () => {
		const colors = [
			"#ff8058",
			"#ffb038",
			"#49c0c1",
			"#ff78a3",
			// "#57628e",
			"#f36450",
			"#809900",
			"#E6B3B3",
			"#6680B3",
			"#66991A",
			"#FF99E6",
			"#49c0c1",
		];
		return subjects.map(({ name, id, bgcolor }, index) => (
			<button
				style={{ backgroundColor: colors[index] }}
				key={id}
				className={styles.filterBySubjectButton}
				onClick={() => {
					filterReadables("subjects", id);
					window.localStorage.setItem("readablesSubject", id);
				}}
			>
				{name}
			</button>
		));
	};

	const searchBox = () => {
		return (
			<input
				type="search"
				className={styles.searchBox}
				placeholder="Search by readable name"
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
					filterReadables("display_name", e.target.value);
				}}
			/>
		);
	};

	useEffect(() => {
		// resetReadables();
		dispatch(fetchSubjects());
		dispatch(fetchReadables());
		// if (window.localStorage.getItem("readablesSearch")) {
		// 	filterReadables(
		// 		"display_name",
		// 		window.localStorage.getItem("readablesSearch")
		// 	);
		// }

		// if (window.localStorage.getItem("readablesSubject")) {
		// 	// console.log(window.localStorage.getItem("readablesSubject"));

		// 	filterReadables(
		// 		"subjects",
		// 		window.localStorage.getItem("readablesSubject")
		// 	);
		// }

		return () => {
			// window.localStorage.setItem("readablesSearch", search);
			// setReadablesList([]);
		};
	}, []);

	useEffect(() => {
		resetReadables();
		// window.localStorage.removeItem("readablesSearch");
		// window.localStorage.removeItem("readablesSubject");
	}, [loading]);

	return loading ? (
		<CustomSpinner />
	) : (
		<>
			<button
				style={{
					transform: "rotate(180deg)",
					position: "absolute",
					marginTop: "-2.2rem",
				}}
				onClick={() => history.push(`/admin/read`)}
			>
				<ArrowRightCircleIcon />
			</button>
			<h1 className="secondary text-align-center">{id}</h1>
			<div className={styles.filterBySubjectContainer}>
				<h2 className="text-align-center primary">Filter by Subject</h2>
				{searchBox()}
				<button
					style={{ backgroundColor: colors[1] }}
					className={styles.filterBySubjectButton}
					onClick={resetReadables}
				>
					All subjects
				</button>
				{renderSubjects()}
			</div>

			<div className={styles.filteredReadablesContainer}>{listReadables()}</div>
		</>
	);
};

export default FilteredRead;
const colors = [
	"#FF6633",
	"#FFB399",
	"#FF33FF",
	"#00B3E6",
	"#E6B333",
	"#3366E6",
	"#999966",

	"#B34D4D",
	"#80B300",
	"#809900",
	"#E6B3B3",
	"#6680B3",
	"#66991A",
	"#FF99E6",

	"#FF1A66",
	"#E6331A",

	"#66994D",
	"#B366CC",
	"#4D8000",
	"#B33300",
	"#CC80CC",
	"#66664D",
	"#991AFF",
	"#E666FF",
	"#4DB3FF",
	"#1AB399",
	"#E666B3",
	"#33991A",
	"#CC9999",
	"#B3B31A",

	"#4D8066",
	"#809980",

	"#999933",
	"#FF3380",
	"#CCCC00",

	"#4D80CC",
	"#9900B3",
	"#E64D66",
	"#4DB380",
	"#FF4D4D",

	"#6666FF",
];
