import { WithStyles, createStyles, withStyles } from "@mui/styles";
import Candidate from "./Candidate";
import React from "react";

const styles = () => {
  return createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      padding: "4px",
      overflow: "auto",
    },
    candidate: {
      padding: "4px",
    },
  });
};

export type Candidates = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  county: string;
  districtType: string;
  district: string;
  race: string;
  termType: string;
  termLength: string;
  mailingAddress: string;
  email: string;
  phone: string;
  partyPreference: string;
  status: string;
  url: string;
  img: string;
  statement: string;
};

export type RaceType = {
  position: string;
  candidates: Candidates[];
};

interface RaceProps extends WithStyles<typeof styles> {
  race?: RaceType;
}

function Race({ classes, race }: RaceProps) {
  const [select, setSelect] = React.useState<Candidates | undefined>(undefined);
  return (
    <div className={classes.root}>
      {race?.candidates?.map((candidate, i) => {
        return (
          <Candidate
            key={`${candidate.race}${i}`}
            candidate={candidate}
            position={race!.position}
            select={select}
            setSelected={(select) => setSelect(select)}
          />
        );
      })}
    </div>
  );
}

export default withStyles(styles)(Race);
