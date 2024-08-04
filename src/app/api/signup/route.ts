import mime from 'mime';
import { join } from 'path';
import { stat, mkdir, writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashSync } from 'bcrypt';
import { imageUpload } from '@/lib/utils';

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const name = (formData.get('name') as string) || null;
	const email = (formData.get('email') as string) || null;
	const password = (formData.get('password') as string) || null;
	const image = (formData.get('image') as File) || null;

	console.log(name, email, password, image);

	if (!name || !email || !password || !image) {
		return NextResponse.json({ error: 'Fields are not provided' }, { status: 400 });
	}

	const isExist = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});
	if (isExist) {
		return NextResponse.json({ message: 'User Already Exist' }, { status: 409 });
	}

	// const buffer = Buffer.from(await image.arrayBuffer());
	// const relativeUploadDir = `/uploads/${new Date(Date.now())
	// 	.toLocaleDateString('id-ID', {
	// 		day: '2-digit',
	// 		month: '2-digit',
	// 		year: 'numeric',
	// 	})
	// 	.replace(/\//g, '-')}`;

	// const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

	// try {
	// 	await stat(uploadDir);
	// } catch (e: any) {
	// 	if (e.code === 'ENOENT') {
	// 		// This is for checking the directory is exist (ENOENT : Error No Entry)
	// 		await mkdir(uploadDir, { recursive: true });
	// 	} else {
	// 		console.error('Error while trying to create directory when uploading a file\n', e);
	// 		return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
	// 	}
	// }

	// try {
	// 	const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
	// 	const filename = `${image.name.replace(
	// 		/\.[^/.]+$/,
	// 		''
	// 	)}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
	// 	await writeFile(`${uploadDir}/${filename}`, buffer);
	// 	const fileUrl = `${relativeUploadDir}/${filename}`;
	try {
		// Save to image to imgBB 
		const fileUrl = await imageUpload(image);

		// Save to database

		const hashedPassword = hashSync(password, 12);
		const result = await prisma.user.create({
			data: {
				name: name,
				email: email,
				password: hashedPassword,
				image: fileUrl,
				role: 'USER',
			},
		});

		console.log('User Created', result);

		return NextResponse.json({ message: 'User Created Successfully' });
	} catch (e) {
		console.error('Error while trying to upload a file\n', e);
		return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
	}
}
