import React from "react";
import Timer from "react-compound-timer/build";
import style from "./singleTest.module.css";
import { RiTimerLine } from "react-icons/ri";

const TimerClock = ({ time, timerClockRef, endTestHandler, stopTime }) => {
	return (
		<Timer
			initialTime={time * 60000}
			direction="backward"
			ref={timerClockRef}
			startImmediately={false}
			formatValue={(value) => `${value < 10 ? `0${value}` : value} `}
			checkpoints={[
				{
					time: 0 * 60000,
					callback: () => endTestHandler(),
				},
			]}
		>
			{({ start, stop, reset, timerState }) => {
				!stopTime && start();

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
