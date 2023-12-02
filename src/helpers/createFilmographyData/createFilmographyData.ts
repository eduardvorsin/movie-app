import { ActorCredit, ActorCredits } from '@/services/fetchActor/fetchActor';
import { Department } from '@/types/shared';

type Filmography = Record<Lowercase<Department>, ActorCredit[]>;
export const createFilmographyData = (credits: ActorCredits): Filmography => {
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