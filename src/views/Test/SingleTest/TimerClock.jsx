import React from "react";
import Timer from "react-compound-timer/build";
import style from "./singleTest.module.css";
import { RiTimerLine } from "react-icons/ri";

const TimerClock = ({ time, timerClockRef }) => {
	return (
		<Timer
			initialTime={time * 60000}
			direction="backward"
			ref={timerClockRef}
			startImmediately={false}
			formatValue={(value) => `${value < 10 ? `0${value}` : value} `}
			checkpoints={[
				{
					time: 29 * 60000,
					callback: () => console.log("Checkpoint A"),
				},
			]}
		>
			{({ start, stop, reset, timerState }) => {
				return (
					<div className={style.timer}>
						<RiTimerLine size={"2em"} />
						<Timer.Hours />
						{" : "}
						<Timer.Minutes />
						{" : "}
						<Timer.Seconds />
					</div>
				);
			}}
		</Timer>
	);
};

export default TimerClock;
