import { gql } from "@apollo/client";
import { Card, CardContent, Typography } from "@mui/material";
import { WithStyles, createStyles, withStyles } from "@mui/styles";
import { useNewsSourcesQuery } from "../../graphql";

gql`
query NewsSources {
  newsSources {
    credibility {
      clickBaiting
      fundingSource
    }
    name
    owner
    site
  }
}
`;

const styles = () => {
    return createStyles({
        root: {
            
        }
    });
}

interface SourcesFeedProp extends WithStyles<typeof styles> {

}

function SourcesFeed({ classes }: SourcesFeedProp) {
    const { data } = useNewsSourcesQuery();
    return (<div>{
        data?.newsSources?.map(s => {
            return (
                <Card>
                    <CardContent>
                        {s?.name != null ?
                            <Typography variant="h5">
                                {s.name}
                            </Typography> : <></>
                        }
                        {s?.site != null ?
                            <Typography variant="h5">
                                {s.site}
                            </Typography> : <></>
                        }
                        {s?.owner != null ?
                            <Typography variant="h5">
                                {s.owner}
                            </Typography> : <></>
                        }
                    </CardContent>
                </Card>
            )
        })
    }</div>)
}

export default withStyles(styles)(SourcesFeed);