import { Button } from "./ui/button";
import { auth } from "../app/fb";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import React from "react";
import Footer from "./footer";

export default function WithUserLayout(props: {
	user: string;
	children: React.ReactNode;
}) {
	const user = props.user;

	return (
		<div>
			<nav className="border p-6 flex justify-between items-center w-full">
				<p className="font-semibold text-lg w-40 md:w-full truncate">
					<span className="text-xl px-1.5 animate-bounce">👋</span>{" "}
					{user}
				</p>
				<Button
					variant="secondary"
					onClick={() => {
						auth.signOut();

						setTimeout(() => {
							toast.success("You have been signed out", {
								duration: 3000,
							});
						}, 500);
					}}
				>
					<LogOut />
					Sign Out
				</Button>
			</nav>
			{props.children}
			<Footer />
		</div>
	);
}
