import { Client, Account, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6823ffcd00224ab7a405');

export const account = new Account(client);
export const databases = new Databases(client);

// IDs do banco de dados e coleção
export const DATABASE_ID = '68240fd9002f4552cb8b';
export const USERS_COLLECTION_ID = 'users';

// Interface para o usuário
export interface User {
    name: string;
    email: string;
    password: string;
    phone?: string;
} 