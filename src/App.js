import React, { useState, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  Tooltip,
  Grid,
  Dialog,
  makeStyles,
  Divider,
  Button,
  Slider,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { convert, scales, descriptions } from "./Converter";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      minHeight: "100vh",
      width: "100vw",
    },
    form: {
      maxWidth: theme.breakpoints.values.md,
      textAlign: "center",
    },
    source: {
      fontStyle: "italic",
    },
    iconButton: {
      cursor: "pointer",
    },
    input: {
      margin: theme.spacing(1),
    },
    currentInput: {
      "& fieldset": {
        borderColor: "green",
        borderWidth: 2,
      },
    },
    slider: {
      [theme.breakpoints.up("sm")]: {
        width: "50%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "75%",
      },
    },
    precisionTitle: {
      margin: theme.spacing(1),
    },
  };
});

const getInitialState = (type) => {
  const initialState = {};
  for (const scale of scales)
    initialState[scale] = type === "string" ? "" : false;
  return initialState;
};
const precisionStrings = {
  label: "Precision",
  instruction: "Precision of the calculations. Min: 0, max: 10.",
};
const defaultPrecision = 4;

export default function App() {
  const classes = useStyles();
  const [values, setValues] = useState(getInitialState("string"));
  const [dialogs, setDialogs] = useState(getInitialState());
  const [precision, setPrecision] = useState(defaultPrecision);
  const [lastValue, setLastValue] = useState({ scale: "", value: "" });

  const handleChange = (scale, event) => {
    setLastValue({ scale: event.target.value && scale, value: event.target.value });
    setValues(convert(scale, event.target.value, precision));
  };

  const handleOpenDialog = (scale) => setDialogs({ ...dialogs, [scale]: true });
  const handleCloseDialog = (scale) =>
    setDialogs({ ...dialogs, [scale]: false });

  const handlePrecisionChange = (event, value) => setPrecision(value);

  useEffect(() => {
    setValues(convert(lastValue.scale, lastValue.value, precision));
  }, [precision]);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <form noValidate autoComplete="off" className={classes.form}>
        <div>
          {scales.map((scale) => {
            const value = values[scale];
            return (
              <React.Fragment key={scale}>
                <TextField
                  type="text"
                  variant="outlined"
                  label={scale}
                  value={String(value)}
                  className={[
                    classes.input,
                    scale === lastValue.scale && classes.currentInput,
                  ]}
                  onChange={(e) => handleChange(scale, e)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="More info">
                          <InfoIcon
                            className={classes.iconButton}
                            onClick={() => handleOpenDialog(scale)}
                          />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
                <Dialog
                  open={dialogs[scale]}
                  onClose={() => handleCloseDialog(scale)}
                  scroll="paper"
                >
                  <DialogTitle id="scroll-dialog-title">
                    {scale} scale
                  </DialogTitle>
                  <DialogContent dividers={true}>
                    <DialogContentText>{descriptions[scale]}</DialogContentText>
                    <DialogContentText className={classes.source}>
                      Source: Wikipedia
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => handleCloseDialog(scale)}
                      color="primary"
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
            );
          })}
        </div>
        <Divider />
        <div>
          <Grid
            container
            className={classes.precisionTitle}
            direction="row"
            alignItems="center"
            justify="center"
          >
            <Grid item>{precisionStrings.label}</Grid>
            <Grid item>
              <Tooltip title={precisionStrings.instruction}>
                <InfoIcon />
              </Tooltip>
            </Grid>
          </Grid>

          <Slider
            className={classes.slider}
            defaultValue={defaultPrecision}
            step={1}
            min={0}
            max={10}
            marks={Array(11)
              .fill(null)
              .map((el, i) => ({ label: i, value: i }))}
            valueLabelDisplay="off"
            onChangeCommitted={handlePrecisionChange}
          />
        </div>
      </form>
    </Grid>
  );
}
