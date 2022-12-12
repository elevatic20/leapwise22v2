const cb = document.querySelector('#klizac');
        cb.addEventListener('click', ()=>{
                if(cb.checked == true){
                    document.querySelector(':root').style.setProperty('--main-color' , "#ffffff");

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
                    document.querySelector('.switcher-btn').onclick = () =>{
                        document.querySelector('.color-switcher').classList.remove('active');
                    };
                }
            });