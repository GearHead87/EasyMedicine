import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import axios from 'axios';

export const imageUpload = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const { data } = await axios.post<{ data: { display_url: string } }>(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_API_URL}`,
      formData
    );
    return data.data.display_url;
  } catch (error) {
    console.error('Image upload failed:', error);
    throw new Error('Failed to upload image');
  }
};