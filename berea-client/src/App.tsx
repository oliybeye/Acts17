import React from 'react';
import { createStyles, withStyles, WithStyles } from '@mui/styles';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Home from './components/Home';

const styles = () => {
  return createStyles({
    root: {
      display: 'grid',
      backgroundColor: 'lightgray'
    }
  });
}
interface HomeProps extends WithStyles<typeof styles> {
}

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

function App({ classes }: HomeProps) {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}

export default withStyles(styles)(App);
