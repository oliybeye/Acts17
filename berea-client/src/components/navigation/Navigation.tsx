import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import BallotIcon from '@mui/icons-material/Ballot';
import HomeIcon from '@mui/icons-material/Home';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PublicIcon from '@mui/icons-material/Public';
import BusinessIcon from '@mui/icons-material/Business';
import { WithStyles, createStyles, withStyles } from "@mui/styles"
import { Feed } from "../Home";

const styles = () => {
    return createStyles({
        root: {

        }
    });
}

interface NavigationProp extends WithStyles<typeof styles> {
    selectFeed: (feed: Feed) => void;
    currentFeed: Feed;
}

function Navigation({classes, selectFeed, currentFeed}: NavigationProp) {
    return (
        <List>
            <ListItem disablePadding>
                <ListItemButton selected={currentFeed === 'Today'} onClick={e => selectFeed('Today')}>
                    <ListItemIcon>
                        <CalendarTodayIcon />
                    </ListItemIcon>
                    <ListItemText primary="Today" />
                </ListItemButton>
            </ListItem>
            {/* <ListItem disablePadding>
                <ListItemButton selected={currentFeed === 'Feed'} onClick={e => selectFeed('Feed')}>
                    <ListItemIcon>
                        <DynamicFeedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Feed" />
                </ListItemButton>
            </ListItem> */}
            <ListItem disablePadding>
                <ListItemButton selected={currentFeed === 'Election'} onClick={e => selectFeed('Election')}>
                    <ListItemIcon>
                        <BallotIcon />
                    </ListItemIcon>
                    <ListItemText primary="Election" />
                </ListItemButton>
            </ListItem>
            {/* <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Local News" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <NewspaperIcon />
                    </ListItemIcon>
                    <ListItemText primary="National News" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PublicIcon />
                    </ListItemIcon>
                    <ListItemText primary="World News" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText primary="Companies" />
                </ListItemButton>
            </ListItem> */}
        </List>
    );
}

export default withStyles(styles)(Navigation);