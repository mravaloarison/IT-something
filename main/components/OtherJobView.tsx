import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import { useState } from "react";

interface OtherJobViewProps {
	setJobDescription: (description: string) => void;
	jobDescription: string;
	setChoseOther: (choseOther: boolean) => void;
	setJobSelected: (jobSelected: string) => void;
	jobSelected: string;
}

export default function OtherJobView({
	setJobDescription,
	jobDescription,
	setJobSelected,
	setChoseOther,
	jobSelected,
}: OtherJobViewProps) {
	const [isLoading, setIsLoading] = useState(false);

	const callAPI = async () => {
		const formData = new FormData();
		formData.append("q", jobSelected);

		const response = await fetch("/api/is_valid_job", {
			method: "POST",
			body: formData,
		});

		try {
			const data = await response.json();

			if (data.res) {
				toast.success("Job is valid", {
					duration: 3000,
				});

				// put in local storage
				localStorage.setItem("job", jobSelected);
				localStorage.setItem("description", jobDescription);

				window.location.href = "/interview";
			} else {
				toast.warning("Please enter a valid job", {
					duration: 3000,
				});
			}
		} catch (e) {
			toast.error("Please try again, something went wrong", {
				duration: 3000,
			});
		}
	};

	return (
		<div className="max-w-xl mx-auto p-6 flex flex-col gap-6">
			<div className="flex flex-col gap-2 chose-other">
				<label className="text-sm font-semibold">Job Title</label>
				<Input
					type="text"
					value={jobSelected}
					onChange={(e) => setJobSelected(e.target.value)}
				/>
			</div>
			<div className="flex flex-col gap-2 chose-other">
				<label className="text-sm font-semibold">
					Description (Optional)
				</label>
				<Textarea
					value={jobDescription}
					onChange={(e) => setJobDescription(e.target.value)}
				/>
			</div>
			<Button
				onClick={() => {
					setIsLoading(true);

					if (jobSelected === "") {
						toast.error("Make sure to enter a job", {
							duration: 3000,
						});
						setIsLoading(false);
						return;
					}
					// send to the back
					callAPI();
					setIsLoading(false);
				}}
				disabled={isLoading}
				className="chose-other"
			>
				{isLoading ? "Loading..." : "Start Interview"}
			</Button>
			<Button
				variant="secondary"
				onClick={() => {
					setJobSelected("");
					setChoseOther(false);
				}}
				className="chose-other"
			>
				Change
			</Button>
		</div>
	);
}
