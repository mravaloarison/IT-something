"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContinueWithGoogle } from "@/app/fb";
import SignUpForm from "./sign_up";
import SignInForm from "./sign_in";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";

interface AuthenticationViewProps {
	signup: boolean;
}

export default function AuthenticationView({
	signup,
}: AuthenticationViewProps) {
	return (
		<Card>
			<CardHeader className="text-center">
				<CardTitle className="text-xl">
					{signup ? "Welcome to InterviewPrep" : "Welcome Back"}
				</CardTitle>
				<CardDescription>
					{signup
						? "Create an account with email and password"
						: "Login with your email and passowrd"}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="w-full flex flex-col gap-6">
					{signup ? <SignUpForm /> : <SignInForm />}
					<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-200 dark:after:border-gray-800">
						<span className="relative z-10 bg-white px-2 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
							Or continue with
						</span>
					</div>
					<Button onClick={ContinueWithGoogle} variant="outline">
						<img
							src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
							className="w-5 h-5"
						/>
						Continue with Google
					</Button>
				</div>
				<p className="text-sm pt-6 text-gray-500 text-center">
					{signup
						? "Already have an account?"
						: "Don't have an account?"}{" "}
					<Link
						href={signup ? "/sign_in" : "/sign_up"}
						className="text-blue-500"
					>
						{signup ? "Sign in" : "Sign up"}
					</Link>
				</p>
			</CardContent>
		</Card>
	);
}
