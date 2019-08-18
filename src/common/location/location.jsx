import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function Location(props) {
  return (
    <Grid>
      <Typography
        variant="h5"
        fontWeight="fontWeightBold"
        component="h5"
        gutterBottom
      >
        {props.marker[0].formattedAddress ? props.marker[0].formattedAddress : ""}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Latitude : {props.marker[0].latitude} <br />
        longitude : {props.marker[0].longitude}
      </Typography>
    </Grid>
  );
}
