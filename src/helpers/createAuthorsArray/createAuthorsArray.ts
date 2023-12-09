import { CrewCredit } from '@/services/fetchMovie/fetchMovie';

export const createAuthorsArray = (authors: CrewCredit[]): CrewCredit[] => {
	const departments = ['Production', 'Writing', 'Directing'];
	const jobs = ['Director', 'Producer', 'Screenplay', 'Novel', 'Characters', 'Story', 'Writer'];

	return authors.filter(({ known_for_department, job }) => {
		return departments.includes(known_for_department) && jobs.includes(job);
	});
};