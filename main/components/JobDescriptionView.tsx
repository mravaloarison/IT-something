import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

interface JobDescriptionViewProps {
	JobSelected: string;
	setJobDescription: (description: string) => void;
	setLoading: (loading: boolean) => void;
	setJobSelected: (job: string) => void;
	JobDescription: string;
}

export default function JobDescriptionView({
	JobSelected,
	setJobDescription,
	setLoading,
	setJobSelected,
	JobDescription,
}: JobDescriptionViewProps) {
	const callAPI = async () => {
		const formData = new FormData();
		formData.append("q", JobSelected);

		const response = await fetch("/api/is_valid_job", {
			method: "POST",
			body: formData,
		});

		try {
			const data = await response.json();

			if (data.res) {
				toast.success("Job is valid", {
					duration: 3000,
				});

				// put in local storage
				localStorage.setItem("job", JobSelected);
				localStorage.setItem("description", JobDescription);

				window.location.href = "/interview";
			} else {
				toast.warning("Please enter a valid job", {
					duration: 3000,
				});
			}
		} catch {
			toast.error("Please try again, something went wrong", {
				duration: 3000,
			});
		}
	};

	return (
		<div className="max-w-xl mx-auto p-6 flex flex-col gap-6">
			<div className="flex flex-col gap-2 job-selected">
				<label className="text-sm font-semibold">Job Title</label>
				<p className="text-lg font-semibold underline decoration-dashed">
					{JobSelected}
				</p>
			</div>
			<div className="flex flex-col gap-2 job-selected">
				<label className="text-sm font-semibold">
					Description (optional)
				</label>
				<Textarea onChange={(e) => setJobDescription(e.target.value)} />
			</div>
			<Button
				onClick={() => {
					setLoading(true);

					callAPI();
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
