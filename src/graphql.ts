
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AddUserArgs {
    name: string;
    email: string;
    password: string;
    profile?: Nullable<string>;
}

export interface UpdateUserArgs {
    name?: Nullable<string>;
    email?: Nullable<string>;
    profile?: Nullable<string>;
}

export interface AddPostArgs {
    userId: string;
    title: string;
    description?: Nullable<string>;
}

export interface Post {
    id: number;
    title: string;
    description?: Nullable<string>;
    user: User;
    isDeleted: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    profile?: Nullable<string>;
    posts: Nullable<Post>[];
    isDeleted: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface IQuery {
    index(): string | Promise<string>;
    users(): User[] | Promise<User[]>;
    findUserById(id: number): Nullable<User> | Promise<Nullable<User>>;
    posts(): Post[] | Promise<Post[]>;
    findPostById(id: number): Nullable<Post> | Promise<Nullable<Post>>;
}

export interface IMutation {
    deleteUserById(id: number): string | Promise<string>;
    addUser(addUserArgs: AddUserArgs): User | Promise<User>;
    updateUser(id: number, updateUserArgs: UpdateUserArgs): string | Promise<string>;
    addPost(addPostArgs: AddPostArgs): Post | Promise<Post>;
}

export type DateTime = any;
type Nullable<T> = T | null;
