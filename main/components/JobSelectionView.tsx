import { Button } from "./ui/button";

interface JobSelectionViewProps {
	handleJobSelection: (job: string) => void;
	handleOtherSelection: () => void;
}

const jobsSuggestions = [
	"Software Engineer",
	"Data Scientist",
	"Product Manager",
	"UX Designer",
	"FullStack Developer",
];

export default function JobSelectionView({
	handleJobSelection,
	handleOtherSelection,
}: JobSelectionViewProps) {
	return (
		<div className="max-w-xl mx-auto p-6">
			<h1 className="text-center p-6 text-2xl font-semibold">
				What field do you want to practice for?
			</h1>
			<div className="flex flex-col gap-6 pt-6">
				{jobsSuggestions.map((job) => (
					<Button
						key={job}
						variant="outline"
						size="lg"
						className="job"
						onClick={() => handleJobSelection(job)}
					>
						{job}
					</Button>
				))}
				<Button
					variant="outline"
					size="lg"
					onClick={handleOtherSelection}
					className="job"
				>
					Other
				</Button>
			</div>
		</div>
	);
}
