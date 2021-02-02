import { CHANGE_INSTITUTE } from "store/constants/instituteConstants";

export default (
	state = window.localStorage.getItem("refiningSkillsInstituteId")
		? JSON.parse(window.localStorage.getItem("refiningSkillsInstituteId"))
		: 28,
	{ type, payload }
) => {
	switch (type) {
		case CHANGE_INSTITUTE:
			return payload;
		default:
			return state;
	}
};
