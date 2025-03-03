import { GalleryVerticalEnd } from "lucide-react";

import { Button } from "@/components/ui/button";

export function NoUserView() {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col items-center gap-2">
					<a
						href="#"
						className="flex flex-col items-center gap-2 font-medium"
					>
						<div className="flex size-8 items-center justify-center rounded-md">
							<GalleryVerticalEnd className="size-6" />
						</div>
						<span className="sr-only">Interview Prep</span>
					</a>
					<h1 className="text-xl font-bold">
						Welcome to Interview Prep
					</h1>
					<div className="text-center text-sm">
						A quick way to prepare for your next interview. Practice
						key questions, get insights about your answers, and get
						more comfortable interviewing.
					</div>
				</div>
				<div className="flex flex-col gap-6">
					<Button variant="outline" className="w-full">
						<a href="/sign_up">Sign Up</a>
					</Button>
					<Button className="w-full">
						<a href="/sign_in">Sign In</a>
					</Button>
				</div>
			</div>
		</div>
	);
}
