import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface JobDescriptionViewProps {
	JobSelected: string;
	setJobDescription: (description: string) => void;
	setLoading: (loading: boolean) => void;
	setJobSelected: (job: string) => void;
}

export default function JobDescriptionView({
	JobSelected,
	setJobDescription,
	setLoading,
	setJobSelected,
}: JobDescriptionViewProps) {
	return (
		<div className="max-w-xl mx-auto p-6 flex flex-col gap-6">
			<div className="flex flex-col gap-2 job-selected">
				<label className="text-sm font-semibold">Job Title</label>
				<p className="text-lg font-semibold underline decoration-dashed">
					{JobSelected}
				</p>
			</div>
			<div className="flex flex-col gap-2 job-selected">
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
				className="job-selected"
			>
				Start Interview
			</Button>
			<Button
				variant="secondary"
				onClick={() => setJobSelected("")}
				className="job-selected"
			>
				Change
			</Button>
		</div>
	);
}
