import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface OtherJobViewProps {
	setJobDescription: (description: string) => void;
	setLoading: (loading: boolean) => void;
	setChoseOther: (choseOther: boolean) => void;
	jobSelected: string;
}

export default function OtherJobView({
	setJobDescription,
	setLoading,
	setChoseOther,
	jobSelected,
}: OtherJobViewProps) {
	const callAPI = async () => {
		const response = await fetch("/api/is_valid_job", {
			method: "GET",
		});
		const data = await response.json();

		console.log(data);
	};

	return (
		<div className="max-w-xl mx-auto p-6 flex flex-col gap-6">
			<div className="flex flex-col gap-2 chose-other">
				<label className="text-sm font-semibold">Job Title</label>
				<Input type="text" />
			</div>
			<div className="flex flex-col gap-2 chose-other">
				<label className="text-sm font-semibold">Description</label>
				<Textarea
					value={jobSelected}
					onChange={(e) => setJobDescription(e.target.value)}
				/>
			</div>
			<Button
				onClick={() => {
					// if (jobSelected === "") {
					// 	toast.error("Make sure to enter a job", {
					// 		duration: 3000,
					// 	});

					// 	return;
					// }

					// send to the back
					callAPI();
				}}
				className="chose-other"
			>
				Start Interview
			</Button>
			<Button
				variant="secondary"
				onClick={() => setChoseOther(false)}
				className="chose-other"
			>
				Change
			</Button>
		</div>
	);
}
