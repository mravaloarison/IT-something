"use client";

import AuthSignUp from "@/components/authLayout";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../fb";

export default function SignIn() {
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
			if (authUser) {
				window.location.href = "/";
			}
		});

		return () => unsubscribe();
	}, []);

	return <AuthSignUp args={{ signup: false }} />;
}
