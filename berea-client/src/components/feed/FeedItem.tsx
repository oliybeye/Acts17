import { ListItem, ListItemButton, Paper } from "@mui/material";
import { WithStyles, createStyles, withStyles } from "@mui/styles";
import Item from "./Item";
import { NavProp } from "./Feed";
import { Author, News } from "../../graphql";

const styles = () => {
  return createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "fit-content",
      paddingBottom: "1rem",
      height: "max-content",
    },
  });
};

interface FeedItemProps extends WithStyles<typeof styles>, NavProp {
  id: string;
  title: string;
  date: string;
  url: string;
  imgUrl: string;
  author?: Author[];
  likes: number;
  dislikes: number;
  source: string;
  sourceSite: string;
}

function FeedItem({
  classes,
  id,
  setThreadId,
  title,
  date,
  url,
  imgUrl,
  author,
  likes,
  dislikes,
  source,
  sourceSite,
}: FeedItemProps) {
  return (
    <div className={classes.root}>
      <ListItem>
        <Paper className={classes.paper}>
          <Item
            id={id}
            imgUrl={imgUrl}
            title={title}
            url={url}
            date={date}
            author={author}
            likes={likes}
            dislikes={dislikes}
            source={source}
            sourceSite={sourceSite}
            isForFeed
            onCommentClick={() => setThreadId!(id)}
          />
        </Paper>
      </ListItem>
    </div>
  );
}

export default withStyles(styles)(FeedItem);
