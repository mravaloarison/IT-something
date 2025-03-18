"use client";

import { FeedbackCard } from "@/components/FeedbackCard";
import { OverallReview } from "@/components/OverallReview";
import WithUserLayout from "@/components/with_user_layout";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../fb";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, Plus } from "lucide-react";

interface FeedbackData {
	question_feedback: {
		question: string;
		answer: string;
		feedback: string;
		score: number;
	}[];
	overall_review: {
		strengths: string;
		areas_for_improvement: string;
		final_recommendation: string;
	};
}

export default function FeedbackPage() {
	const [user, setUser] = useState<string | null>(null);
	const [fetchedData, setFetchedData] = useState<FeedbackData | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
			if (authUser) {
				setUser(authUser.displayName || authUser.email || "");
			} else {
				setUser(null);
			}
		});

		const cards = gsap.utils.toArray(".card");

		gsap.from(cards, {
			opacity: 0,
			x: 20,
			stagger: 0.2,
			duration: 1,
			ease: "power2.out",
		});

		const data = localStorage.getItem("feedbackData");
		if (data) {
			setFetchedData(JSON.parse(data) as FeedbackData);
		}

		return () => unsubscribe();
	}, []);

	const feedbackData = fetchedData
		? fetchedData
		: {
				question_feedback: [],
				overall_review: {
					strengths: "",
					areas_for_improvement: "",
					final_recommendation: "",
				},
		  };

	return (
		<WithUserLayout user={user}>
			<main className="max-w-xl mx-auto p-6">
				<h1 className="text-3xl font-semibold text-center pb-6">
					Feedback
				</h1>

				<div className="grid grid-cols-1 gap-6">
					<div className="card">
						<OverallReview
							overallReview={feedbackData.overall_review}
						/>
					</div>
					{feedbackData.question_feedback.map((item, index) => (
						<div key={index} className="card">
							<FeedbackCard key={index} feedbackItem={item} />
						</div>
					))}

					<div className="grid grid-cols-2 card gap-5">
						<Button variant="outline" disabled>
							<ArrowDownToLine />
							Save
						</Button>
						<Button
							variant="secondary"
							onClick={() => (window.location.href = "/")}
						>
							<Plus />
							Start new interview
						</Button>
					</div>
				</div>
			</main>
		</WithUserLayout>
	);
}
