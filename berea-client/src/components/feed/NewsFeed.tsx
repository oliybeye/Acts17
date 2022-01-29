import * as React from 'react';
import NewsFeedCard from './NewsFeedCard';
import { createStyles, withStyles, WithStyles } from '@mui/styles';
import { gql } from '@apollo/client';
import { useNewsQuery } from '../../graphql';

gql`
query News {
  news {
    newsUrl
    source
    sourceSite
    newsTitle
  }
}
`

const styles = () => {
    return createStyles({
        root: {
            display: 'flex',
            flexDirection: 'row',
            gridColumn: '2/3'
        },

        feed: {
            width: '50%',
            height: '100%',
            paddingTop: '12px'
        }
    });
}

interface FeedProps extends WithStyles<typeof styles> {

};

function Feed({ classes }: FeedProps) {
    // const [data, setData] = React.useState<FeedType[]>([]);
    const { data } = useNewsQuery();
    console.log(data);
    return (
        <div className={classes.root}>
            <div className={classes.feed}>
                {data?.news?.map((news, i) =>
                    <NewsFeedCard
                        key={i}
                        date={new Date().toString()}
                        newsTitle={news?.newsTitle ?? ' '}
                        source={news?.source ?? ''}
                        sourceSite={news?.sourceSite ?? ''}
                        newsUrl={news?.newsUrl ?? ''}
                    />)
                }
            </div>
        </div>
    )
}

export default withStyles(styles)(Feed);
