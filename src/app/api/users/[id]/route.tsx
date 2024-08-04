import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { deleteImage } from '@/lib/deleteImage';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { id } = params;

        // Fetch the user to get the profile picture URL
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Delete the profile picture if it exists
        // if (user.image) {
        //     await deleteImage(user.image);
        // }

        // Delete the user
		await prisma.user.delete({
			where: { id },
		});

		return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error deleting user:', error);
		return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
	}
}
