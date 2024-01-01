import { createStyles, WithStyles, withStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import Feed, { Author, News, Platform } from "./feed/Feed";
import Navigation from "./navigation/Navigation";
import Header from "./header/Header";
import * as React from "react";
import { gql } from "@apollo/client";
import { useNewsQuery } from "../graphql";
import Election from "./election/Election";

gql`
  query News($today: Boolean) {
    news(input: { today: $today }) {
      author {
        first
        last
      }
      date
      title
      id
      url
      platform {
        name
        clickBaitingScore
        site
      }
      comment
      imgUrl
      like
      dislike
      id
    }
  }
`;

const styles = () => {
  return createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "auto",
      overflow: "hidden",
    },
    header: {
      display: "contents",
      height: "fit-content"
    },
    content: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "95vh",
    },
    navigation: {
      width: "10%",
      borderRight: "solid",
      borderWidth: "thin",
      display: "contents",
    },
    feed: {
      height: "100%",
      overflow: "auto",
      "&::-webkit-scrollbar": {
        display: "none",
      },
      width: "50rem",
      position: "absolute",
      left: "20%",
      "@media(max-width: 500px)": {
        position: "relative",
        width: "40rem",
        left: "0%"
      },
    },
    trending: {
      display: "flex",
      width: "10%",
    },
  });
};

interface HomeProps extends WithStyles<typeof styles> {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}
export type Feed = "Today" | "Feed" | "Election";

function Home({ classes, theme, setTheme }: HomeProps) {
  const [navOpen, setNavOpen] = React.useState(false);
  const [trendOpen, setTrendOpen] = React.useState(false);
  const [feed, setFeed] = React.useState<Feed>("Today");
  const [filter, setFilter] = React.useState("");
  const { data, loading } = useNewsQuery({
    variables: { today: feed === "Today" },
    skip: feed === "Election",
  });

  const newsFeed =
    data && data.news
      ? data.news
          .map((s) => {
            return {
              id: s?.id,
              imgUrl: s?.imgUrl,
              title: s?.title!,
              url: s?.url,
              date: s?.date,
              like: s?.like,
              dislike: s?.dislike,
              platform: {
                name: s?.platform?.name!,
                site: s?.platform?.site!,
              } as Platform,
              author: s?.author?.map((a) => {
                return {
                  first: a?.first,
                  last: a?.last,
                } as Author;
              }),
            } as News;
          })
          .filter(
            (news) =>
              news.title.toLowerCase().match(filter) ||
              news.platform.name.toLowerCase().match(filter)
          )
      : [];

  const handleSelectFeed = (feed: Feed) => {
    setFeed(feed);
  };

  const onSearch = (search: string) => {
    setFilter(search.toLowerCase());
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Header
          toggleNav={() => setNavOpen(!navOpen)}
          toggleTrend={() => setTrendOpen(!trendOpen)}
          onSearch={onSearch}
          theme={theme}
          setTheme={setTheme}
        />
      </div>
      <div className={classes.content}>
        {navOpen ? (
          <div className={classes.navigation}>
            <Navigation currentFeed={feed} selectFeed={handleSelectFeed} />
            <Divider orientation="vertical" />
          </div>
        ) : (
          <></>
        )}
        <div className={classes.feed}>
          {feed === "Election" ? (
            <Election filter={filter} />
          ) : newsFeed.length > 0 ? (
            <Feed loading={loading} newsFeed={newsFeed} />
          ) : (
            <div></div>
          )}
        </div>
        {trendOpen ? (
          <div className={classes.trending}>
            <Divider orientation="vertical" />
            {/* <List>
              <ListItem>
                <ListItemButton>
                  <div>
                    <Typography>Election 2024</Typography>
                  </div>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <div>
                    <Typography>Some other news trending</Typography>
                  </div>
                </ListItemButton>
              </ListItem>
            </List> */}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default withStyles(styles)(Home);
