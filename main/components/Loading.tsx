import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="flex gap-6 justify-center items-center">
			{Array.from({ length: 3 }).map((_, i) => (
				<Skeleton key={i} className="w-6 h-6" />
			))}
		</div>
	);
}
