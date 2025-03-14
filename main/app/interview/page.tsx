"use client";

import InterviewQuestionnaire from "@/components/InterviewQuestionnaire";
import Timer from "@/components/Timer";
import { Button } from "@/components/ui/button";
import WithUserLayout from "@/components/with_user_layout";
import { Frown, Laugh } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function InterviewPage() {
	const [interviewQuestions, setInterviewQuestions] = useState([]);
	const [loadingInterview, setLoadingInterview] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (interviewQuestions.length === 0) {
			setLoadingInterview(true);

			try {
				const jobTitle = localStorage.getItem("job");
				const jobDescription = localStorage.getItem("description");

				if (!jobTitle) {
					toast.error("Please select a job first", {
						duration: 3000,
					});

					window.location.href = "/";
				} else {
					generateInterviewQuestions(jobTitle, jobDescription || "")
						.then((data) => {
							setInterviewQuestions(data.res);
						})
						.catch(() => {
							setError("Error loading interview questions");
						})
						.finally(() => {
							setLoadingInterview(false);
						});
				}
			} catch {
				setError("Error loading interview questions");
			}
		} else {
			setLoadingInterview(false);
		}
	}, [interviewQuestions]);

	const generateInterviewQuestions = async (
		jobTitle: string,
		jobDescription: string
	) => {
		const formData = new FormData();

		formData.append("job-title", jobTitle);
		formData.append("job-description", jobDescription);

		const response = await fetch("/api/generate_questions", {
			method: "POST",
			body: formData,
		});

		const data = await response.json();
		return data;
	};

	return (
		<WithUserLayout>
			<main className="max-w-xl mx-auto p-6">
				<div>
					{error ? (
						<p className="text-red-500">{error}</p>
					) : (
						<>
							{loadingInterview ? (
								"Loading ..."
							) : (
								<>
									{interviewQuestions.length > 0 ? (
										<div className="flex flex-col gap-6 justify-center interview">
											<div className="flex justify-between items-center text-center">
												<Timer />
											</div>
											<InterviewQuestionnaire
												interviewQuestions={
													interviewQuestions
												}
											/>
											<Button
												size="lg"
												className="uppercase"
											>
												<Laugh />
												Ready for feedback
											</Button>
											<Button
												size="lg"
												variant="secondary"
												className="uppercase"
											>
												<Frown />
												Change job
											</Button>
										</div>
									) : (
										<p>No interview questions found</p>
									)}
								</>
							)}
						</>
					)}
				</div>
			</main>
		</WithUserLayout>
	);
}
