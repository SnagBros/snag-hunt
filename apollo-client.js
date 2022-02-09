import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = ()=>{
    const spaceID = process.env.NEXT_PUBLIC_SPACE_ID;
    const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
    return new ApolloClient({
        uri: `https://graphql.contentful.com/content/v1/spaces/${spaceID}/environments/master`,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`},
        cache: new InMemoryCache(),
    });
  }
export default createApolloClient;