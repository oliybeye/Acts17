import { createStyles, WithStyles, withStyles } from '@mui/styles';
import * as React from 'react';
import NewsFeed from './feed/NewsFeed';
import SourcesFeed from './sources/SourceFeed';

const styles = () => {
    return createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column'
        },
        content: {
            display: 'flex',
            flexDirection: 'row'
        }
    });
}

interface HomeProps extends WithStyles<typeof styles> {

}

function Home({ classes }: HomeProps) {
    return (
        <div className={classes.root}>
            dfkds
            <div className={classes.content}>
                <NewsFeed />
                <SourcesFeed />
            </div>
        </div>
    )
}

export default withStyles(styles)(Home);