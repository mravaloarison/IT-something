"use client";

import React, { useState, useEffect } from "react";
import { auth } from "./fb";
import { onAuthStateChanged } from "firebase/auth";
import { NoUserView } from "@/components/no_user";
import WithUserView from "@/components/with_user";
import Loading from "@/components/Loading";

export default function Home() {
	const [user, setUser] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
			if (authUser) {
				setUser(authUser.displayName || authUser.email || "");
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
				<Loading />
			</div>
		);
	}

	return (
		<>
			{user ? (
				<WithUserView user={user} />
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
