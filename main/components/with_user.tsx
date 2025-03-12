import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { auth } from "../app/fb";
import { LogOut } from "lucide-react";

import { Input } from "@/components/ui/input";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Textarea } from "./ui/textarea";

export default function WithUserView({ user }: { user: string | null }) {
	const [JobSelected, setJobSelected] = useState("");
	const [ChoseOther, setChoseOther] = useState(false);
	const [JobDescription, setJobDescription] = useState("");

	const jobsSuggestions = [
		"Software Engineer",
		"Data Scientist",
		"Product Manager",
		"UX Designer",
		"FullStack Developer",
	];

	const [loading, setLoading] = useState(false);

	const tl = useRef(gsap.timeline());

	// GSAP animation setup
	useGSAP(() => {
		tl.current = gsap.timeline();

		const jobs = gsap.utils.toArray(".job");

		tl.current.from(jobs, {
			opacity: 0,
			x: 20,
			stagger: 0.1,
			ease: "power2.out",
		});
	});

	// Handle job selection
	const handleJobSelection = (job: string) => {
		const jobs = gsap.utils.toArray(".job");

		gsap.to(jobs, {
			opacity: 0,
			x: 20,
			stagger: 0.1,
			ease: "power2.out",
			onComplete: () => {
				setJobSelected(job);
			},
		});
	};

	// Handle "Other" selection
	const handleOtherSelection = () => {
		const jobs = gsap.utils.toArray(".job");

		gsap.to(jobs, {
			opacity: 0,
			x: 20,
			stagger: 0.1,
			ease: "power2.out",
			onComplete: () => {
				setChoseOther(true);
			},
		});
	};

	useEffect(() => {
		if (JobSelected !== "") {
			const jobSelected = gsap.utils.toArray(".job-selected");

			gsap.from(jobSelected, {
				opacity: 0,
				x: 20,
				stagger: 0.1,
				ease: "power2.out",
			});
		} else if (ChoseOther) {
			const choseOther = gsap.utils.toArray(".chose-other");

			gsap.from(choseOther, {
				opacity: 0,
				x: 20,
				stagger: 0.1,
				ease: "power2.out",
			});
		}
	});

	if (loading) {
		return (
			<div className="flex h-screen justify-center items-center">
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<div>
			<nav className="border p-6 flex justify-between items-center w-full">
				<p className="font-semibold text-lg">
					<span className="text-xl px-1.5 animate-bounce">👋</span>{" "}
					{user}
				</p>
				<Button variant="secondary" onClick={() => auth.signOut()}>
					<LogOut />
					Sign Out
				</Button>
			</nav>

			<main>
				{JobSelected === "" && !ChoseOther ? (
					<div className="max-w-xl mx-auto p-6">
						<h1 className="text-center p-6 text-2xl font-semibold">
							What field do you want to practice for?
						</h1>
						<div className="flex flex-col gap-6 pt-6">
							{jobsSuggestions.map((job) => (
								<Button
									key={job}
									variant="outline"
									size="lg"
									className="job"
									onClick={() => handleJobSelection(job)}
								>
									{job}
								</Button>
							))}
							<Button
								variant="outline"
								size="lg"
								onClick={handleOtherSelection}
								className="job"
							>
								Other
							</Button>
						</div>
					</div>
				) : (
					<>
						{ChoseOther ? (
							<div className="max-w-xl mx-auto p-6 flex flex-col gap-6">
								<div className="flex flex-col gap-2 chose-other">
									<label className="text-sm font-semibold">
										Job Title
									</label>
									<Input type="text" />
								</div>
								<div className="flex flex-col gap-2 chose-other">
									<label className="text-sm font-semibold">
										Description
									</label>
									<Textarea
										onChange={(e) =>
											setJobDescription(e.target.value)
										}
									/>
								</div>
								<Button
									onClick={() => {
										setLoading(true);
										setTimeout(() => {
											setLoading(false);
										}, 2000);
									}}
									className="chose-other"
								>
									Start Interview
								</Button>
								<Button
									variant="secondary"
									onClick={() => setChoseOther(false)}
									className="chose-other"
								>
									Change
								</Button>
							</div>
						) : (
							<div className="max-w-xl mx-auto p-6 flex flex-col gap-6">
								<div className="flex flex-col gap-2 job-selected">
									<label className="text-sm font-semibold">
										Job Title
									</label>
									<p className="text-lg font-semibold underline decoration-dashed">
										{JobSelected}
									</p>
								</div>
								<div className="flex flex-col gap-2 job-selected">
									<label className="text-sm font-semibold">
										Description
									</label>
									<Textarea
										onChange={(e) =>
											setJobDescription(e.target.value)
										}
									/>
								</div>
								<Button
									onClick={() => {
										setLoading(true);
										setTimeout(() => {
											setLoading(false);
										}, 2000);
									}}
									className="job-selected"
								>
									Start Interview
								</Button>
								<Button
									variant="secondary"
									onClick={() => setJobSelected("")}
									className="job-selected"
								>
									Change
								</Button>
							</div>
						)}
					</>
				)}
			</main>
		</div>
	);
}
