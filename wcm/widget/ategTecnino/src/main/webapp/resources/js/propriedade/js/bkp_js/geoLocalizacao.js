function GetLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        mapa.innerHTML = "Geolocalização não é suportada nesse browser.";
    }
}

function showPosition(position) {
    //var idPaiFilhoAtual = document.getElementById('idPaiFilhoAtual').value;
    var mapa = document.getElementById("mapa");
    var latitude = document.getElementById("latitude");
    var longitude = document.getElementById("longitude");
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    latitude.value = lat;
    longitude.value = lon;
    latlon = new google.maps.LatLng(lat, lon)
    showMap = document.getElementById('showMap')
    console.log("showMap: " + showMap)
    showMap.style.height = '300px';
    showMap.style.width = '600px';

    var myOptions = {
        center: latlon,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL }
    };
    var map = new google.maps.Map(document.getElementById("showMap"), myOptions);
    var marker = new google.maps.Marker({ position: latlon, map: map, title: "Você está Aqui!" });
}

function showError(error) {
    //var idPaiFilhoAtual = document.getElementById('idPaiFilhoAtual').value;
    var mapa = document.getElementById("mapa");
    var latitude = document.getElementById("latitude");
    var longitude = document.getElementById("longitude");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            mapa.innerHTML = "Usuário rejeitou a solicitação de Geolocalização."
            break;
        case error.POSITION_UNAVAILABLE:
            mapa.innerHTML = "Localização indisponível."
            break;
        case error.TIMEOUT:
            mapa.innerHTML = "O tempo da requisição expirou."
            break;
        case error.UNKNOWN_ERROR:
            mapa.innerHTML = "Algum erro desconhecido aconteceu."
            break;
    }
}