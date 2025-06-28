import {Study} from '@/shared/types/Study';
import {StudyCard} from '@/features/studies/StudyCard';

export function StudiesList({studies}: {studies: Study[]}) {
	return (
		<div>
			<ul className="list-none flex flex-col gap-3 ">
				{studies.map((study) => (
					<li key={study.nctId}>
						<StudyCard study={study} />
					</li>
				))}
			</ul>
		</div>
	);
}