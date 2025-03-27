import { GalleryVerticalEnd, UserRoundPenIcon, KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Footer from "./footer";

export function NoUserView() {
	const tl = useRef(gsap.timeline());

	useGSAP(() => {
		tl.current = gsap.timeline();

		const items = document.querySelectorAll(".item");
		tl.current.from(items, {
			opacity: 0,
			x: 10,
			stagger: 0.1,
			ease: "power2.inOut",
		});
	});

	function exitNoUserView(location: string) {
		const items = document.querySelectorAll(".item");
		gsap.to(items, {
			opacity: 0,
			y: -10,
			stagger: 0.1,
			ease: "power2.inOut",
			onComplete: () => {
				window.location.href = location;
			},
		});
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col items-center gap-2">
					<a
						href="#"
						className="flex flex-col items-center gap-2 font-medium item"
					>
						<div className="flex size-8 items-center justify-center rounded-md">
							<GalleryVerticalEnd className="size-6" />
						</div>
						<span className="sr-only">Interview Prep</span>
					</a>
					<h1 className="text-xl font-bold item">
						👋 Welcome to Interview Prep
					</h1>
					<div className="text-center text-sm item">
						A quick way to prepare for your next interview. Practice
						key questions, get insights about your answers, and get
						more comfortable interviewing.
					</div>
				</div>
				<div className="flex flex-col gap-6">
					<Button
						variant="outline"
						className="w-full item"
						onClick={() => exitNoUserView("/sign_up")}
					>
						<UserRoundPenIcon />
						<span>Sign Up</span>
					</Button>
					<Button
						className="w-full item"
						onClick={() => exitNoUserView("/sign_in")}
					>
						<KeyRound />
						<span>Sign In</span>
					</Button>
				</div>
				<div className="item">
					<Footer />
				</div>
			</div>
		</div>
	);
}
