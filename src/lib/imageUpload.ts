import mime from 'mime';
import { join } from 'path';
import { stat, mkdir, writeFile } from 'fs/promises';

type ImageUploadProps = {
	image: File;
};

export async function imageUpload({ image }: ImageUploadProps): Promise<string | null> {
	const buffer = Buffer.from(await image.arrayBuffer());
	const relativeUploadDir = `/uploads/${new Date(Date.now())
		.toLocaleDateString('id-ID', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		})
		.replace(/\//g, '-')}`;

	const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

	try {
		await stat(uploadDir);
	} catch (error: any) {
		if (error.code === 'ENOENT') {
			// Directory does not exist, create it
			await mkdir(uploadDir, { recursive: true });
		} else {
			console.error('Error while checking/creating directory:\n', error);
			return null;
		}
	}

	try {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		const filename = `${image.name.replace(
			/\.[^/.]+$/,
			''
		)}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
		const filePath = join(uploadDir, filename);
		await writeFile(filePath, buffer);

		// const fileUrl = join(relativeUploadDir, filename);
		// return fileUrl;

		const fileUrl = join(relativeUploadDir, filename).replace(/\\/g, '/');
		return fileUrl.startsWith('/') ? fileUrl : `/${fileUrl}`;
	} catch (error) {
		console.error('Error while writing file:\n', error);
		return null;
	}
}
