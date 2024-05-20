import { Client, Databases, Account } from "appwrite";

export const appwriteProjectURL =
  import.meta.env.VITE_APPWRITE_URL || "https://cloud.appwrite.io/v1";

export const PROJECT_ID =
  import.meta.env.VITE_APPWRITE_PROJECT_ID || "662cd6af001288f95c9a";

export const DATABASES_ID =
  import.meta.env.VITE_APPWRITE_DATABASES_ID || "662cd6cc00076498fc87";

export const COLLECTION_MESSAGE_ID =
  import.meta.env.VITE_APPWRITE_COLLECTION_MESSAGE_ID || "662cd6dc0010563f5885";

const client = new Client()
  .setEndpoint(appwriteProjectURL)
  .setProject(PROJECT_ID);

export const databases = new Databases(client);
export const account = new Account(client);

export default client;
