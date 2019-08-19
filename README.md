
# Geocoder

## Abstract

**[http://ec2-18-223-164-119.us-east-2.compute.amazonaws.com/](http://ec2-18-223-164-119.us-east-2.compute.amazonaws.com/)**

A React application which handles the user's request and places markers on the google maps widget. The user can add create delete and edit the markers. [Geocoder-node](https://github.com/dhirajsriram/geocoder-node) application serves as the backend to fetch the geocode, reverse geocode and also handles all the CRUD operations related to the application.

## Installation

Kindly do an npm install at the root directory of both the applications to install the required packages. Following are the libraries that are used in front-end.
- React v16.9.0
- Material-UI v0.20.2

```
npm install 
```

## Serving Locally

Once the packages have been installed you may serve both the applications locally. You may run `npm start` on the root directory of both the applications to serve them locally. Following are the ports the application run on
- Front-end :  [http://localhost:3000](http://localhost:3000)
- Back-end :  [http://localhost:8081](http://localhost:8081)

**The backend and the frontend applications must be served simultaneously to persist data**

### Scripts

`npm run start` - Serves the app locally on [http://localhost:3000](http://localhost:3000)

`npm run test` - Runs the test scrips on the specific application

`npm run build` - Builds a minified version of the frontend application. It correctly bundles React in production mode and optimizes the build for the best performance.

## Architecture

The front-end and back-end application for geocoder are closely integrated. Any operation related to markers are handled in the back-end which is immediately fetched from the front-end to have the latest version of the data available at all times. Following is an integrated architecture of the applications
<p align="center"><img src="/geocoder.png"></p>

## Deployment

- The application has been deployed on AWS to an **EC2** instance.
- The static files of the website have been copied to the apache's root folder which hosts the application
- **Apache** has been configured to proxy request from the frontend to the port 8081 of the domain.

## Description

The application works on a single page, there are two segments in the page
- Map widget
- Marker list

### Map Widget

The map widget is loaded from the google maps API's CDN.

```html
<script src="https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places&sensor=false"></script>
```

**API_KEY** is unique to the application which can be obtained from the [Google cloud](https://console.developers.google.com). The google maps API only works with an API_KEY. 

The map widget also enables the various interactions that the user makes with the application. Following are the features it provides
- Autocomplete for the search bar
- Reverse geocoding based on the coordinates from the user click.

### Marker List

The marker list displays the data of the markers that are placed on the map. Marker list is constantly updated with the data from the backend. The user can do the following with the markers.
- Add a marker
- Remove a marker
- Edit a marker.

```js
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
```

There are individual API's to handle the CRUD operations in the backend.

## Design

### Folder structure

The application was designed to be as granular as possible in terms of functionality. Separation of concerns was the goal while designing the project. The folder structure of the application is as follows

`src/common` - Contains all the shared components such as error, Search, menu, map, etc

`src/pages` - The different pages of the application are placed here. At present, the app runs on a single page **Home**

`src/assets` - Images necessary for the application are present here.

### Application Design

The application follows a class-based approach. The application manages states to update the DOM based on the response from the backend. State of the application is updated when the marker is placed, removed or edited to show the user the latest version of the data. There are also smaller stateless components that are responsible for displaying segments of the DOM. The data for these stateless components are passed through props.

**A stateful approach is best suited for application that involves a lot of data-alterations. Although a stateless approach with hooks would also be a good option to implement.**

### UX Design

The application strongly follows a Material design approach. Elements shown to user represent life-like materials like paper which is something that a user can connect with very easily.

The application was designed with a map in mind. The Map on the left represents a canvas of a map and the markers on the right represent the marking made on the canvas.

## Error Handling

The application handles errors gracefully. The application checks for the response status. If the status is not 200 an **Error component** is shown to the user with the corresponding data from the response.


