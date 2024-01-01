import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { WithStyles, createStyles, withStyles } from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import District, { District as DistrictTypeT } from "./District";
import { DistrictType } from "../../graphql";

const styles = () => {
  return createStyles({
    details: {},
  });
};

export type TypeDistrict = {
  districtType: string;
  type: string;
  districts: any[]; //DistrictTypeT[];
};

interface DistrictTypeProp extends WithStyles<typeof styles> {
  districtTypes: any;
}

function DistrictTypeElement({ classes, districtTypes }: DistrictTypeProp) {
  return (
    <div>
      {districtTypes.districts.map((district: any, i: number) => {
        return (
          <Accordion key={`${district.type}-${i}`}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Typography variant="h4">{district.type}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <District district={district} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

export default withStyles(styles)(DistrictTypeElement);
