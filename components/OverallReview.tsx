import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface OverallReview {
	strengths: string;
	areas_for_improvement: string;
	final_recommendation: string;
}

interface OverallReviewProps {
	overallReview: OverallReview;
}

export function OverallReview({ overallReview }: OverallReviewProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl font-semibold">
					Overall Review
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div>
						<h3 className="text-lg font-medium">Strengths</h3>
						<p className="text-sm text-gray-700">
							{overallReview.strengths}
						</p>
					</div>
					<div>
						<h3 className="text-lg font-medium">
							Areas for Improvement
						</h3>
						<p className="text-sm text-gray-700">
							{overallReview.areas_for_improvement}
						</p>
					</div>
					<div>
						<h3 className="text-lg font-medium">
							Final Recommendation
						</h3>
						<p className="text-sm text-gray-700">
							{overallReview.final_recommendation}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
