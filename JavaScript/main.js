const cb = document.querySelector('#klizac');

async function getState(){ 
    const response = await fetch("https://lampicabackendapi.azurewebsites.net/checkState");
    const data = await response.json();
    //console.log(data);
    if(data.zadnjeStanje == true){
             console.log("Zadnje stanje je true");
             document.querySelector(':root').style.setProperty('--main-color' , "#ffffff");
             cb.checked = true;
             document.querySelector('.switcher-btn').onclick = () =>{
                document.querySelector('.color-switcher').classList.toggle('active');
            };
    }
    else{
             console.log("Zadnje stanje je false");
    }
}
getState();


// const graf = document.getElementById("chart");
// graf.style.display = "none";
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


//potrosnja elektricne energije

async function getData(){ 
    const response = await fetch("https://lampicabackendapi.azurewebsites.net/data");
    const data = await response.json();
    
    const N = 0.204; // izračunato prema formuli ---> N = U * I  ----> N = 3.4W * 60*10^(-3)A
    // stranica sa spec LED diode: https://e-radionica.com/hr/5mm-rgb-led-dioda-zajednicka-katoda.html
    const suma = data.Monday + data.Tuesday + data.Wednesday + data.Thursday + data.Friday + data.Saturday + data.Sunday;
    console.log("Ukupno sati rada: " + suma);

    const A = N * suma; // formula --> A = N * t
    console.log("Potrošnja el. en. : " + A);
    document.getElementById("izrPotrosnja").innerHTML = "Ukupna potrošnja lampice: " + A + " Wh!";
}
getData();