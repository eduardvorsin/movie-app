import { PersonCredit, PersonCredits } from '@/services/fetchPerson/fetchPerson';
import { Department } from '@/types/shared';

type Filmography = Record<Lowercase<Department>, PersonCredit[]>;
export const createFilmographyData = (credits: PersonCredits): Filmography => {
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