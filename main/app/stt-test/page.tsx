"use client";

import { Button } from "@/components/ui/button";
import { Mic, RefreshCcw, StopCircle } from "lucide-react";
import React from "react";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

export default function Page() {
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
		isMicrophoneAvailable,
	} = useSpeechRecognition();

	if (!browserSupportsSpeechRecognition) {
		return <div>Browser doesn't support speech recognition.</div>;
	}

	if (!isMicrophoneAvailable) {
		return <div>Microphone is not available.</div>;
	}

	return (
		<div className="flex w-screen h-screen justify-center items-center flex-col gap-6">
			<p>Microphone: {listening ? "on" : "off"}</p>

			<div className="flex gap-6 items-center">
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
			<p>{transcript}</p>
		</div>
	);
}
