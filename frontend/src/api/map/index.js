import { Loader } from "@googlemaps/js-api-loader";
const loader = new Loader({
  apiKey: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg",
  version: "weekly",
});
const position = { lat: 21.021384, lng: 105.8866827 };
let map;
const options = {
  fields: ["formatted_address", "geometry", "name"],
  componentRestrictions: { country: "vn" },
  strictBounds: false,
  types: [],
};

function calculateAndDisplayRoute(
  directionsService,
  directionsRenderer,
  start,
  end,
  mode
) {
  directionsService
    .route({
      origin: start,

      destination: end,

      travelMode: mode,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
      console.log(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + e));
}

export const loadMap = () => {
  loader.load().then(async (google) => {
    const { Map } = await google.maps.importLibrary("maps");
    const places = await google.maps.importLibrary("places");
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    map = new Map(document.getElementById("map"), {
      center: position,
      zoom: 13,
      mapTypeControl: false,
    });
    directionsRenderer.setMap(map);
    const card = document.getElementById("pac-card");
    const input = document.getElementById("pac-input");
    const input2 = document.getElementById("pac-input2");
    const autocomplete = new places.Autocomplete(input, options);
    const autocomplete2 = new places.Autocomplete(input2, options);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");
    infowindow.setContent(infowindowContent);
    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });
    const marker2 = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });

    autocomplete.addListener("place_changed", () => {
      infowindow.close();
      marker.setVisible(false);

      const place = autocomplete.getPlace();
      console.log(place);
      if (autocomplete.getPlace() && autocomplete2.getPlace())
        calculateAndDisplayRoute(
          directionsService,
          directionsRenderer,
          autocomplete.getPlace().geometry.location,
          autocomplete2.getPlace().geometry.location,
          google.maps.TravelMode.DRIVING
        );
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      // if (place.geometry.viewport) {
      //   map.fitBounds(place.geometry.viewport);
      // } else {
      //   map.setCenter(place.geometry.location);
      //   map.setZoom(12);
      // }

      // marker.setPosition(place.geometry.location);
      // marker.setVisible(true);
      // infowindowContent.children["place-name"].textContent = place.name;
      // infowindowContent.children["place-address"].textContent =
      //   place.formatted_address;
      // infowindow.open(map, marker);
    });
    autocomplete2.addListener("place_changed", () => {
      infowindow.close();
      marker2.setVisible(false);

      const place = autocomplete2.getPlace();
      if (autocomplete.getPlace() && autocomplete2.getPlace())
        calculateAndDisplayRoute(
          directionsService,
          directionsRenderer,
          autocomplete.getPlace().geometry.location,
          autocomplete2.getPlace().geometry.location,
          google.maps.TravelMode.DRIVING
        );
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
    });
  });
};

export const setLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      console.log(pos);
    });
  } else {
    console.log("Browser doesn't support Geolocation");
  }
};
