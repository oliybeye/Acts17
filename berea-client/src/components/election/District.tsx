import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { WithStyles, createStyles, withStyles } from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Race, { RaceType } from "./Race";

const styles = () => {
  return createStyles({
    root: {},
    fire: {
      backgroundColor: "#bd000a",
    },
    district: {},
    summary: {
      display: "flex",
      flexDirection: "row",
    },
  });
};

export type District = {
  type: string;
  districtType: string;
  races: RaceType[];
};

interface DistrictProp extends WithStyles<typeof styles> {
  district: District;
}

function District({ classes, district }: DistrictProp) {
  return (
    <div>
      {district.races.map((race, i) => {
        return (
          <Accordion key={`${race.position}-${i}`}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id={`${race.position}-${i}`}
            >
              <Typography>{race.position}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.summary}>
              <Race race={race} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

export default withStyles(styles)(District);
