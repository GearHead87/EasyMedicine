import mime from 'mime';
import { join } from 'path';
// import { stat, mkdir, writeFile } from 'fs/promises';
import { promises as fs } from 'fs';
const {stat, mkdir, writeFile}  = fs
import { NextRequest, NextResponse } from 'next/server';

export async function uploadImage(image) {
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
	} catch (e: any) {
		if (e.code === 'ENOENT') {
			// This is for checking the directory is exist (ENOENT : Error No Entry)
			await mkdir(uploadDir, { recursive: true });
		} else {
			console.error('Error while trying to create directory when uploading a file\n', e);
			return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
		}
	}

	try {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		const filename = `${image.name.replace(
			/\.[^/.]+$/,
			''
		)}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
		await writeFile(`${uploadDir}/${filename}`, buffer);
		const fileUrl = `${relativeUploadDir}/${filename}`;
		return fileUrl;
	} catch (e) {
		console.log("Error Uploading Photo",e);
	}
}
