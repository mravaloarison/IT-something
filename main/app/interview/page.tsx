"use client";

import InterviewQuestionnaire from "@/components/InterviewQuestionnaire";
import WithUserLayout from "@/components/with_user_layout";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function InterviewPage() {
	const [interviewQuestions, setInterviewQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState<string[]>([]);
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
										<InterviewQuestionnaire
											interviewQuestions={
												interviewQuestions
											}
										/>
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
