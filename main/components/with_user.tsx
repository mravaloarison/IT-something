import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { auth } from "../app/fb";
import { LogOut } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import JobSelectionView from "./JobSelectionView";
import JobDescriptionView from "./JobDescriptionView";
import OtherJobView from "./OtherJobView";
import { toast } from "sonner";

export default function WithUserView({ user }: { user: string | null }) {
	const [JobSelected, setJobSelected] = useState("");
	const [ChoseOther, setChoseOther] = useState(false);
	const [JobDescription, setJobDescription] = useState("");
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
				<Button
					variant="secondary"
					onClick={() => {
						auth.signOut();

						setTimeout(() => {
							toast.success("You have been signed out", {
								duration: 3000,
							});
						}, 500);
					}}
				>
					<LogOut />
					Sign Out
				</Button>
			</nav>

			<main>
				{JobSelected === "" && !ChoseOther ? (
					<JobSelectionView
						handleJobSelection={handleJobSelection}
						handleOtherSelection={handleOtherSelection}
					/>
				) : (
					<>
						{ChoseOther ? (
							<OtherJobView
								setJobDescription={setJobDescription}
								setLoading={setLoading}
								setChoseOther={setChoseOther}
							/>
						) : (
							<JobDescriptionView
								JobSelected={JobSelected}
								setJobDescription={setJobDescription}
								setLoading={setLoading}
								setJobSelected={setJobSelected}
							/>
						)}
					</>
				)}
			</main>
		</div>
	);
}
