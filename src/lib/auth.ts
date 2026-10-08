import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
const mongodbUrl = process.env.MONGODB_URL;

if (!mongodbUrl) {
  throw new Error("MONGODB_URL is not defined");
}

const client = new MongoClient(mongodbUrl);
const db = client.db('bangla-news-24');

export const auth = betterAuth({
emailAndPassword: { 
    enabled: true,
    requireEmailVerification: false, // Optional: require email verification for sign-up

  },
 
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_oAUTH_CLIENT_SECRET as string, 
        },
        github: { 
            clientId: process.env.GITHUB_OAUTH_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET as string, 
        }, 
    },
  database: mongodbAdapter(db, {
    client,
  }),
});