import React, { useState } from "react";
import { ReactComponent as ToggleOpenIcon } from "../../assets/sidenav/toggleOpen.svg";
import { NavLink } from "react-router-dom";
import { ReactComponent as ProfileIcon } from "../../assets/sidenav/Profile.svg";
import { ReactComponent as PracticeIcon } from "../../assets/sidenav/Practice.svg";
import { ReactComponent as TestIcon } from "../../assets/sidenav/Test.svg";
import { ReactComponent as ReadIcon } from "../../assets/sidenav/Read.svg";
import { ReactComponent as DPIcon } from "../../assets/sidenav/dp.svg";
import { ReactComponent as LogoutIcon } from "../../assets/sidenav/Logout.svg";
import "./sideNav.css";
const NavTextWithIcon = (props) => {
	const { icon, text } = props;
	return (
		<NavLink
			className="sideNav-text-with-icon"
			to={`/${text}`}
			activeClassName={"side-nav-link-active"}
		>
			<span className="sideNav-link-icon">{icon}</span>
			<span className="sideNav-link-text">{text}</span>
		</NavLink>
	);
};
const SideNav = () => {
	const [isOpen, setIsOpen] = useState(true);

	const toggle = () => {
		if (isOpen) {
			setIsOpen(false);
			document.getElementById("sideNav").style.width = "7.4rem";
			document.getElementById("mainContent").style.marginLeft = "7.4rem";
		} else {
			setIsOpen(true);
			document.getElementById("sideNav").style.width = "20rem";
			document.getElementById("mainContent").style.marginLeft = "20rem";
		}
	};
	// const toggle = () => setIsOpen(!isOpen);

	return (
		<div
			className={`sideNav ${isOpen ? "sideNav-open" : "sideNav-close"}`}
			id="sideNav"
		>
			<button onClick={toggle} className="sideNav-toggler">
				{isOpen ? <ToggleOpenIcon /> : <ToggleOpenIcon />}
			</button>
			{/* <div>
				<span className="sideNav-link-icon">{<DPIcon />}</span>
				<span>Hi! deepak</span>
			</div> */}
			{/* <NavTextWithIcon icon={<DPIcon />} text="Hi! Ayush" /> */}
			<NavTextWithIcon icon={<ProfileIcon id="profileIcon" />} text="profile" />
			<NavTextWithIcon icon={<ReadIcon />} text="read" />
			<NavTextWithIcon icon={<TestIcon />} text="test" />
			<NavTextWithIcon icon={<PracticeIcon />} text="practice" />
			<NavTextWithIcon icon={<LogoutIcon id="logoutIcon" />} text="logout" />
		</div>
	);
};

export default SideNav;
