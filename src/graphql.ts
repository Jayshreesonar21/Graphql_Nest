
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    profile?: Nullable<string>;
    isDeleted: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface IQuery {
    index(): string | Promise<string>;
    users(): User[] | Promise<User[]>;
    findUserById(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
