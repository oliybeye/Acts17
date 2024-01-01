import { MenuItem, Select, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { WithStyles, createStyles, withStyles } from "@mui/styles";

const styles = () => {
  return createStyles({
    root: {
      padding: "4px",
      width: "200px",
    },
  });
};

interface CountySelectionProp extends WithStyles<typeof styles> {
  value: string;
  onChange: (value: string) => void;
  counties: string[];
}

function CountySelection({ classes, value, onChange, counties }: CountySelectionProp) {
  const renderMenuItem = (county: string) => {
    return (
      <MenuItem key={county} value={county}>
        <Typography>{county}</Typography>
      </MenuItem>
    );
  };

  return (
    <div className={classes.root}>
      <FormControl fullWidth>
        <InputLabel>County</InputLabel>
        <Select
          value={value}
          label="County"
          onChange={(e) => onChange(e.target.value)}
        >
          {counties.map((c) => (c ? renderMenuItem(c) : null))}
        </Select>
      </FormControl>
    </div>
  );
}

export default withStyles(styles)(CountySelection);
