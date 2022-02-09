import '../styles/globals.css'
import { ApolloProvider } from "@apollo/client";
import createApploClient from "../apollo-client";

function MyApp({ Component, pageProps }) {
    const appoloClient = createApploClient()
    return (
      <ApolloProvider client={appoloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
export default MyApp
