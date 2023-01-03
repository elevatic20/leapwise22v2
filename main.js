const cb = document.querySelector('#klizac');
// const graf = document.getElementById("chart");
// graf.style.display = "none";

async function getData(){ 
                        console.log("test");
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
