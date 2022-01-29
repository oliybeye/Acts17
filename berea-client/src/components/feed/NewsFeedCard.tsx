import { Avatar, CardContent, CardHeader, Typography } from '@mui/material';
import Card from '@mui/material/Card/Card';
import { createStyles, withStyles, WithStyles } from '@mui/styles';
import { blue } from '@mui/material/colors';

const style = () => {
    return createStyles({
        root: {
            paddingTop: '12px'
        },
        avatar: {
            cursor: 'pointer'
        },
        link: {
            textDecoration: 'none'
        }
    });
}

interface FeedCardProps extends WithStyles<typeof style> {
    date: string;
    newsTitle: string;
    source: string;
    sourceSite: string;
    newsUrl: string;
}

function FeedCard({ classes, source, sourceSite, newsUrl, newsTitle, date }: FeedCardProps) {
    return (
        <div className={classes.root}>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar} sx={{ bgcolor: blue[600] }} src={sourceSite}>
                            <a href={sourceSite} className={classes.link}>{source}</a>
                        </Avatar>
                    }
                    subheader={date}
                />
                <CardContent>
                    <Typography variant="h5">
                        <a href={newsUrl} className={classes.link}>
                            {newsTitle}
                        </a>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default withStyles(style)(FeedCard);