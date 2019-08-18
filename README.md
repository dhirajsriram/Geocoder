
# Geocoder

## Abstract

A React application which handles the users request and places markers on the google maps widget. The user has the ability to add create delete and edit the markers. [Geocoder-node](https://github.com/dhirajsriram/geocoder-node) application serves as the backend to fetch the geocode, reverse geocode and also handles all the CRUD operations related to the application.

## Development

Kindly do an npm install to install the required packages for the web application. Following are the libraries that are used
- React v16.9.0
- Material-ui v0.20.2

```
npm install 
```

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

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



