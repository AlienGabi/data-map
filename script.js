var map = L.map('map').setView([51.4389629,7.3253178], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


fetch('data/data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    
    for (let i = 0; i < data.events; i++) {
        let event = data.events[i];

        L.marker([event.latitude, event.longitude]).addTo(map)
        .bindPopup(event.id);
    }
  });


