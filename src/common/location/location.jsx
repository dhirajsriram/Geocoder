import React from "react";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

export default function Location(props) {
  const useStyles = makeStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: "100%"
    },
    input: {
      marginLeft: 8,
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    divider: {
      width: 1,
      height: 28,
      margin: 4
    }
  });
  const classes = useStyles();

  function editmarker(event, data) {
    event.preventDefault();
    event.persist();
    fetch("/editMarker", {
      method: "POST", // or 'PUT'
      body: JSON.stringify({
        marker: data[0].formattedAddress,
        edit: event.target[0].value
      }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {props.updateMarkers()})
      .catch(error => console.error("Error:", error));
  }

  function deleteMarker(data) {
    fetch("/deleteMarker", {
      method: "POST", // or 'PUT'
      body: JSON.stringify({ marker: data[0].formattedAddress }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => props.getAllMarkers())
      .catch(error => console.error("Error:", error));
  }

  return (
    <Grid item xs={12} md={6} key={props.i}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                {props.index !== props.i ? (
                  <Grid>
                    <Typography
                      variant="h5"
                      fontWeight="fontWeightBold"
                      component="h5"
                      gutterBottom
                    >
                      {props.marker[0].formattedAddress
                        ? props.marker[0].formattedAddress
                        : ""}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Latitude : {props.marker[0].latitude} <br />
                      longitude : {props.marker[0].longitude}
                    </Typography>
                  </Grid>
                ) : (
                  <form
                    onSubmit={e => editmarker(e, props.marker)}
                    className={classes.container}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      label="Edit location"
                      className={classes.textField}
                      margin="normal"
                      id="autocomplete-2"
                    />
                  </form>
                )}
              </Grid>
              <Grid item className={classes.removebutton}>
                <Grid container alignItems="flex-end">
                  <Typography variant="body2" style={{ cursor: "pointer" }}>
                    <Button
                      className={classes.button}
                      onClick={() => deleteMarker(props.marker)}
                    >
                      Remove
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="edit location"
                aria-controls="edit-icon"
                aria-haspopup="true"
                color="inherit"
                className={classes.iconButton}
                onClick={() => props.toggleTextField(props.i)}
              >
                <CreateIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
