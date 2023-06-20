import { Loader } from "@googlemaps/js-api-loader";
import $ from "jquery";
import store from "../../store";
import { DriverIcon } from "../../asset/icons";
import axios from "axios";
import { initTrip } from "../../store/modules/trip";

const loader = new Loader({
  //apikey: "AIzaSyCbiOkbY2VnIunlLqy5wcILaTnxru8drzA",
  // apikey: "AIzaSyBS6lGj7CsMDE5O9bMEf3I3anmfn34OBlA",
  apiKey: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg",
  version: "weekly",
});
const position = { lat: 21.021384, lng: 105.8866827 };
let map;
let driverMark = null;
let infowindow = null;
let driverNearby = [];
const options = {
  fields: ["formatted_address", "geometry.location", "name", "place_id"],
  componentRestrictions: { country: "vn" },
  strictBounds: false,
  types: [],
};

export function setNearbyMark(position, type) {
  removeMarkers();
  var postData = {
    location: position,
    type: type,
  };
  var axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
  axios
    .post(
      `http://localhost:8000/api/customer/get-nearby-driver`,
      postData,
      axiosConfig
    )
    .then((response) => {
      loader.load().then(async (google) => {
        response.data.forEach((item) => {
          driverNearby.push(
            new google.maps.Marker({
              position: item,
              map,
              icon: DriverIcon,
            })
          );
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
export function removeMarkers() {
  for (let i = 0; i < driverNearby.length; i++) {
    driverNearby[i].setMap(null);
  }
  driverNearby = [];
  if (driverMark) {
    driverMark.setMap(null);
    driverMark = null;
  }
}

function calculateAndDisplayRoute(
  directionsService,
  directionsRenderer,
  start,
  end,
  mode
) {
  directionsService
    .route({
      origin: { placeId: start.place_id },

      destination: { placeId: end.place_id },

      travelMode: mode,
    })
    .then((response) => {
      var distance = response.routes[0].legs[0].distance.value / 1000;
      store.dispatch(
        initTrip({
          start: {
            placeId: start.place_id,
            name: start.name,
            address: start.formatted_address,
            location: {
              lat: start.geometry.location.lat(),
              lng: start.geometry.location.lng(),
            },
          },
          end: {
            placeId: end.place_id,
            name: end.name,
            address: end.formatted_address,
            location: {
              lat: start.geometry.location.lat(),
              lng: start.geometry.location.lng(),
            },
          },
          route: response.routes[0].legs[0].distance,
        })
      );
      distance = distance.toFixed(1);
      $(".car span").text(distance * 20000);
      $(".motorbike span").text(distance * 10000);
      directionsRenderer.setDirections(response);
      $(".result").removeClass("hide");
      setNearbyMark(
        {
          lat: start.geometry.location.lat(),
          lng: start.geometry.location.lng(),
        },
        store.getState().trip.type
      );
    })
    .catch((e) => window.alert("Directions request failed due to " + e));
}
export function setMark(driver) {
  loader.load().then(async (google) => {
    const contentString = `
            <table  border="0" cellspacing="5" cellpadding="6">
              <tr>
                <td><strong >氏名</strong></td>
                <td> ${driver.name}</td>
              </tr>
              <tr>
                <td><strong >電話番号</strong></td>
                <td>${driver.phone}</td>
              </tr>
              <tr>
                <td><strong >ブランド</strong></td>
                <td>${driver.branch}</td>
              </tr>
              <tr>
                <td><strong >プレート</strong></td>
                <td>${driver.plate}</td>
              </tr>
            </table>`;

    if (driverMark) {
      infowindow.setContent(contentString);
      driverMark.setPosition(driver.position);
      driverMark.setTitle(driver.name);
      map.panTo(driver.position);
    } else {
      driverMark = new google.maps.Marker({
        position: driver.position,
        map,
        title: driver.name,
        icon: DriverIcon,
      });
      infowindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: "Uluru",
      });
      driverMark.addListener("click", () => {
        infowindow.open({
          anchor: driverMark,
          map,
        });
      });
    }
  });
}
export const loadMap = () => {
  // while (!document.getElementById("map"));
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
      // console.log(place);
      if (autocomplete.getPlace() && autocomplete2.getPlace())
        calculateAndDisplayRoute(
          directionsService,
          directionsRenderer,
          autocomplete.getPlace(),
          autocomplete2.getPlace(),
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
          autocomplete.getPlace(),
          autocomplete2.getPlace(),
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
