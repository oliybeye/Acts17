import { WithStyles, createStyles, withStyles } from "@mui/styles";
import Item from "./Item";
import { NavProp } from "./Feed";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { News, useCommentsQuery } from "../../graphql";
import Comments from "./Comments";
import { TextField } from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import React from "react";
import { gql, useMutation } from "@apollo/client";

gql`
  query Comments($id: ID) {
    comments(input: { id: $id }) {
      comment
      id
      timeStamp
      userId
    }
  }
`;

const COMMENT = gql`
  mutation Comment($comment: String, $id: String, $userId: String) {
    comment(input: { comment: $comment, id: $id, userId: $userId })
  }
`;

const styles = () => {
  return createStyles({
    root: {
      padding: "0.5rem",
      display: "flex",
      flexDirection: "row",
      "@media (max-width: 30rem)": {
        flexDirection: "column",
      },
    },
    content: {},
    commentSection: {
      width: "100%",
    },
    comments: {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
  });
};

export type CommentType = {
  comment: string;
  id: string;
  timeStamp: Date;
  userId: string;
};

interface ThreadProp extends WithStyles<typeof styles>, NavProp, News {
  id: string;
  title: string;
  url: string;
  imgUrl: string;
  date: string;
  likes: number;
  dislikes: number;
  source: string;
  sourceSite: string;
}

function Thread({
  onBack,
  title,
  date,
  url,
  imgUrl,
  likes,
  dislikes,
  source,
  sourceSite,
  classes,
  id,
}: ThreadProp) {
  const [comment, setComment] = React.useState("");
  const [commentMutation] = useMutation(COMMENT);
  const { data, loading, refetch } = useCommentsQuery({
    variables: {
      id: id,
    } 
  });

  const handleOnCommentSubmission = () => {
    commentMutation({
      variables: {
        comment: comment,
        id: id,
        userId: "userId",
      },
    });
    setComment("");
    refetch();
  };

  if (loading) {
    return <div>loading</div>;
  }

  const comments =
    data && data.comments
      ? data.comments.map((comment) => {
          return {
            comment: comment?.comment,
            id: comment?.id,
            timeStamp: new Date(comment?.timeStamp ?? ""),
            userId: comment?.userId,
          } as CommentType;
        })
      : [];

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Button onClick={() => onBack!()}>
          <KeyboardBackspaceIcon />
        </Button>
        <Item
          imgUrl={imgUrl}
          title={title}
          url={url}
          date={date}
          likes={likes}
          dislikes={dislikes}
          source={source}
          sourceSite={sourceSite}
          id={id}
        />
        <div className={classes.commentSection}>
          <TextField
            fullWidth
            placeholder={`express your opinion here...`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            InputProps={{
              endAdornment: (
                <Button onClick={() => handleOnCommentSubmission()}>
                  <AddCommentIcon />
                </Button>
              ),
            }}
          />
        </div>
      </div>
      <div className={classes.comments}>
        <Comments commentId={id} comments={comments} />
      </div>
    </div>
  );
}

export default withStyles(styles)(Thread);
