import { http, HttpResponse } from "msw";
import { personDetailsData, personsData } from "../mock-data/person";

export const handlers = [
	http.get('https://api.themoviedb.org/3/person/popular', ({ request }) => {
		const page = new URL(request.url).searchParams.get('page');

		if (Number(page) < 1) {
			return HttpResponse.json({
				"success": false,
				"status_code": 22,
				"status_message": "Invalid page: Pages start at 1 and max at 500. They are expected to be an integer."
			}, { status: 404, statusText: 'Not Found' });
		}

		return HttpResponse.json(personsData);
	}),

	http.get('https://api.themoviedb.org/3/person/:id', ({ params }) => {
		if (Number(params.id) < 1) {
			return HttpResponse.json({
				success: false,
				status_code: 6,
				status_message: 'Invalid id: The pre-requisite id is invalid or not found.'
			}, { status: 404, statusText: 'Not Found' });
		}

		return HttpResponse.json(personDetailsData);
	}),
];