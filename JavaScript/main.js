const cb = document.querySelector('#klizac');

let i = 0;
const colors = ['#ff0000', '#ffff00','#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ffffff'];
let intervalId;
function changeColor(){
    let bojice = colors[i];
    document.querySelector(':root').style.setProperty('--main-color', bojice);
    i=(i+1)%colors.length;
}
function start(){
    intervalId = setInterval(changeColor,1000);
}

function stop(){
    clearInterval(intervalId);
}


async function getState() {
    const response = await fetch("https://lampicabackendapi.azurewebsites.net/checkState");
    const data = await response.json();
    //console.log(data);
    if (data.zadnjeStanje == true) {
        console.log("Zadnje stanje je true");
        document.querySelector(':root').style.setProperty('--main-color', data.zadnjaBoja);
        document.getElementById('dimming').style.display = "grid";
        cb.checked = true;
        document.querySelector('.switcher-btn').onclick = () => {
            document.querySelector('.color-switcher').classList.toggle('active');
        };
    }
    else {
        console.log("Zadnje stanje je false");
    }
}
getState();

let themeButtons = document.querySelectorAll('.theme-buttons');

themeButtons.forEach(color => {
    color.addEventListener('click', () => {
        let dataColor = color.getAttribute('data-color');
        document.querySelector(':root').style.setProperty('--main-color', dataColor);
        
        //RGB - stop()
        stop();
    });
});

//RGB - start()
document.getElementById("rgb").addEventListener("click", start);


// ZA GRAF
// const graf = document.getElementById("chart");
// graf.style.display = "none";

// Range slider = none
document.getElementById('dimming').style.display = "none";

cb.addEventListener('click', () => {
    if (cb.checked == true) {
        document.querySelector(':root').style.setProperty('--main-color', "#ffffff");
        document.getElementById('dimming').style.display = "grid";
        // graf.style.display = "block";
        
        const request = new XMLHttpRequest();
        request.open("POST", "https://lampicabackendapi.azurewebsites.net/ledOn");
        request.send();
        request.onload = () => {
            if (request.status === 200) {
                console.log("Lampica upaljena!");
            }
            else {
                console.log(request);
                console.log('error ${request.status}');
            }
        }

        document.querySelector('.switcher-btn').onclick = () => {
            document.querySelector('.color-switcher').classList.toggle('active');
        };

        /*    let themeButtons = document.querySelectorAll('.theme-buttons');

            themeButtons.forEach(color =>{
                color.addEventListener('click', ()=>{
                    let dataColor = color.getAttribute('data-color');
                    document.querySelector(':root').style.setProperty('--main-color' , dataColor);
                });
            }); */

    } else {
        const request = new XMLHttpRequest();
        request.open("POST", "https://lampicabackendapi.azurewebsites.net/ledOff");
        request.send();
        request.onload = () => {
            if (request.status === 200) {
                console.log("Lampica ugasena!");
            }
            else {
                console.log(request);
                console.log('error ${request.status}');
            }
        }

        document.getElementById('dimming').style.display = "none";
        stop();
        document.querySelector(':root').style.setProperty('--main-color', "#808080");
        document.querySelector('.color-switcher').classList.remove('active');
        // graf.style.display = "none";

        document.querySelector('.switcher-btn').onclick = () => {
            document.querySelector('.color-switcher').classList.remove('active');
        };
    }
});


// Potrosnja elektricne energije

async function getData() {
    const response = await fetch("https://lampicabackendapi.azurewebsites.net/data");
    const data = await response.json();

    const N = 0.204; // izračunato prema formuli ---> N = U * I  ----> N = 3.4W * 60*10^(-3)A
    // stranica sa spec LED diode: https://e-radionica.com/hr/5mm-rgb-led-dioda-zajednicka-katoda.html
    const suma = data.Monday + data.Tuesday + data.Wednesday + data.Thursday + data.Friday + data.Saturday + data.Sunday;
    console.log("Ukupno sati rada: " + suma);

    var A = N * suma; // formula --> A = N * t
    A = A.toFixed(3);
    console.log("Potrošnja el. en. : " + A);
    document.getElementById("izrPotrosnja").innerHTML = "Ukupna potrošnja lampice: " + A + " Wh!";
}
getData();
