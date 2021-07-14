// import { ReactComponent as Group16681 } from "../../assets/profile/Group 1668-1.svg";
// import { ReactComponent as Group16682 } from "../../assets/profile/Group 1668-2.svg";
// import { ReactComponent as Group16683 } from "../../assets/profile/Group 1668-3.svg";
// import { ReactComponent as Group16684 } from "../../assets/profile/Group 1668-4.svg";
// import { ReactComponent as Group16685 } from "../../assets/profile/Group 1668-5.svg";
// import { ReactComponent as Group1668 } from "../../assets/profile/Group 1668.svg";
// import { ReactComponent as Group1674 } from "../../assets/profile/Group 1674.svg";
import { ReactComponent as Group1637 } from "../../assets/profile/Group 1637.svg";
// import { ReactComponent as EditSquare } from "../../assets/profile/EditSquare.svg";
import { ReactComponent as DPIcon } from "../../assets/sidenav/dp.svg";

import style from "./profile.module.css";
import ProgressBar from "components/ProgressBar/ProgressBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeInstitute } from "store/actions/instituteActions";
import history from "../../history";

const instituteGoals = [
  {
    id: 50,
    name: "Class 1",
    goal_type: 14,
  },
  {
    id: 19,
    name: "Class 2",
    goal_type: 14,
  },
  {
    id: 18,
    name: "Class 3",
    goal_type: 14,
  },
  {
    id: 17,
    name: "Class 4",
    goal_type: 14,
  },
  {
    id: 16,
    name: "Class 5",
    goal_type: 14,
  },
  {
    id: 15,
    name: "Class 6",
    goal_type: 14,
  },
  {
    id: 14,
    name: "Class 7",
    goal_type: 14,
  },
  {
    id: 13,
    name: "Class 8",
    goal_type: 14,
  },
  {
    id: 12,
    name: "Class 9",
    goal_type: 14,
  },
  {
    id: 41,
    name: "Class 10 (English Medium)",
    goal_type: 14,
  },
  {
    id: 46,
    name: "Class 10 ( ಕನ್ನಡ ಮಾಧ್ಯಮ)",
    goal_type: 13,
  },
];

const UserProfile = () => {
  const [points, setPoints] = useState(0);
  const [goals, setGoals] = useState(0);
  const instituteId = useSelector((state) => state.instituteId);
  const displayName = useSelector((state) => state.firebase.auth.displayName);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/content/get_points/${instituteId}/`);
      setPoints(response.data.points);
    };
    const fetchGoals = async () => {
      const response = await axios.post(`/institute/login/`, {
        institute: instituteId,
      });
      setGoals(response.data.data.goalDetails);
    };
    fetchData();
    fetchGoals();
  }, [instituteId]);

  const dispatch = useDispatch();

  const setGoalApi = async (goal) => {
    try {
      const response = await axios.post("/institute/login/", {
        institute: instituteId,
        selected_goals: [goal],
      });
      if (response.data.response == "Success") {
        history.push("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <button className={style.editSquare}>
				<EditSquare />
			</button> */}
      <DPIcon className={style.dp} />
      <h2 className={`info text-align-center ${style.name}`}>Hi, Student</h2>
      {/* <h2 className={`info text-align-center ${style.class}`}>Class 10</h2> */}
      <div className={style.pointsScoredContainer}>
        <Group1637 />
        <div>
          <div className={style.points}>{points}</div>
          <h2 className={style.pointsScored}>Points Scored</h2>
        </div>
      </div>

      <div className={style.heading}>Boards</div>

      <div className={style.actions}>
        <button
          className={30 === instituteId && style.btnActive}
          onClick={() => dispatch(changeInstitute(30))}
        >
          CBSE
        </button>
        <button
          className={31 === instituteId && style.btnActive}
          onClick={() => dispatch(changeInstitute(31))}
        >
          IGSCE
        </button>
        <button
          className={28 === instituteId && style.btnActive}
          onClick={() => dispatch(changeInstitute(28))}
        >
          ICSE
        </button>
      </div>

      <div>
        <div className={style.heading}>Goals</div>
      </div>

      {goals ? (
        <div className={[style.actions, style.goals].join(" ")}>
          {goals &&
            instituteGoals.map((data, i) => (
              <button
                key={i}
                className={data.id === goals[0].id ? style.btnActive : ""}
                onClick={() => setGoalApi(data.id)}
              >
                {data.name}
              </button>
            ))}
        </div>
      ) : (
        " "
      )}
    </>
  );
};

const ProgressCard = () => {
  return (
    <div className={style.progressCardContainer}>
      <div className={style.header}>
        <h2>Learning Track Completion</h2>
        <div>50%</div>
      </div>
      <div className={style.lessons}>
        <span>22 lessons</span>
        <span>44 lessons</span>
      </div>
      <ProgressBar progress={"50%"} />
    </div>
  );
};

const Profile = () => {
  const listSubjects = (block, text) => {
    return (
      <div className={style.subjectBlock}>
        {block}
        <div>{text}</div>
      </div>
    );
  };

  return (
    <div className={style.profileContainer}>
      <h1 className="secondary text-align-center">Profile</h1>
      <UserProfile />
      {/* <div className={style.subjectsContainer}>
				{listSubjects(<Group16685 />, "All")}
				{listSubjects(<Group1668 />, "Maths")}
				{listSubjects(<Group1674 />, "Science")}
				{listSubjects(<Group16681 />, "English")}
				{listSubjects(<Group16684 />, "Social Sciences")}
				{listSubjects(<Group16682 />, "Kannada")}
				{listSubjects(<Group16683 />, "Hindi")}
			</div>
			<div className={style.progressContainer}>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
					<ProgressCard />
				))}
			</div> */}
    </div>
  );
};

export default Profile;
