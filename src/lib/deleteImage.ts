import { join } from 'path';
import { unlink } from 'fs/promises';

export async function deleteImage(imagePath: string): Promise<void> {
  const fullImagePath = join(process.cwd(), 'public', imagePath);
  try {
    await unlink(fullImagePath);
    console.log(`Deleted image: ${fullImagePath}`);
  } catch (error) {
    console.error(`Error deleting image at ${fullImagePath}:`, error);
  }
}
