import Link from "next/link";

export default function Footer() {
	return (
		<footer className="pb-6 pt-2">
			<div className="flex justify-center items-center gap-2 text-xs text-gray-500">
				<p>&copy; 2025 Copyright</p>
				<p>·</p>
				<p>
					By{" "}
					<span className="font-semibold hover:underline">
						<Link
							href="https://mravaloarison.github.io/student-portfolio"
							target="_blank"
						>
							Rava
						</Link>
					</span>
				</p>
				<p>·</p>
				<Link
					href="https://google.com"
					target="_blank"
					className="hover:underline"
				>
					Terms and Conditions
				</Link>
			</div>
		</footer>
	);
}
