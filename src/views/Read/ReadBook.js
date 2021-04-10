import React, { useEffect, useLayoutEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import "./readBook.css";
import { fetchSubjects } from "store/actions/practiceBySubjectActions";
import { fetchReadables } from "store/actions/readActions";
import CustomSpinner from "components/CustomSpinner";
import { ReactComponent as ArrowRightCircleIcon } from "../../assets/subjects/ArrowRightCircle.svg";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const ReadBook = () => {
	const { id, bookId } = useParams();
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const { loading, types, data } = useSelector((state) => state.readables);
	const [url, setUrl] = useState("");
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(fetchReadables());
	}, [dispatch]);

	useEffect(() => {
		const fetchBook = async () => {
			try {
				const res = await axios.post(
					`https://classcast-198812.appspot.com/content/generateSignedUrl/`,
					{
						path: data[bookId]?.path,
					}
				);

				setUrl(res.data);
			} catch (error) {
				setError(true);
			}
		};

		if (!loading) {
			fetchBook();
		}
	}, [loading, bookId, data]);

	function onDocumentLoadSuccess({ numPages, ...rest }) {
		setNumPages(numPages);
	}

	return (
		<div>
			<button
				style={{
					transform: "rotate(180deg)",
					position: "absolute",
					zIndex: 1000,
				}}
				onClick={() => history.goBack()}
			>
				<ArrowRightCircleIcon />
			</button>
			{error && (
				<h1 className="reactPdf_error text-align-center primary">
					Something went wrong! Please try again
				</h1>
			)}
			{url && !loading ? (
				<Document
					file={url}
					onLoadSuccess={onDocumentLoadSuccess}
					noData={
						<h1 className="reactPdf_error text-align-center primary">
							{/* PDF could not be loaded try reloading the page */}
						</h1>
					}
					error={
						<h1 className="reactPdf_error text-align-center primary">
							PDF could not be loaded try reloading the page
						</h1>
					}
					loading={<CustomSpinner />}
				>
					{Array.from(Array(numPages).keys()).map((item) => (
						<Page pageNumber={item + 1} key={item + 1} />
					))}
				</Document>
			) : (
				<CustomSpinner />
			)}

			{/* <p>
				Page {pageNumber} of {numPages}
			</p> */}
		</div>
	);
};

export default ReadBook;
