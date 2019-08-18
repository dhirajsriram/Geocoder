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
import Location from "../common/location/location";
import Error from "../common/error/error";
import CloseIcon from "@material-ui/icons/Close";
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
      index: "",
      Error: {},
      Errored: false
    };
  }

  componentDidMount() {
    var options = { types: ["(cities)"] };
    this.setupMap();
    this.setState({ map: this.map });
    if(window.google){
    let self = this;
    window.google.maps.event.addListener(this.map, "click", function(event) {
      var latitude = event.latLng.lat();
      var longitude = event.latLng.lng();
      self.reverseGeocode(latitude, longitude);
    });
    this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById("autocomplete"), options);
    this.autocomplete.setFields(["address_components"]);
    this.getAllMarkers();
    this.autocomplete.addListener("place_changed", this.geocode);
  }
  }

  setupMap = () => {
    if(window.google){
    this.map = new window.google.maps.Map(document.getElementById("map"), {
      center: new window.google.maps.LatLng(51.1657, 10.4515),
      zoom: 8
    });
    this.setState({ map: this.map });}
  }

  geocodeAPI = (url) => {
    let self = this;
    fetch(url)
      .then(function(response) {
        if (response.status !== 200) {
          self.setState({ Errored: true });
        }
        response.json().then(function(data) {
          if (data.Error) {
            self.setState({ Error: data });
          } else {
            self.setState({ Error: {}, Errored: false });
            self.addMarker(data);
            self.saveMarker(data);
          }
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  }

  reverseGeocode = (lat, lon) => {
    this.geocodeAPI("/reverseGeocode?lat=" + lat + "&lon=" + lon);
  }

  geocode = () => {
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;
    if (address) {
      this.geocodeAPI(
        "/geocode?address=" + address[0].long_name + ", " + address[1].long_name + ", " + address[2].long_name
      );
    } else {
      this.changeMarker("/editMarker", {
        edit: addressObject.name
      });
    }
  }

  addMarker = (data) => {
    if (data[0]) {
      let latlng = { lat: data[0].latitude, lng: data[0].longitude };
      this.marker = new window.google.maps.Marker({
        position: latlng,
        map: this.state.map,
        title: data[0].formattedAddress
      });
      this.state.map.setCenter(latlng);
      var bounds = new window.google.maps.LatLngBounds();
      this.setState({ markers: [...this.state.markers, this.marker] });
      for (var i = 0; i < this.state.markers.length; i++) {
        bounds.extend(this.state.markers[i].getPosition());
      }
      this.state.map.fitBounds(bounds);
    }
  }

  getAllMarkers = () => {
    let self = this;
    this.setState({ markers: [] });
    fetch("/getMarkers")
      .then(function(response) {
        if (response.status !== 200) {
          self.setState({ Errored: true });
        }
        response.json().then(function(data) {
          if (data.Error) {
            self.setState({ Error: data });
            self.setState({ markersData: [] });
            self.setupMap();
          } else {
            self.setState({ Error: data, Errored: false });
            let markers = data.markers;
            self.setState({ markersData: markers }, () => {
              if (self.state.markersData.length === 0) {
                self.setupMap();
              }
            });
            for (let x in markers) {
              self.addMarker(markers[x]);
            }
          }
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  }

  changeMarker = (url, data) => {
    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        if (response.Error) {
          this.setState({ Errored: true, Error: response });
        } else {
          this.getAllMarkers();
        }
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({ index: "" });
  }

  saveMarker = (data) => {
    this.changeMarker("/saveMarker", { marker: data });
  }

  editMarker = (data) => {
    return event => {
      event.preventDefault();
      event.persist();
      this.changeMarker("/editMarker", {
        marker: data[0].formattedAddress,
        edit: event.target[0].value
      });
    };
  }

  deleteMarker = (data) => {
    this.changeMarker("/deleteMarker", { marker: data[0].formattedAddress });
  }

  toggleTextField = (i) => {
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
              {this.state.Errored ? (
                <div className="error">
                  <React.Fragment>
                    <div className="close-button">
                    <IconButton className="close-btn" onClick={() => this.setState({ Errored: !this.state.Errored })}>
                      <CloseIcon align="right" />
                    </IconButton></div>
                    <Error Error={this.state.Error} />
                  </React.Fragment>
                </div>
              ) : (
                <div id="locations" className="locations">
                  <Grid container spacing={2}>
                    {this.state.markersData.length > 0 &&
                      this.state.markersData.map((marker, i) => {
                        return (
                          <Grid item xs={12} md={6} key={i}>
                            <Paper className={classes.paper}>
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm container>
                                  <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                      {this.state.index !== i ? (
                                        <div className="location-value">
                                        <Location marker={marker} />
                                        </div>
                                      ) : (
                                        <form
                                          onSubmit={this.editMarker(marker)}
                                          className={classes.container}
                                          noValidate
                                          autoComplete="off">
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
                                          <Button className={classes.button} onClick={() => this.deleteMarker(marker)}>
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
                                      onClick={() => this.toggleTextField(i)}>
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
              )}
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Home);
