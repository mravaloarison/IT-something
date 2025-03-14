import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Mic } from "lucide-react";

interface InterviewQuestionnaireProps {
	interviewQuestions: string[];
}

export default function InterviewQuestionnaire({
	interviewQuestions,
}: InterviewQuestionnaireProps) {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState<string[]>(
		Array(interviewQuestions.length).fill("")
	);

	const handleInputChange = (value: string) => {
		const updatedAnswers = [...answers];
		updatedAnswers[currentQuestion] = value;
		setAnswers(updatedAnswers);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Interview Questions</CardTitle>
				<p className="text-sm text-gray-500">
					Answer the following questions to prepare for your
					interview.
				</p>
			</CardHeader>
			<CardContent>
				<h2 className="text-lg font-semibold mb-4">
					{interviewQuestions[currentQuestion]}
				</h2>
				<Textarea
					className="w-full"
					value={answers[currentQuestion]}
					onChange={(e) => handleInputChange(e.target.value)}
					placeholder="Type your answer here..."
				/>
				<div className="flex justify-between mt-4">
					<Button
						variant="outline"
						disabled={currentQuestion === 0}
						onClick={() => setCurrentQuestion((prev) => prev - 1)}
						size="icon"
					>
						<ChevronLeft />
					</Button>
					<Button variant="ghost" className="flex items-center gap-2">
						<Mic size={16} /> Record
					</Button>
					<Button
						variant="outline"
						disabled={
							!answers[currentQuestion] ||
							currentQuestion === interviewQuestions.length - 1
						}
						onClick={() => setCurrentQuestion((prev) => prev + 1)}
						size="icon"
					>
						<ChevronRight />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
