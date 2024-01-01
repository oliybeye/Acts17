import { gql } from "@apollo/client";
import { WithStyles, createStyles, withStyles } from "@mui/styles";
import * as React from "react";
import { useDistrictsQuery } from "../../graphql";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CountySelection from "./CountySelection";
import { clearVotes, getVotes } from "../../localStorage";
import { useGetStateCountiesQuery } from "../../graphql";
import DistrictTypeElement, { TypeDistrict } from "./DistrictType";

gql`
  query Districts($name: String) {
    county(name: $name) {
      districts {
        districts {
          type
          races {
            candidates {
              county
              district
              districtType
              electionStatus
              email
              filingDate
              firstName
              id
              img
              lastName
              mailingAddress
              middleName
              partyPreference
              phone
              race
              statement
              status
              termLength
              termType
              url
            }
            district
            districtType
            id
            position
            termLength
            termType
          }
          districtType
        }
        type
      }
    }
  }

  query GetStateCounties {
    stateCounties
  }
`;

const styles = () => {
  return createStyles({
    root: {
      padding: "4px",
      paddingBottom: "65px",
    },
    race: {
      marginBottom: "12px",
    },
    header: {
      display: "flex",
      flexDirection: "row",
    },
    district: {
      display: "flex",
      flexDirection: "row",
      marginTop: "8px",
    },
    summary: {},
    termLength: {
      padding: "4px",
    },
    details: {},
    accordion: {
      paddingBottom: "8px",
    },
    fire: {
      backgroundColor: "#bd000a",
    },
    loading: {
      position: "absolute",
      top: "50%",
      left: "50%",
    },
  });
};

interface ElectionProp extends WithStyles<typeof styles> {
  filter: string;
}

function Election({ classes, filter }: ElectionProp) {
  const [county, setCounty] = React.useState("");
  const [showVotes, setShowVotes] = React.useState(false);
  const { data: countyData, loading: countyLoading } =
    useGetStateCountiesQuery();
  const { data, loading } = useDistrictsQuery({
    variables: {
      name: county,
    },
  });

  if (loading || countyLoading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  const handleClose = () => {
    setShowVotes(false);
  };

  const counties =
    countyData && countyData.stateCounties
      ? countyData.stateCounties
          .map((county) => {
            if (county) {
              return county;
            }
            return "";
          })
          .filter((county) => county !== "")
      : [];
  const districtTypes = data?.county?.districts ?? [];

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CountySelection
          onChange={setCounty}
          value={county}
          counties={counties}
        />
        <Button
          onClick={(e) => {
            const votes = getVotes();
            console.log(votes);
            setShowVotes(true);
          }}
        >
          Show Current Votes
        </Button>
      </div>
      {districtTypes
        .filter((s) =>
          s.type.toLocaleLowerCase().match(filter.toLocaleLowerCase())
        )
        .map((district, i) => {
          return (
            <div className={classes.accordion}>
              <Accordion key={`${district.type}-${i}`}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                >
                  <Typography variant="h4">{district.type}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                  <DistrictTypeElement districtTypes={district} />
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })}
      <Dialog fullWidth={true} open={showVotes} onClose={handleClose}>
        <DialogTitle>
          <Typography></Typography>
        </DialogTitle>
        <DialogContent>
          {getVotes().map((vote) => {
            if (vote.candidate) {
              return (
                <div>
                  <Typography variant="body2">{`Race: ${vote.race}`}</Typography>
                  <Typography variant="body2">{`Candidate: ${vote.candidate.firstName} ${vote.candidate.lastName}`}</Typography>
                </div>
              );
            }
          })}
          <Button
            onClick={(e) => {
              clearVotes();
            }}
          >
            Clear Votes
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(Election);
