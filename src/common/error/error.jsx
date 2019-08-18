import React from "react";
import Typography from "@material-ui/core/Typography";
import WarningIcon from "@material-ui/icons/Warning";

export default function Error(props) {
  return (
    <div>
      <Typography variant="h6" gutterBottom align="center">
        <WarningIcon className="warning-icon" />
        <br />
        {props.Error.Error}
      </Typography>
    </div>
  );
}
