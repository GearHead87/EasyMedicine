//@ts-nocheck
'use client';
import React, { useState } from 'react';
import { useGetUsersQuery, useDeleteUserMutation } from '@/redux/services/userApi';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

interface User {
	id: string;
	name: string;
	email: string;
	image: string;
}

interface Pagination {
	totalPages: number;
}

interface UsersResponse {
	users: User[];
	pagination: Pagination;
}

const ManageUsers = () => {
	const { data: session, status } = useSession();
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
	const limit = 10;

	const { data, error, isLoading, refetch } = useGetUsersQuery({ search, page, limit });
	const [deleteUser] = useDeleteUserMutation();

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	if (!session || session?.user?.role !== 'ADMIN') {
		return <div>Unauthorized access.</div>;
	}

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading users</div>;

	const { users, pagination } = data!;
	const totalPages = pagination?.totalPages;

	// const handleDelete = async (id: string) => {
	// 	await deleteUser(id);
	// 	refetch();
	// };

	const handleDelete = async () => {
		if (userIdToDelete) {
			await deleteUser(userIdToDelete);
			setUserIdToDelete(null);
			refetch();
			toast("User Deleted")
		}
	};

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Manage Users</h1>
			<div className="mb-4">
				<Input
					type="text"
					placeholder="Search users..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<Table>
				<TableCaption>A list of all users.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[200px]">Profile Picture</TableHead>
						<TableHead className="w-[100px]">Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user: User) => (
						<TableRow key={user.id}>
							<TableCell>
								<Image
									src={user.image}
									alt="profile pic"
									className="rounded-lg object-cover"
									width={300}
									height={300}
								/>
							</TableCell>
							<TableCell className="font-medium">{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell className="text-right">
								{/* <Button
									variant="ghost"
									onClick={() => console.log('Edit', user.id)}
								>
									Edit
								</Button> */}
								{/* <Button variant="destructive" onClick={() => handleDelete(user.id)}>
									Delete
								</Button> */}
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button
											variant="destructive"
											onClick={() => setUserIdToDelete(user.id)}
										>
											Delete
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
											<AlertDialogDescription>
												Are you sure you want to delete this user? This
												action cannot be undone.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel
												onClick={() => setUserIdToDelete(null)}
											>
												Cancel
											</AlertDialogCancel>
											<AlertDialogAction onClick={handleDelete}>
												Delete
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Pagination>
				<PaginationContent>
					<PaginationPrevious
						onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
						// disabled={(page === 1)}
					/>
					{Array.from({ length: totalPages }, (_, index) => (
						/* @ts-ignore */
						<PaginationItem key={index} active={index + 1 === page}>
							<PaginationLink onClick={() => setPage(index + 1)}>
								{index + 1}
							</PaginationLink>
						</PaginationItem>
					))}
					<PaginationNext
						onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
						/* @ts-ignore */
						disabled={page === totalPages}
					/>
				</PaginationContent>
			</Pagination>
		</div>
	);
};

export default ManageUsers;
