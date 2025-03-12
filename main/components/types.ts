export interface JobSelectionViewProps {
	handleJobSelection: (job: string) => void;
	handleOtherSelection: () => void;
}

export interface JobDescriptionViewProps {
	JobSelected: string;
	setJobDescription: (description: string) => void;
	setLoading: (loading: boolean) => void;
	setJobSelected: (job: string) => void;
}

export interface OtherJobViewProps {
	setJobDescription: (description: string) => void;
	setLoading: (loading: boolean) => void;
	setChoseOther: (choseOther: boolean) => void;
}