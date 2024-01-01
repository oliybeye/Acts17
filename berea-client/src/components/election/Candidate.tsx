import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { WithStyles, createStyles, withStyles } from "@mui/styles";
import React from "react";
import { Candidates } from "./Race";
import {
  Button,
  Checkbox,
  Divider,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import DefaultImg from "./NoImageSubmitted.png";
import { handleVoteChange } from "../../localStorage";

const styles = () => {
  return createStyles({
    candidate: {
      display: "flex",
      flexDirection: "column",
      padding: "4px",
    },
    subject: {
      padding: "4px",
    },
    candidateProfileHeader: {
      display: "flex",
      flexDirection: "row",
      padding: "4px",
    },
    selected: {
      border: "1px solid green",
    },
    button: {
      display: "flex",
      flexDirection: "column",
    },
    img: {
      width: "250px",
      height: "250px",
    },
    info: {
      paddingLeft: "12px",
    },
  });
};

interface CandidateProp extends WithStyles<typeof styles> {
  candidate: Candidates;
  position: string;
  select: Candidates | undefined;
  setSelected: (selected?: Candidates) => void;
}

function Candidate({
  classes,
  candidate,
  position,
  select,
  setSelected,
}: CandidateProp) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const candidateName = `${candidate?.firstName} ${candidate?.lastName}`;
  const imagePath = `${
    process.env.REACT_APP_IMAGE_ENDPOINT ?? "http://localhost:4000"
  }/api/images?path=${candidate.img}`;
  const checkBox = (
    <Checkbox
      onChange={(e) => {
        if (select === candidate) {
          handleVoteChange({
            race: candidate.race,
            candidate: undefined,
          });
          setSelected(undefined);
        } else {
          handleVoteChange({
            race: candidate.race,
            candidate: candidate,
          });
          setSelected(candidate);
        }
      }}
      checked={select?.id === candidate.id}
    />
  );
  const statements = candidate?.statement.split("\n");

  return (
    <div className={classes.candidate}>
      <Paper className={select?.id === candidate.id ? classes.selected : ""}>
        {checkBox}
        <Button className={classes.button} onClick={handleClickOpen}>
          <Typography>{candidateName}</Typography>
          <img
            className={classes.img}
            src={candidate.img !== "" ? imagePath : DefaultImg}
            alt={DefaultImg}
            loading="lazy"
          />
        </Button>
      </Paper>
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>
          <Link target="_blank" href={`${candidate.url}`}>
            {candidateName}
          </Link>
          {checkBox}
        </DialogTitle>
        <DialogContent>
          <div className={classes.candidateProfileHeader}>
            <img
              className={classes.img}
              src={candidate.img !== "" ? imagePath : DefaultImg}
              alt={DefaultImg}
              loading="lazy"
            />
            <div className={classes.info}>
              {candidate.partyPreference.includes("e") ? (
                <Typography variant="body2">{`Party Preference: ${candidate.partyPreference}`}</Typography>
              ) : (
                <></>
              )}
              {candidate.email.replace(" ", "") !== "" ? (
                <Link target="_blank" href={`mailto:${candidate.email}`}>
                  Send Email
                </Link>
              ) : (
                <></>
              )}
            </div>
          </div>
          {statements.length > 1 ? (
            statements.map((statement, i) => {
              if (
                statement === "Elected Experience" ||
                statement === "Other Professional Experience" ||
                statement === "Education" ||
                statement === "Community Service" ||
                statement === "Statement"
              ) {
                return (
                  <div key={i}>
                    <Typography variant="h6">{statement}</Typography>
                    <Divider />
                  </div>
                );
              }
              return (
                <div key={i} className={classes.subject}>
                  <Typography variant="body2">{statement}</Typography>
                </div>
              );
            })
          ) : (
            <Typography>No statements</Typography>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(Candidate);
