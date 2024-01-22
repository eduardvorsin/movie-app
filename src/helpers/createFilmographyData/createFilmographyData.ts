import { CreditsResponse, PersonCredit } from '@/services/types';
import { Department } from '@/types/shared';

type Filmography = Record<Lowercase<Department>, PersonCredit[]>;
export const createFilmographyData = (
	credits: CreditsResponse<
		PersonCredit,
		PersonCredit & { department: Department }
	>
): Filmography => {
	const filmography = {} as Filmography;
	filmography.actors = [...credits.cast];

	credits.crew.forEach((item) => {
		const department = item.department.toLowerCase() as Lowercase<Department>;

		if (!Array.isArray(filmography[department])) {
			filmography[department] = [item];
		} else {
			filmography[department].push(item);
		}
	});

	return filmography;
};