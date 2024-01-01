import * as React from "react";
import { List } from "@mui/material";
import { WithStyles, createStyles, withStyles } from "@mui/styles";
import FeedItem from "./FeedItem";
import Thread from "./Thread";
import CircularProgress from "@mui/material/CircularProgress";

const styles = () => {
  return createStyles({
    root: {
      overflowY: "scroll",
      height: "100%",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    loading: {
      position: 'absolute',
      top: '50%',
      left: '50%'
    },
  });
};

export interface NavProp {
  onBack?: () => void;
  setThreadId?: (id: string) => void;
}

export interface News {
  id: string;
  imgUrl: string;
  title: string;
  url: string;
  date: string;
  author: Author[];
  like: number;
  dislike: number;
  platform: Platform;
}

export interface Author {
  first: string;
  middle: string;
  last: string;
}

export interface Platform {
  name: string;
  site: string;
}

interface FeedProp extends WithStyles<typeof styles> {
  newsFeed: News[];
  loading: boolean;
}

function Feed({ classes, newsFeed, loading }: FeedProp) {
  const [showThread, setShowThread] = React.useState(false);
  const [currentThreadId, setCurrentThreadId] = React.useState<string | null>(
    null
  );
  const handleOnBack = () => {
    setShowThread(false);
    setCurrentThreadId(null);
  };

  const handleSettingCurrentThread = (id: string) => {
    setCurrentThreadId(id);
    setShowThread(true);
  };

  const selectedNews = newsFeed.filter(news => news.id === currentThreadId)?.at(0);

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress/>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {showThread ? (
        <Thread
          id={`${currentThreadId}`}
          onBack={handleOnBack}
          title={selectedNews?.title!}
          date={selectedNews?.date!}
          url={selectedNews?.url!}
          imgUrl={selectedNews?.imgUrl!}
          likes={selectedNews?.like ?? 0}
          dislikes={selectedNews?.dislike ?? 0}
          source={selectedNews!.platform!.name!}
          sourceSite={selectedNews?.platform?.site!}
        />
      ) : (
        <>
          <List>
            {newsFeed.map((m) => {
              return (
                <FeedItem
                  key={m.id}
                  id={m.id}
                  imgUrl={m?.imgUrl!}
                  title={m?.title!}
                  url={m?.url!}
                  date={m?.date!}
                  author={m!.author as Author[]}
                  likes={m?.like!}
                  dislikes={m?.dislike!}
                  source={m?.platform?.name!}
                  sourceSite={m?.platform?.site!}
                  setThreadId={handleSettingCurrentThread}
                />
              );
            })}
          </List>
        </>
      )}
    </div>
  );
}

export default withStyles(styles)(Feed);
