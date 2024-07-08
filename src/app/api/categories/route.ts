import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
	try {
		const { name, parentId } = await req.json();

		const category = await prisma.category.create({
			data: {
				name,
				parentId,
			},
		});

		return NextResponse.json(category, { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
	}
}

export async function GET(req: NextRequest) {
	try {
		const categories = await prisma.category.findMany({
			include: {
				subcategories: true,
			},
		});

		return NextResponse.json(categories, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
	}
}


export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  try {
    // Delete category and its subcategories recursively
    await prisma.$transaction(async (prisma) => {
      const deleteCategoryRecursively = async (categoryId: string) => {
        const subcategories = await prisma.category.findMany({
          where: { parentId: categoryId },
        });

        for (const subcategory of subcategories) {
          await deleteCategoryRecursively(subcategory.id);
        }

        await prisma.category.delete({
          where: { id: categoryId },
        });
      };

      await deleteCategoryRecursively(id);
    });

    return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}

