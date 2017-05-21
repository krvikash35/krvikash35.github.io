var myjs = (function(){
     
    var navIntialize = function(){
        let activeNavMenuID = null;
        let fnNavMenuOnClick = function(){
            if(this.id == activeNavMenuID){
                // this.nextElementSibling.style.display = "hide"
            }else{
                document.getElementById(activeNavMenuID).nextElementSibling.style.display = "none";
                this.nextElementSibling.style.display = "block";
                activeNavMenuID = this.id;
            }
        }
        let fnNavSubMenuOnClick = function(){

            let bn = document.querySelector(".bk-nav");
            let bph = document.querySelector(".bk-pg-hdr .nav .title");
            let menuTitle = document.getElementById(activeNavMenuID).getElementsByTagName("span")[0].innerHTML;
            let subMenuTitle = this.getElementsByTagName('span')[0].innerHTML;
            bph.innerHTML = menuTitle + "-->"+subMenuTitle;
                bn.classList.remove('open')
        }
        let navMenus = document.querySelectorAll(".bk-nav > ul > li > a");
        let navSubMenus = document.querySelectorAll(".bk-nav > ul > li > ul > li > a");
        let menuTitle = navMenus[0].getElementsByTagName("span")[0].innerHTML;
        let subMenuTitle = navSubMenus[0].getElementsByTagName('span')[0].innerHTML;
        let bph = document.querySelector(".bk-pg-hdr .nav .title");
        bph.innerHTML = menuTitle + "-->"+subMenuTitle;
        activeNavMenuID = "navMenu0";
        navMenus[0].nextElementSibling.style.display = "block";
              for(var i=0; i<navMenus.length; i++){
                    navMenus[i].addEventListener("click", fnNavMenuOnClick, true);
                    navMenus[i].setAttribute("id", "navMenu"+i);
              }
              for(var i=0; i<navSubMenus.length; i++){
                  navSubMenus[i].addEventListener("click", fnNavSubMenuOnClick, true);           
              }
    }


   var  menuToggleOnClick = function(){
       let fnMenuToggleListener = function(){
           let bn = document.querySelector(".bk-nav");
           if(!bn.classList.contains('open')){
             bn.classList.add('open')
           }else{
               bn.classList.remove('open')
           }
          
       }
       let mt = document.querySelector(".menu-toggle");
       mt.addEventListener("click", fnMenuToggleListener, true)
   }

   var toggleTheme = function(){
       let toggle = true;
       let thmEle = document.querySelector(".bk-pg-hdr .theme");
       thmEle.addEventListener("click", fnThEleOnClick, true);
       function fnThEleOnClick(){
           let css = document.querySelector("link[rel]")
           let href = css.getAttribute("href");
           let target = null;
           if ( href.includes("dark.css") ) {
               target =  href.replace("dark.css", "light.css");
           }else{
                target = href.replace("light.css", "dark.css");
           }
           css.setAttribute("href", target);

           console.log(css.getAttribute("href"))
       }
   }

    return {
        nav: {
            navIntialize: navIntialize,
            menuToggleOnClick: menuToggleOnClick
        },
        theme: {
            toggleTheme: toggleTheme
        }
    }
})();

myjs.nav.navIntialize();
myjs.nav.menuToggleOnClick();
myjs.theme.toggleTheme();