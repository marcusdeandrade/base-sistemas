import { Client, Databases, ID, Models } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6823ffcd00224ab7a405');

const databases = new Databases(client);
const DATABASE_ID = '68240fd9002f4552cb8b';
const COLLECTION_ID = 'users';

async function setupDatabase() {
    try {
        // Check if database exists, if not create it
        try {
            await databases.get(DATABASE_ID);
            console.log('Database already exists');
        } catch (error) {
            console.log('Creating database...');
            await databases.create(DATABASE_ID, 'Users Database');
        }

        // Check if collection exists, if not create it
        try {
            await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
            console.log('Collection already exists');
        } catch (error) {
            console.log('Creating collection...');
            await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    name: 'Sample User',
                    email: 'sample@example.com',
                    phone: '123456789',
                    userId: 'sample-user-id'
                }
            );
        }

        console.log('Database setup completed successfully!');
    } catch (error) {
        console.error('Error setting up database:', error);
    }
}

setupDatabase();
