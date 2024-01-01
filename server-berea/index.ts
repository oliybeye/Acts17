import { ApolloServer } from "apollo-server";
import TypeDefs from "./models/graphql";
import Resolvers from "./resolvers";

export const createContext = (req: Request) => {
  return { request: req };
};

const port = 4000; //process.env.port;
const server = new ApolloServer({
  typeDefs: TypeDefs,
  resolvers: Resolvers,
  context: createContext,
});

server
  .listen({ port: port })
  .then((s) => {
    console.log(`🚀 Server Ready at ${s.url}`);
  })
  .catch(console.error);
