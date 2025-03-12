import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import JobSelectionView from "./JobSelectionView";
import JobDescriptionView from "./JobDescriptionView";
import OtherJobView from "./OtherJobView";
import WithUserLayout from "./with_user_layout";

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
		<WithUserLayout user={user}>
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
								jobDescription={JobDescription}
								setJobSelected={setJobSelected}
								setChoseOther={setChoseOther}
								jobSelected={JobSelected}
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
		</WithUserLayout>
	);
}
