import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Search from "../common/search/search";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/styles";
const styles = theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  paper: {
    padding: 12
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

class Home extends Component {
  constructor(props) {
    super(props);
    // Declare State
    this.state = {
      map: {},
      markers: [],
      markersData: [],
      index: ""
    };

    // Bind Functions
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.getAllMarkers = this.getAllMarkers.bind(this);
    this.toggleTextField = this.toggleTextField.bind(this);
  }

  componentDidMount() {
    var options = {
      types: ["(cities)"]
    };

    this.myLatlng = new window.google.maps.LatLng(51.1657, 10.4515);
    this.map = new window.google.maps.Map(document.getElementById("map"), {
      center: this.myLatlng,
      zoom: 8
    });

    this.setState({
      map: this.map
    });

    let self = this;
    window.google.maps.event.addListener(this.map, "click", function(event) {
      var latitude = event.latLng.lat();
      var longitude = event.latLng.lng();
      self.reverseGeocode(latitude, longitude);
    });

    this.autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );

    this.autocomplete.setFields(["address_components"]);
    this.getAllMarkers();
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  }

  reverseGeocode(lat, lon) {
    // Extract City From Address Object
    let self = this;
    fetch("/reverseGeocode?lat=" + lat + "&lon=" + lon)
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        // Examine the text in the response

        response.json().then(function(data) {
          self.addMarker(data);
          self.saveMarker(data);
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  }

  handlePlaceSelect() {
    // Extract City From Address Object
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;
    let self = this;
    console.log(address);
    fetch(
      "/geocode?address=" +
        address[0].long_name +
        ", " +
        address[1].long_name +
        ", " +
        address[2].long_name
    )
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        // Examine the text in the response

        response.json().then(function(data) {
          self.addMarker(data);
          self.saveMarker(data);
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  }

  addMarker(data) {
    
    let latlng = { lat: data[0].latitude, lng: data[0].longitude };
    this.marker = new window.google.maps.Marker({
      position: latlng,
      map: this.state.map,
      title: data[0].formattedAddress
    });
    this.state.map.setCenter(latlng);
    var bounds = new window.google.maps.LatLngBounds();
    this.setState({markers : [...this.state.markers,this.marker]})
    for (var i = 0; i < this.state.markers.length; i++) {
      bounds.extend(this.state.markers[i].getPosition())
    }
    this.state.map.fitBounds(bounds);
  }

  getAllMarkers() {
    let self = this;
    this.setState({markers:[]})
    fetch("/getMarkers")
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        // Examine the text in the response

        response.json().then(function(data) {
          let markers = data.markers;
          self.setState({ markersData: markers });
          for (let x in markers) {
            self.addMarker(markers[x]);
          }
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  }

  saveMarker(data) {
    fetch("/saveMarker", {
      method: "POST", // or 'PUT'
      body: JSON.stringify({ marker: data }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => console.log(JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
    this.getAllMarkers();
    this.setState({ index: "" });
  }

  editMarker(data) {
    return event => {
      event.preventDefault();
      event.persist();
      this.myLatlng = new window.google.maps.LatLng(51.1657, 10.4515);
      this.setState({ index: "" });
      this.setState({
        map: new window.google.maps.Map(document.getElementById("map"), {
          zoom: 8
        })
      });
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
        .then(response => {
          this.getAllMarkers();
        })
        .catch(error => console.error("Error:", error));
        
       
    };
  }

  deleteMarker(data) {
    let self = this;
    fetch("/deleteMarker", {
      method: "POST", // or 'PUT'
      body: JSON.stringify({ marker: data[0].formattedAddress }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => self.getAllMarkers())
      .catch(error => console.error("Error:", error));
    
    this.myLatlng = new window.google.maps.LatLng(51.1657, 10.4515);
    this.setState({ index: "" });
    this.setState({
      map: new window.google.maps.Map(document.getElementById("map"), {
        zoom: 8
      })
    });
  }

  toggleTextField(i) {
    this.setState({ index: i });
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider>
        <div className="Home">
          <Search />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            <div id="map" className="map" />
            </Grid>
            <Grid item xs={12} md={6}>
              <div id="locations" className="locations">
                <Grid container spacing={2}>
                  {this.state.markersData.length > 0 &&
                    this.state.markersData.map((marker, i) => {
                      return (
                        <Grid item xs={12} md={6} key={i}>
                          <Paper className={classes.paper}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm container>
                                <Grid
                                  item
                                  xs
                                  container
                                  direction="column"
                                  spacing={2}
                                >
                                  <Grid item xs>
                                    {this.state.index !== i ? (
                                      <Grid>
                                        <Typography
                                          variant="h5"
                                          fontWeight="fontWeightBold"
                                          component="h5"
                                          gutterBottom
                                        >
                                          {marker[0].formattedAddress
                                            ? marker[0].formattedAddress
                                            : ""}
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          gutterBottom
                                        >
                                          Latitude : {marker[0].latitude} <br />
                                          longitude : {marker[0].longitude}
                                        </Typography>
                                      </Grid>
                                    ) : (
                                      <form
                                        onSubmit={
                                          this.editMarker(marker)
                                        }
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
                                      <Typography
                                        variant="body2"
                                        style={{ cursor: "pointer" }}
                                      >
                                        <Button
                                          className={classes.button}
                                          onClick={() =>
                                            this.deleteMarker(marker)
                                          }
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
                                    onClick={() => this.toggleTextField(i)}
                                  >
                                    <CreateIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      );
                    })}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Home);
