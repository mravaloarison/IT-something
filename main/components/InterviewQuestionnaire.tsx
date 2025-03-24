import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import {
	ChevronLeft,
	ChevronRight,
	Mic,
	TriangleAlert,
	RefreshCcw,
	StopCircle,
} from "lucide-react";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import Link from "next/link";

interface InterviewQuestionnaireProps {
	interviewQuestions: string[];
	answers: string[];
	setAnswers: (answers: string[]) => void;
}

export default function InterviewQuestionnaire({
	interviewQuestions,
	answers,
	setAnswers,
}: InterviewQuestionnaireProps) {
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
		isMicrophoneAvailable,
	} = useSpeechRecognition();

	const [currentQuestion, setCurrentQuestion] = useState(0);

	const handleInputChange = (value: string) => {
		const updatedAnswers = [...answers];
		updatedAnswers[currentQuestion] = value;
		setAnswers(updatedAnswers);
	};

	const goToNextQuestion = () => {
		const updatedAnswers = [...answers];
		updatedAnswers[currentQuestion] = transcript;
		setAnswers(updatedAnswers);

		resetTranscript();

		setCurrentQuestion((prev) => prev + 1);
	};

	const goToPreviousQuestion = () => {
		setCurrentQuestion((prev) => prev - 1);
	};

	useEffect(() => {
		if (interviewQuestions.length > 0) {
			setAnswers(Array(interviewQuestions.length).fill(""));
		}
	}, [interviewQuestions]);

	useEffect(() => {
		if (transcript && currentQuestion < interviewQuestions.length) {
			const updatedAnswers = [...answers];
			updatedAnswers[currentQuestion] = transcript;
			setAnswers(updatedAnswers);
		}
	}, [transcript, currentQuestion, interviewQuestions]);

	if (!browserSupportsSpeechRecognition) {
		return (
			<div className="h-screen w-screen flex flex-col gap-6 items-center p-6 justify-center">
				<TriangleAlert size={48} />
				<p className="font-semibold text-lg">
					Browser do not support speech recognition.
				</p>
				<Link href="/" className="text-blue-500">
					Go back
				</Link>
			</div>
		);
	}

	if (!isMicrophoneAvailable) {
		return (
			<div className="h-screen w-screen flex flex-col gap-6 items-center p-6 justify-center">
				<TriangleAlert size={48} />
				<p className="font-semibold text-lg">
					Microphone is not available. Please check your microphone
					settings.
				</p>
				<Link href="/" className="text-blue-500">
					Go back
				</Link>
			</div>
		);
	}

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
					key={currentQuestion}
					className="w-full"
					value={answers[currentQuestion] || ""}
					onChange={(e) => handleInputChange(e.target.value)}
					placeholder="Type your answer here..."
				/>
				<div className="flex justify-between mt-4">
					<Button
						variant="outline"
						disabled={currentQuestion === 0}
						onClick={goToPreviousQuestion}
						size="icon"
					>
						<ChevronLeft />
					</Button>
					<div className="flex gap-4 sm:gap-6 items-center">
						{listening ? (
							<Button
								variant="secondary"
								className="animate-pulse"
								onClick={SpeechRecognition.stopListening}
							>
								<StopCircle />
								Stop recording
							</Button>
						) : (
							<Button
								variant="ghost"
								onClick={() =>
									SpeechRecognition.startListening({
										continuous: true,
									})
								}
							>
								<Mic /> record
							</Button>
						)}

						{transcript && (
							<Button variant="ghost" onClick={resetTranscript}>
								<RefreshCcw />
							</Button>
						)}
					</div>
					<Button
						variant="outline"
						disabled={
							!answers[currentQuestion] ||
							currentQuestion === interviewQuestions.length - 1
						}
						onClick={goToNextQuestion}
						size="icon"
					>
						<ChevronRight />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
