"use client";

import { PawPrint } from "lucide-react";
import AuthenticationView from "./auth";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

interface SignUpPageProps {
	args: {
		signup: boolean;
	};
}

export default function AuthSignUp({ args }: SignUpPageProps) {
	useGSAP(() => {
		const items = document.querySelectorAll(".item");

		gsap.fromTo(
			items,
			{
				opacity: 0,
				y: -20,
			},
			{
				opacity: 1,
				y: 0,
				stagger: 0.1,
				ease: "power2.inOut",
			}
		);
	});

	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gray-100 p-6 md:p-10 dark:bg-gray-800">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<a
					href="#"
					className="flex items-center gap-2 self-center font-medium item opacity-0"
				>
					<div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900">
						<PawPrint className="size-4" />
					</div>
					By Rava
				</a>
				<div className="item opacity-0">
					{<AuthenticationView signup={args.signup} />}
				</div>
				<div className="item opacity-0 text-balance text-center text-xs text-gray-500   dark:text-gray-400 ">
					By continuing, you accept our{" "}
					<Link
						href="/"
						target="_blank"
						className="font-semibold hover:underline"
					>
						Terms and Conditions.
					</Link>
				</div>
			</div>
		</div>
	);
}
