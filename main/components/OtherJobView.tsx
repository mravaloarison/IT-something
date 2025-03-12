import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface OtherJobViewProps {
	setJobDescription: (description: string) => void;
	setLoading: (loading: boolean) => void;
	setChoseOther: (choseOther: boolean) => void;
}

export default function OtherJobView({
	setJobDescription,
	setLoading,
	setChoseOther,
}: OtherJobViewProps) {
	return (
		<div className="max-w-xl mx-auto p-6 flex flex-col gap-6">
			<div className="flex flex-col gap-2 chose-other">
				<label className="text-sm font-semibold">Job Title</label>
				<Input type="text" />
			</div>
			<div className="flex flex-col gap-2 chose-other">
				<label className="text-sm font-semibold">Description</label>
				<Textarea onChange={(e) => setJobDescription(e.target.value)} />
			</div>
			<Button
				onClick={() => {
					setLoading(true);
					setTimeout(() => {
						setLoading(false);
					}, 2000);
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
