import NextAuth from "next-auth";
import AzureProvider from "next-auth/providers/azure-ad";

export const authOptions = {
  providers: [
    AzureProvider({
      clientId: process.env.AZURE_CLIENT_ID,
      clientSecret: process.env.AZURE_CLIENT_SECRET,
      tenantId: process.env.AZURE_TENANT_ID
    })
  ]
};

export default NextAuth(authOptions);
