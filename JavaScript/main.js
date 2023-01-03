const cb = document.querySelector('#klizac');
// const graf = document.getElementById("chart");
// graf.style.display = "none";

async function getData(){ 
                        const response = await fetch("https://lampicabackendapi.azurewebsites.net/checkState");
                        const data = await response.json();
                        console.log(data);
                        if(data.zadnjeStanje == true){
                                 console.log("Zadnje stanje je true");
                        }
                        else{
                                 console.log("Zadnjee stanje je false");
                        }
}
getData();




        cb.addEventListener('click', ()=>{
                if(cb.checked == true){
                    document.querySelector(':root').style.setProperty('--main-color' , "#ffffff");
                    // graf.style.display = "block";
                    const request = new XMLHttpRequest();
                    request.open("POST", "https://lampicabackendapi.azurewebsites.net/ledOn" );
                    request.send();
                    request.onload = () =>{
                        if(request.status === 200){
                            console.log("Lampica upaljena!");
                        }
                        else{
                            console.log(request);
                            console.log('error ${request.status}');
                        }
                    }
                 document.querySelector('.switcher-btn').onclick = () =>{
                        document.querySelector('.color-switcher').classList.toggle('active');
                    };

                    let themeButtons = document.querySelectorAll('.theme-buttons');

                    themeButtons.forEach(color =>{
                        color.addEventListener('click', ()=>{
                            let dataColor = color.getAttribute('data-color');
                            document.querySelector(':root').style.setProperty('--main-color' , dataColor);
                        });
                    });
                   
                }else{
                    const request = new XMLHttpRequest();
                    request.open("POST", "https://lampicabackendapi.azurewebsites.net/ledOff" );
                    request.send();
                    request.onload = () =>{
                        if(request.status === 200){
                            console.log("Lampica ugasena!");
                        }
                        else{
                            console.log(request);
                            console.log('error ${request.status}');
                        }
                    }
                    
                    document.querySelector(':root').style.setProperty('--main-color' , "#808080");
                    document.querySelector('.color-switcher').classList.remove('active');
                    // graf.style.display = "none";
                    document.querySelector('.switcher-btn').onclick = () =>{
                        document.querySelector('.color-switcher').classList.remove('active');
                    };
                }
        });


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
