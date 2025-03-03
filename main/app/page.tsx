"use client";

import React, { useState, useEffect } from "react";
import { auth } from "./fb";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { NoUserView } from "@/components/no_user";

export default function Home() {
	const [user, setUser] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
			if (authUser) {
				setUser(authUser.email ?? "");
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	if (loading) {
		return (
			<div className="flex h-screen justify-center items-center">
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<>
			{user ? (
				<div className="flex flex-col items-center gap-4 h-screen justify-center">
					<p>Hello {user}!</p>
					<Button variant="outline" onClick={() => auth.signOut()}>
						<LogOut />
						Sign Out
					</Button>
				</div>
			) : (
				<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
					<div className="w-full max-w-sm">
						<NoUserView />
					</div>
				</div>
			)}
		</>
	);
}
