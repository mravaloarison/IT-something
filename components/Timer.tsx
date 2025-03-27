import { useEffect, useState } from "react";

export default function Timer() {
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const formatTime = (totalSeconds: number) => {
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const secs = totalSeconds % 60;
		return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
			2,
			"0"
		)}:${String(secs).padStart(2, "0")} (${hours}h ${String(
			minutes
		).padStart(2, "0")} min)`;
	};

	return (
		<span className="text-gray-500 text-2xl text-center w-full">
			{formatTime(seconds)}
		</span>
	);
}
