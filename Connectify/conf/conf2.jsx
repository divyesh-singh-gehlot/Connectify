import { Client, Databases, Account } from "appwrite";
import conf from "./conf1";

const client = new Client();

client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.ProjectId);

export const databases = new Databases(client);
export const account = new Account(client);


export default client