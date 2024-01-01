import { List, ListItem, Paper, Typography } from "@mui/material";
import { WithStyles, createStyles, withStyles } from "@mui/styles";
import { CommentType } from "./Thread";

const styles = () => {
  return createStyles({
    root: {},
    commentSection: {},
    aComment: {},
    aInfoComment: {
      display: "flex",
      flexDirection: "row",
    },
    newComment: {},
    user: {
      padding: '0.5rem'
    },
    date: {
      padding: '0.5rem'
    },
    theComment: {
      padding: '0.5rem',
    }
  });
};

interface CommentsProp extends WithStyles<typeof styles> {
  commentId: string;
  comments: CommentType[];
}

function Comments({ classes, comments }: CommentsProp) {
  return (
    <div className={classes.root}>
      <div className={classes.commentSection}>
        <List>
          {comments.map((comment) => {
            return (
              <ListItem>
                <Paper>
                  <div className={classes.aComment}>
                    <div className={classes.aInfoComment}>
                      <Typography className={classes.user}>User</Typography>
                      <Typography className={classes.date}>
                        {comment.timeStamp.toDateString()}
                      </Typography>
                    </div>
                    <Typography className={classes.theComment}>{comment.comment}</Typography>
                  </div>
                </Paper>
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
}

export default withStyles(styles)(Comments);
