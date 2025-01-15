// const socket = io();

// // console.log("hey")

// if (navigator.geolocation) {
//     navigator.geolocation.watchPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         socket.emit("send-location", { latitude, longitude });
//       },
//       (error) => {
//         console.error(error);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0,
//       }
//     );
//   }

// const map = L.map("map").setView([0,0], 10);

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" , {
//     attribution: "OpenStreetMap"
// }).addTo(map)

const socket = io();

// console.log("hey") // this is just a commented log for debugging purposes

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("send-location", { latitude, longitude });
    },
    (error) => {
      console.error(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
}

const map = L.map("map").setView([0, 0], 100);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "C3i Hub",
}).addTo(map);

const markers = {};

socket.on("receive-location", (data) => {
  const { id, latitude, longitude } = data;
  map.setView([latitude, longitude]);
  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
  }
  else {
    markers[id] = L.marker([latitude, longitude]).addTo(map);
  }
});

//label hatana hai on cloaing tab
socket.on("user-disconnected", (id) => {
    if (markers[id]) {
      map.removeLayer(markers[id]);
      delete markers[id];
    }
  });
  