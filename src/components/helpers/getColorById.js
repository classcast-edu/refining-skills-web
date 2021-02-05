const getColorById = (id) => {
	switch (parseInt(id)) {
		case 22:
			return "#FF78A3";
		case 23:
		case 24:
		case 25:
		case 26:
			return "#FFC46A";
		case 33:
			return "#EF90FF";
		case 20:
		case 35:
			return "#FFA88D";
		case 36:
		case 37:
		case 38:
		case 41:
			return "#F29DA4";
		default:
			return "#50C4C4";
	}
};

export default getColorById;
