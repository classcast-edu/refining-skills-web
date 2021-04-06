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
import useQuery from "components/hooks/useQuery";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const ReadStandAloneBook = (props) => {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const query = useQuery();
	const [url, setUrl] = useState(query.get("url"));

	const history = useHistory();

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
			{url ? (
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

export default ReadStandAloneBook;
