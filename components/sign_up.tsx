"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Eye, EyeOff } from "lucide-react";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/fb";

import { toast } from "sonner";

const SignUpFormSchema = z
	.object({
		email: z.string().trim().email({ message: "Invalid email address" }),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long" })
			.max(64, { message: "Password must not exceed 64 characters" })
			.regex(/[A-Z]/, {
				message: "Password must contain at least one uppercase letter",
			})
			.regex(/[a-z]/, {
				message: "Password must contain at least one lowercase letter",
			})
			.regex(/[0-9]/, {
				message: "Password must contain at least one number",
			})
			.regex(/[^A-Za-z0-9]/, {
				message: "Password must contain at least one special character",
			}),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export default function SignUpForm() {
	const form = useForm<z.infer<typeof SignUpFormSchema>>({
		resolver: zodResolver(SignUpFormSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	function onSubmit(data: z.infer<typeof SignUpFormSchema>) {
		console.log(data.email);

		createUserWithEmailAndPassword(auth, data.email, data.password)
			.then(() => {
				window.location.href = "/sign_in";
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;

				handleCode(errorCode, errorMessage);
			});
	}

	function handleCode(code: string, message: string) {
		if (code === "auth/invalid-credential") {
			toast.warning("Invalid credential");
			console.log(message);
		} else {
			toast.error("Something went wrong");
			console.log(message);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-6"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<Input
								type="email"
								placeholder="Email"
								{...field}
							/>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="relative">
							<div className="flex items-center">
								<Input
									type={showPassword ? "text" : "password"}
									placeholder="Password"
									{...field}
								/>
								<button
									type="button"
									className="absolute right-3 text-gray-500"
									onClick={() =>
										setShowPassword(!showPassword)
									}
								>
									{showPassword ? (
										<EyeOff size={20} />
									) : (
										<Eye size={20} />
									)}
								</button>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem className="relative">
							<div className="flex items-center">
								<Input
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
									placeholder="Confirm password"
									{...field}
								/>
								<button
									type="button"
									className="absolute right-3 text-gray-500"
									onClick={() =>
										setShowConfirmPassword(
											!showConfirmPassword
										)
									}
								>
									{showPassword ? (
										<EyeOff size={20} />
									) : (
										<Eye size={20} />
									)}
								</button>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Create account</Button>
			</form>
		</Form>
	);
}
