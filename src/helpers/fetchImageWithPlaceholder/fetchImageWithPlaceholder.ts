import path from 'node:path';
import { promises as fs } from 'fs';
import { getPlaiceholder } from 'plaiceholder';
import { PlaceholderData } from '@/types/shared';

const imageFormatRegexp = /\.(jpg|jpeg|png|gif|bmp|svg|webp|avif)$/;

export const fetchImageWithPlaceholder = async (src: string, isRemote?: boolean): Promise<PlaceholderData | null> => {
	if (!src.match(imageFormatRegexp)) return null;

	let buffer;
	if (isRemote) {
		buffer = await fetch(src).then(async (res) => {
			return Buffer.from(await res.arrayBuffer());
		});
	} else {
		buffer = await fs.readFile(path.join(process.cwd(), '/public', src));
	}

	const {
		metadata: { width, height },
		color,
		base64,
	} = await getPlaiceholder(buffer, { size: 10 });

	return {
		img: { src, height, width },
		color,
		base64,
	}
}