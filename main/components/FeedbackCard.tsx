import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

interface FeedbackItem {
	question: string;
	answer: string;
	feedback: string;
	score: number;
}

interface FeedbackCardProps {
	feedbackItem: FeedbackItem;
}

export function FeedbackCard({ feedbackItem }: FeedbackCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg font-semibold">
					{feedbackItem.question}
				</CardTitle>
				<CardDescription className="text-sm text-gray-600">
					Your Answer: {feedbackItem.answer || "No answer provided"}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-gray-700">{feedbackItem.feedback}</p>
				<div className="mt-4">
					<span className="text-sm font-medium">Score: </span>
					<span className="text-sm text-gray-700">
						{feedbackItem.score}/5
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
