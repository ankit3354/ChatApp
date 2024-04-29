import { Client, Databases, Account } from "appwrite";

export const PROJECT_ID = "662cd6af001288f95c9a";
export const DATABASES_ID = "662cd6cc00076498fc87";
export const COLLECTION_MESSAGE_ID = "662cd6dc0010563f5885";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("662cd6af001288f95c9a");

export const databases = new Databases(client);
export const account = new Account(client);

export default client;
