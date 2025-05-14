import { ID } from 'appwrite';
import { account, databases, DATABASE_ID, USERS_COLLECTION_ID, User } from './appwrite';

export async function createUser(userData: User) {
    try {
        // Criar conta do usuário
        const newAccount = await account.create(
            ID.unique(),
            userData.email,
            userData.password,
            userData.name
        );

        // Criar documento do usuário no banco
        const newUser = await databases.createDocument(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            ID.unique(),
            {
                name: userData.name,
                email: userData.email,
                phone: userData.phone || '',
                userId: newAccount.$id
            }
        );

        return { account: newAccount, user: newUser };
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
} 