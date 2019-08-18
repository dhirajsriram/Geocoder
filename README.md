
# Geocoder

## Abstract

A React application which handles the users request and places markers on the google maps widget. The user has the ability to add create delete and edit the markers. [Geocoder-node](https://github.com/dhirajsriram/geocoder-node) application serves as the backend to fetch the geocode, reverse geocode and also handles all the CRUD operations related to the application.

## Installation

Kindly do an npm install at the root directory of both the applications to install the required packages. Following are the libraries that are used
- React v16.9.0
- Material-ui v0.20.2
- Enzyme v3.10.0
- supertest v4.0.2

```
npm install 
```

## Serving Locally

Once the packages have been installed you may serve both the application locally you may run `npm start` on the root directory of both the applications to serve them locally. Following are the ports the application run on
- Front-end :  [http://localhost:3000](http://localhost:3000)
- Back-end :  [http://localhost:8081](http://localhost:8081)

**The backend and the frontend applications must be served simultaneously to persist data**

### Scripts

`npm run test` - Runs the test scrips on on the specific application
`npm run build` - Builds a minified version of the frontend application.It correctly bundles React in production mode and optimizes the build for the best performance.

## Architecture

The front-end and back-end application for geocoder are closely integrated. Any operation related to markers are handled in the back-end which is immediately fetched from the front-end have the latest version of the data availble at all times. Following is an integrated architecture of the applications
<p align="center"><img src="/geocoder.png"></p>

## Description

The application works on a single page, there are two segments in the page
- Map widget
- Marker list

### Map Widget

The map widget is loaded from the google maps script tag

```html
<script src="https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places&sensor=false"></script>
```

API_KEY is unique to the application which can be obtained from the [Google cloud](https://console.developers.google.com). The google maps API only works with an API_KEY. 

The map widget also enables the various interactions that the user makes with the application. Following are the features it provides
- Autocomplete for the search bar
- Reverse geocoding based on the co-ordinates from the user click.

### Marker List

The marker list displays the data of the markers that are placed on the map. Marker list are constantly updated with the data from the backend. The user has the ability to do the following with the marker list.
- Add a marker
- Remove a marker
- Edit a marker.

There are idividual API's to handle the CRUD operations in the backend.

## Design
## Error Handling
## Configuration



