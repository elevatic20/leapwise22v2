const cb = document.querySelector('#klizac');
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
                            console.log("Ubacen podatak u tablicu!");
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
                    document.querySelector(':root').style.setProperty('--main-color' , "#808080");
                    document.querySelector('.color-switcher').classList.remove('active');
                    // graf.style.display = "none";
                    document.querySelector('.switcher-btn').onclick = () =>{
                        document.querySelector('.color-switcher').classList.remove('active');
                    };
                }
        });
