import path from 'node:path';
import fs from 'node:fs/promises';
import { getPlaiceholder } from 'plaiceholder';
import { PlaceholderData } from '@/types/shared';

export const fetchImageWithPlaceholder = async (src: string, isRemote?: boolean): Promise<PlaceholderData> => {

	let buffer;
	if (isRemote) {
		buffer = await fetch(src).then(async (res) => {
			return Buffer.from(await res.arrayBuffer());
		})
	} else {
		buffer = await fs.readFile(path.join('./public', src));
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