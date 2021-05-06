let typeMapping = {
    "machine": "assets/svg/machine.svg",
    "nature": "assets/svg/nature.svg",
    "people": "assets/svg/people.svg",
    "event": "assets/svg/event.svg"
};

let map = L.map('map').setView([51.4389629,7.3253178], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

fetch('data/data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    
    for (let i = 0; i < data.events.length; i++) {
        let event = data.events[i];

        let html = `<h4>${event.id}</h4>`;

        for (let j = 0; j < event.media.length; j++) {
            let media = event.media[j];

            if (media.src.length < 3) {
                continue;
            }

            if (media.type === 'img') {
                html += `<img src="${media.src}" width="200" alt="${media.title} (Author: ${media.author})" /><br>`;
            } else {
                html += `<a href="${media.src}" target="_blank">${media.title} (Author: ${media.author})</a><br>`;
            }
        }

        let icon = L.icon( {
            iconUrl: typeMapping[event.category],
            iconSize: [24, 24],
            iconAnchor: [12, 24],
            popupAnchor: [0, -26]
        } );

        L.marker([event.latitude, event.longitude], {
            icon: icon
        }).addTo(map)
        .bindPopup(html);
    }
  });


