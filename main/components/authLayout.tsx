import { PawPrint } from "lucide-react";
import AuthenticationView from "./auth";

interface SignUpPageProps {
	args: {
		signup: boolean;
	};
}

export default function AuthSignUp({ args }: SignUpPageProps) {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gray-100 p-6 md:p-10 dark:bg-gray-800">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<a
					href="#"
					className="flex items-center gap-2 self-center font-medium"
				>
					<div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900">
						<PawPrint className="size-4" />
					</div>
					By Rava
				</a>
				{<AuthenticationView signup={args.signup} />}
				<div className="text-balance text-center text-xs text-gray-500 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-gray-900  dark:text-gray-400 dark:[&_a]:hover:text-gray-50">
					By clicking continue, you agree to our{" "}
					<a href="/">Terms of Service</a> and{" "}
					<a href="/">Privacy Policy</a>.
				</div>
			</div>
		</div>
	);
}
