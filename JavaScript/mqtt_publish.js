// treba dodati webAppConnected u API
function MQTTConnect() {
    const request = new XMLHttpRequest();
    request.open("POST", "https://lampicabackendapi.azurewebsites.net/webAppConnected");
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            console.log("Uspjesno spajanje sa lampicom");
        }
        else {
            console.log(request);
            console.log('error ${request.status}');
        }
    }
    /*   // ovo je rjesenje da je lampica ugasena dok se pokrene stranica
       request.open("POST", "https://lampicabackendapi.azurewebsites.net/ledOff");
       request.send();
       request.onload = () =>{
           if(request.status === 200){
               console.log("Pocetno stanje lampice je ugaseno");
           }
           else{
               console.log(request);
               console.log('error ${request.status}');
           }
       } */
}

document.getElementById('red').onclick = function () {
    const request = new XMLHttpRequest();
    request.open("POST", "https://lampicabackendapi.azurewebsites.net/redOn");
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            console.log("Boja je promijenjena na crvenu!");
        }
        else {
            console.log(request);
            console.log('error ${request.status}');
        }
    }
}

document.getElementById('green').onclick = function () {
    const request = new XMLHttpRequest();
    request.open("POST", "https://lampicabackendapi.azurewebsites.net/greenOn");
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            console.log("Boja je promijenjena na zelenu!");
        }
        else {
            console.log(request);
            console.log('error ${request.status}');
        }
    }
}

document.getElementById('blue').onclick = function () {
    const request = new XMLHttpRequest();
    request.open("POST", "https://lampicabackendapi.azurewebsites.net/blueOn");
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            console.log("Boja je promijenjena na plavu!");
        }
        else {
            console.log(request);
            console.log('error ${request.status}');
        }
    }
}

document.getElementById('yellow').onclick = function () {
    const request = new XMLHttpRequest();
    request.open("POST", "https://lampicabackendapi.azurewebsites.net/yellowOn");
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            console.log("Boja je promijenjena na zutu!");
        }
        else {
            console.log(request);
            console.log('error ${request.status}');
        }
    }
}

document.getElementById('purple').onclick = function () {
    const request = new XMLHttpRequest();
    request.open("POST", "https://lampicabackendapi.azurewebsites.net/purpleOn");
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            console.log("Boja je promijenjena na ljubičastu!");
        }
        else {
            console.log(request);
            console.log('error ${request.status}');
        }
    }
}

document.getElementById('cyan').onclick = function () {
    const request = new XMLHttpRequest();
    request.open("POST", "https://lampicabackendapi.azurewebsites.net/cyanOn");
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            console.log("Boja je promijenjena na cijan!");
        }
        else {
            console.log(request);
            console.log('error ${request.status}');
        }
    }
}

document.getElementById('white').onclick = function () {
    const request = new XMLHttpRequest();
    request.open("POST", "https://lampicabackendapi.azurewebsites.net/whiteOn");
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            console.log("Boja je promijenjena na bijelu!");
        }
        else {
            console.log(request);
            console.log('error ${request.status}');
        }
    }
}

// Dimming lampice 

var elem = document.getElementById('dimming');

var rangeValue = function(){
    var newValue = elem.value;
    console.log(newValue);
    
    // Ako je dimming 25%
    if(newValue == 25){
        const request = new XMLHttpRequest();
        request.open("POST", "https://lampicabackendapi.azurewebsites.net/dimm25");
        request.send();
        request.onload = () => {
            if (request.status === 200) {
                console.log("Dimming je postavljen na 25% !");
            }
            else {
                console.log(request);
                console.log('error ${request.status}');
            }
        }
    }

    // Ako je dimming 50%
    if(newValue == 50){
        const request = new XMLHttpRequest();
        request.open("POST", "https://lampicabackendapi.azurewebsites.net/dimm50");
        request.send();
        request.onload = () => {
            if (request.status === 200) {
                console.log("Dimming je postavljen na 50% !");
            }
            else {
                console.log(request);
                console.log('error ${request.status}');
            }
        }
    }

    // Ako je dimming 75%
    if(newValue == 75){
        const request = new XMLHttpRequest();
        request.open("POST", "https://lampicabackendapi.azurewebsites.net/dimm75");
        request.send();
        request.onload = () => {
            if (request.status === 200) {
                console.log("Dimming je postavljen na 75% !");
            }
            else {
                console.log(request);
                console.log('error ${request.status}');
            }
        }
    }

    // Ako je  dimming 100%
    if(newValue == 100){
        const request = new XMLHttpRequest();
        request.open("POST", "https://lampicabackendapi.azurewebsites.net/dimm100");
        request.send();
        request.onload = () => {
            if (request.status === 200) {
                console.log("Dimming je postavljen na 100% !");
            }
            else {
                console.log(request);
                console.log('error ${request.status}');
            }
        }
    } 
}
elem.addEventListener("input", rangeValue);




// RGB promjena boja lampice  

document.getElementById('rgb').onclick = function () {
    const request = new XMLHttpRequest();
    request.open("POST", "https://lampicabackendapi.azurewebsites.net/rgbOn");
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            console.log("RGB boje!");
        }
        else {
            console.log(request);
            console.log('error ${request.status}');
        }
    }
}

