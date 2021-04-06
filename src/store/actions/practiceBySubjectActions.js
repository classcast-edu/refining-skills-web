import axios from "axios";
import { FETCH_SUBJECTS_FAIL } from "store/constants/practiceConstants";
import { FETCH_SUBJECTS_REQUEST } from "store/constants/practiceConstants";
import { FETCH_SUBJECTS_SUCCESS } from "store/constants/practiceConstants";

export const fetchSubjects = () => async (dispatch, getState) => {
	const instituteId = getState().instituteId;
	dispatch({ type: FETCH_SUBJECTS_REQUEST });

	try {
		return dispatch({
			type: FETCH_SUBJECTS_SUCCESS,
			payload: getSubjects(instituteId),
		});
	} catch (error) {
		return dispatch({ type: FETCH_SUBJECTS_FAIL });
	}
};

const getSubjects = (instituteId) => {
	switch (instituteId) {
		case 31:
			return subjectsIGCSE;

		case 30:
			return subjectsICSE;

		default:
			return subjectsCBSE;
	}
};
const subjectsCBSE = [
	{
		name: "Mathematics",
		color: "#FF78A4",
		color2: "#FF3F7D",
		secondaryColor: "#FF78A3",
		color3: "#FF78A320",
		id: 22,
	},
	{
		name: "Science",
		color: "#FFC670",
		color2: "#FFB23B",
		secondaryColor: "#FFC46A",
		color3: "#FFC46A20",
		id: 25,
	},
	{
		name: "Social Studies",
		color: "#FF8058",
		color2: "#FFA589",
		secondaryColor: "#FFA88D",
		color3: "#FFA88D20",
		id: 35,
	},
	{
		name: "English",
		color: "#ED7685",
		color2: "#F19DA4",
		secondaryColor: "#F29DA4",
		color3: "#F29DA420",
		id: 41,
	},
	{
		name: "Hindi",
		color: "#E543FF",
		color2: "#EF8CFF",
		secondaryColor: "#EF90FF",
		color3: "#FFC46A20",
		id: 33,
	},
];
const subjectsIGCSE = [
	{
		name: "Mathematics",
		color: "#FF78A4",
		color2: "#FF3F7D",
		secondaryColor: "#FF78A3",
		color3: "#FF78A320",
		id: 22,
	},
	{
		name: "Physics",
		color: "#FFC670",
		color2: "#FFB23B",
		secondaryColor: "#FFC46A",
		color3: "#FFC46A20",
		id: 24,
	},
	{
		name: "Chemistry",
		color: "#FFC670",
		color2: "#FFB23B",
		secondaryColor: "#FFC46A",
		color3: "#FFC46A20",
		id: 23,
	},
	{
		name: "Biology",
		color: "#FFC670",
		color2: "#FFB23B",
		secondaryColor: "#FFC46A",
		color3: "#FFC46A20",
		id: 26,
	},
];
const subjectsICSE = [
	{
		name: "Mathematics",
		color: "#FF78A4",
		color2: "#FF3F7D",
		secondaryColor: "#FF78A3",
		color3: "#FF78A320",
		id: 22,
	},
	{
		name: "Physics",
		color: "#FFC670",
		color2: "#FFB23B",
		secondaryColor: "#FFC46A",
		color3: "#FFC46A20",
		id: 24,
	},
	{
		name: "Chemistry",
		color: "#FFC670",
		color2: "#FFB23B",
		secondaryColor: "#FFC46A",
		color3: "#FFC46A20",
		id: 23,
	},
	{
		name: "Biology",
		color: "#FFC670",
		color2: "#FFB23B",
		secondaryColor: "#FFC46A",
		color3: "#FFC46A20",
		id: 26,
	},
	{
		name: "History Civics",
		color: "#E543FF",
		color2: "#EF8CFF",
		secondaryColor: "#EF90FF",
		color3: "#FFC46A20",
		id: 48,
	},
	{
		name: "Geography",
		color: "#E543FF",
		color2: "#EF8CFF",
		secondaryColor: "#EF90FF",
		color3: "#FFC46A20",
		id: 20,
	},
	{
		name: "English Language",
		color: "#ED7685",
		color2: "#F19DA4",
		secondaryColor: "#F29DA4",
		color3: "#F29DA420",
		id: 45,
	},
	{
		name: "English Literature",
		color: "#ED7685",
		color2: "#F19DA4",
		secondaryColor: "#F29DA4",
		color3: "#F29DA420",
		id: 43,
	},
	{
		name: "Hindi",
		color: "#E543FF",
		color2: "#EF8CFF",
		secondaryColor: "#EF90FF",
		color3: "#FFC46A20",
		id: 42,
	},
	{
		name: "Commercial Studies",
		color: "#FFC670",
		color2: "#FFB23B",
		secondaryColor: "#FFC46A",
		color3: "#FFC46A20",
		id: 47,
	},
	{
		name: "Economic Applications",
		color: "#ED7685",
		color2: "#F19DA4",
		secondaryColor: "#F29DA4",
		color3: "#F29DA420",
		id: 46,
	},
	{
		name: "Computer Applications",
		color: "#E543FF",
		color2: "#EF8CFF",
		secondaryColor: "#EF90FF",
		color3: "#FFC46A20",
		id: 44,
	},
];
