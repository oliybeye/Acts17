import { Button, Link, Typography } from "@mui/material";
import { WithStyles, createStyles, withStyles } from "@mui/styles";
import CommentIcon from "@mui/icons-material/Comment";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Author, useIncrementLikeMutation } from "../../graphql";
import { gql, useMutation } from "@apollo/client";
import React from "react";

const INCREMENT_LIKE = gql`
  mutation IncrementLike(
    $id: String!
    $likeCount: Int!
    $type: String!
    $userId: String!
  ) {
    incrementLike(
      input: { id: $id, likeCount: $likeCount, type: $type, userId: $userId }
    )
  }
`;

const INCREMENT_DISLIKE = gql`
  mutation IncrementDislike(
    $id: String!
    $dislikeCount: Int!
    $type: String!
    $userId: String!
  ) {
    incrementDislike(
      input: {
        id: $id
        dislikeCount: $dislikeCount
        type: $type
        userId: $userId
      }
    )
  }
`;

const styles = () => {
  return createStyles({
    root: {
      padding: "8px",
      "@media only screen and (max-width: 500px)": {
        width: "20rem",
      },
    },
    feedItemButtons: {
      display: "flex",
      flexDirection: "row",
    },
    itemButtonCount: {
      paddingRight: "4px",
    },
    title: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "100%",
      textWrap: "pretty",
    },
    img: {
      width: "40rem",
      "@media(max-width: 450px)": {
        height: "12rem",
        width: "18rem",
      },
    },
  });
};

interface ItemProps extends WithStyles<typeof styles> {
  id: string;
  isForFeed?: boolean;
  onCommentClick?: () => void;
  title: string;
  url: string;
  imgUrl: string;
  date: string;
  author?: Author[];
  likes: number;
  dislikes: number;
  source: string;
  sourceSite: string;
}

function Item({
  classes,
  isForFeed,
  onCommentClick,
  title,
  url,
  imgUrl,
  date,
  author,
  source,
  likes,
  dislikes,
  sourceSite,
  id,
}: ItemProps) {
  const [likeCount, setLikeCount] = React.useState(likes);
  const [dislikeCount, setDislikeCount] = React.useState(dislikes);
  const [incrementLike] = useMutation(INCREMENT_LIKE);
  const [incrementDislike] = useMutation(INCREMENT_DISLIKE);

  const onLikeClick = () => {
    incrementLike({
      variables: {
        id: id,
        likeCount: likeCount ?? 0,
        type: source,
        userId: "userId",
      },
    });
    setLikeCount(likeCount + 1);
  };

  const onDislikeClick = () => {
    incrementDislike({
      variables: {
        id: id,
        dislikeCount: dislikeCount ?? 0,
        type: source,
        userId: "userId",
      },
    });
    setDislikeCount(dislikeCount + 1);
  };
  React.useEffect(() => {
    setLikeCount(likes);
  }, [likes]);

  React.useEffect(() => {
    setDislikeCount(dislikes);
  }, [dislikes]);

  return (
    <div className={classes.root}>
      <div>
        <div>
          <Link underline="hover" href={url} target="_blank">
            <Typography className={classes.title} variant="h4">
              {title}
            </Typography>
          </Link>
          <Typography>{date}</Typography>
        </div>
        {author && author.length > 0 ? (
          <Typography>{`By ${author?.at(0)?.first ?? ""} ${
            author?.at(0)?.middle ?? ""
          } ${author?.at(0)?.last ?? ""} ${
            author.length > 1
              ? author.slice(1).map((a) => {
                  return ` and ${a.first ?? ""} ${a.middle ?? ""} ${
                    a.last ?? ""
                  }`;
                })
              : ""
          }`}</Typography>
        ) : (
          <></>
        )}
      </div>
      {imgUrl ? (
        <img
          src={imgUrl.split(",").at(0)}
          // alt="Salted"
          className={classes.img}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '';
          }}
          // loading="lazy"
        />
      ) : (
        <></>
      )}
      <div className={classes.feedItemButtons}>
        <Button onClick={() => onLikeClick()}>
          <Typography className={classes.itemButtonCount}>
            {likeCount}
          </Typography>
          <ThumbUpAltIcon />
        </Button>
        <Link underline="hover" href={sourceSite} target="_blank">
          <Typography variant="h6">{source}</Typography>
        </Link>
        <Button onClick={() => onDislikeClick()}>
          <Typography className={classes.itemButtonCount}>
            {dislikeCount}
          </Typography>
          <ThumbDownIcon />
        </Button>
        {/* {isForFeed ? (
          <Button onClick={() => onCommentClick!()}>
            <Typography className={classes.itemButtonCount}></Typography>
            <CommentIcon />
          </Button>
        ) : (
          <></>
        )} */}
      </div>
    </div>
  );
}

export default withStyles(styles)(Item);
