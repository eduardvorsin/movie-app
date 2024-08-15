import { handlers as movieHandlers } from './movie';
import { handlers as personHandlers } from './person';
import { handlers as tvSeriesHandlers } from './tvSeries';

export const handlers = [
	...movieHandlers,
	...personHandlers,
	...tvSeriesHandlers,
];