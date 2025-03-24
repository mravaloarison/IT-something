"use client";

import InterviewQuestionnaire from "@/components/InterviewQuestionnaire";
import Timer from "@/components/Timer";
import { Button } from "@/components/ui/button";
import WithUserLayout from "@/components/with_user_layout";
import { Frown, Laugh, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import gsap from "gsap";
import { auth } from "../fb";
import { onAuthStateChanged } from "firebase/auth";
import {
	Dialog,
	DialogFooter,
	DialogHeader,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";
import Loading from "@/components/Loading";

export default function InterviewPage() {
	const [interviewQuestions, setInterviewQuestions] = useState([]);
	const [loadingInterview, setLoadingInterview] = useState(false);
	const [error, setError] = useState("");
	const [answers, setAnswers] = useState(
		Array(interviewQuestions.length).fill("")
	);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [user, setUser] = useState<string | null>(null);
	const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
			if (authUser) {
				setUser(authUser.displayName || authUser.email || "");
			} else {
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const handleGetFeedback = () => {
		if (answers.some((answer) => answer === "")) {
			setIsDialogOpen(true);
		} else {
			getFeedback();
		}
	};

	const getFeedback = () => {
		setIsFeedbackLoading(true);

		const playloud = {
			questions: interviewQuestions,
			answers: answers,
		};

		const formData = new FormData();

		formData.append("job-title", localStorage.getItem("job") || "");
		formData.append("playloud", JSON.stringify(playloud));

		// send to the backend
		fetch("/api/get_feedback", {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				toast.success("Data ready", {
					duration: 10000,
				});

				setIsFeedbackLoading(false);

				localStorage.setItem("feedbackData", JSON.stringify(data));
				window.location.href = "/feedback";
			})
			.catch((e) => {
				toast.error(
					"Something went wrong while generating the feedback, please try reloading the page",
					{
						duration: 5000,
					}
				);

				console.log(e);
				
				setIsFeedbackLoading(false);
			});
	};

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

			gsap.from(".interview", {
				opacity: 0,
				x: 50,
				duration: 1,
			});
		}

		const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
			if (!authUser) {
				window.location.href = "/";

				toast.success("You have been logged out", {
					duration: 3000,
				});
			}
		});

		return () => unsubscribe();
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

	if (loadingInterview) {
		return (
			<div className="flex h-screen justify-center items-center">
				<Loading />
			</div>
		);
	}

	return (
		<WithUserLayout user={user}>
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you sure?</DialogTitle>
						<DialogDescription>
							You have not answered all questions. Are you sure
							you want to proceed?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="secondary">Cancel</Button>
						</DialogClose>
						<Button
							variant="destructive"
							onClick={() => {
								setIsDialogOpen(false);
								getFeedback();
							}}
						>
							Proceed
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<main className="max-w-xl mx-auto p-6">
				<div>
					{error ? (
						<p className="text-red-500">{error}</p>
					) : (
						<>
							{interviewQuestions.length > 0 ? (
								<div className="flex flex-col gap-6 justify-center interview">
									<div className="flex justify-between items-center text-center">
										<Timer />
									</div>
									<InterviewQuestionnaire
										interviewQuestions={interviewQuestions}
										answers={answers}
										setAnswers={setAnswers}
									/>
									<Button
										size="lg"
										className="uppercase"
										onClick={handleGetFeedback}
										disabled={isFeedbackLoading}
									>
										{isFeedbackLoading ? (
											<>
												<Loader className="animate-spin" />
												<span className="animate-pulse">
													Loading
												</span>
											</>
										) : (
											<>
												<Laugh />
												Get feedback
											</>
										)}
									</Button>
									<Button
										size="lg"
										variant="secondary"
										className="uppercase"
										disabled={isFeedbackLoading}
										onClick={() => {
											gsap.to(".interview", {
												opacity: 0,
												y: -50,
												duration: 0.5,
												onComplete: () => {
													localStorage.removeItem(
														"job"
													);
													localStorage.removeItem(
														"description"
													);
													window.location.href = "/";
												},
											});
										}}
									>
										<Frown />
										Change job
									</Button>
								</div>
							) : (
								<></>
							)}
						</>
					)}
				</div>
			</main>
		</WithUserLayout>
	);
}
