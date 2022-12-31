// treba dodati webAppConnected u API
function MQTTConnect() {
    const request = new XMLHttpRequest();
                request.open("POST", "https://lampicabackendapi.azurewebsites.net/webAppConnected");
                request.send();
                request.onload = () =>{
                    if(request.status === 200){
                        console.log("Uspjesno spajanje sa lampicom");
                    }
                    else{
                        console.log(request);
                        console.log('error ${request.status}');
                    }
                }
}

document.getElementById('red').onclick = function () {
    const request = new XMLHttpRequest();
                request.open("POST", "https://lampicabackendapi.azurewebsites.net/redOn");
                request.send();
                request.onload = () =>{
                    if(request.status === 200){
                        console.log("Boja je promijenjena na crvenu!");
                    }
                    else{
                        console.log(request);
                        console.log('error ${request.status}');
                    }
                }
}

document.getElementById('green').onclick = function () {
    const request = new XMLHttpRequest();
                request.open("POST", "https://lampicabackendapi.azurewebsites.net/greenOn");
                request.send();
                request.onload = () =>{
                    if(request.status === 200){
                        console.log("Boja je promijenjena na zelenu!");
                    }
                    else{
                        console.log(request);
                        console.log('error ${request.status}');
                    }
                }
}

document.getElementById('blue').onclick = function () {
    const request = new XMLHttpRequest();
                request.open("POST", "https://lampicabackendapi.azurewebsites.net/blueOn");
                request.send();
                request.onload = () =>{
                    if(request.status === 200){
                        console.log("Boja je promijenjena na plavu!");
                    }
                    else{
                        console.log(request);
                        console.log('error ${request.status}');
                    }
                }
}

document.getElementById('yellow').onclick = function () {
    const request = new XMLHttpRequest();
                request.open("POST", "https://lampicabackendapi.azurewebsites.net/yellowOn");
                request.send();
                request.onload = () =>{
                    if(request.status === 200){
                        console.log("Boja je promijenjena na zutu!");
                    }
                    else{
                        console.log(request);
                        console.log('error ${request.status}');
                    }
                }
}

document.getElementById('purple').onclick = function () {
    const request = new XMLHttpRequest();
                request.open("POST", "https://lampicabackendapi.azurewebsites.net/purpleOn");
                request.send();
                request.onload = () =>{
                    if(request.status === 200){
                        console.log("Boja je promijenjena na ljubičastu!");
                    }
                    else{
                        console.log(request);
                        console.log('error ${request.status}');
                    }
                }
}

document.getElementById('cyan').onclick = function () {
    const request = new XMLHttpRequest();
                request.open("POST", "https://lampicabackendapi.azurewebsites.net/cyanOn");
                request.send();
                request.onload = () =>{
                    if(request.status === 200){
                        console.log("Boja je promijenjena na cijan!");
                    }
                    else{
                        console.log(request);
                        console.log('error ${request.status}');
                    }
                }
}

document.getElementById('white').onclick = function () {
    const request = new XMLHttpRequest();
                request.open("POST", "https://lampicabackendapi.azurewebsites.net/whiteOn");
                request.send();
                request.onload = () =>{
                    if(request.status === 200){
                        console.log("Boja je promijenjena na bijelu!");
                    }
                    else{
                        console.log(request);
                        console.log('error ${request.status}');
                    }
                }
}