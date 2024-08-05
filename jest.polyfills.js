import { TextDecoder, TextEncoder } from 'util';
import { ReadableStream, TransformStream } from 'stream/web';
import { performance } from 'perf_hooks';

Object.defineProperties(globalThis, {
	TextDecoder: { value: TextDecoder },
	TextEncoder: { value: TextEncoder },
	ReadableStream: { value: ReadableStream },
	TransformStream: { value: TransformStream },
	performance: { value: performance },
});

import { Blob, File } from 'buffer';
import { fetch, Headers, FormData, Request, Response } from 'undici';
import { clearImmediate } from 'timers';

Object.defineProperties(globalThis, {
	fetch: { value: fetch, writable: true },
	Blob: { value: Blob },
	File: { value: File },
	Headers: { value: Headers },
	FormData: { value: FormData },
	Request: { value: Request },
	Response: { value: Response },
	clearImmediate: { value: clearImmediate },
});