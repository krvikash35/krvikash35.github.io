var myjs = (function () {

    let slideInOutOnSwipe = function () {
        let pageEle = document.getElementById("page"),
            navEle = document.getElementById("nav"),
            startx,
            starty,
            distx,
            disty,
            qualifyDistPxl = 250,
            allowedDiagonalPxl = 100,
            startTime,
            elapsedTime,
            allowedTimeInMilli = 300;
        pageEle.addEventListener('touchstart', (e) => {
            let touchedObj1 = e.changedTouches[0]; //if multitouch, get one of touch point
            startx = touchedObj1.pageX;
            starty = touchedObj1.pageY;
            startTime = new Date().getTime();
        })
        // pageEle.addEventListener('touchmove', ()=>{

        // })
        pageEle.addEventListener('touchend', (e) => {
            let touchedObj1 = e.changedTouches[0], //if multitouch, get one of touch point
                distx = touchedObj1.pageX - startx;
            disty = touchedObj1.pageY - starty;
            elapsedTime = new Date().getTime() - startTime;

            //if swipe left then, open the menu drawer 
            if (startx < 150 && distx < qualifyDistPxl && Math.abs(disty) < allowedDiagonalPxl) {
                navEle.classList.add("open");
            } else if (startx > 150 && distx > -qualifyDistPxl && Math.abs(disty) < allowedDiagonalPxl) {
                navEle.classList.remove("open");
            }
        })
    }

    var navIntialize = function () {
        let activeNavMenuID = null;
        let fnNavMenuOnClick = function () {
            if (this.id == activeNavMenuID) {
                // this.nextElementSibling.style.display = "hide"
            } else {
                document.getElementById(activeNavMenuID).nextElementSibling.style.display = "none";
                this.nextElementSibling.style.display = "block";
                activeNavMenuID = this.id;
            }
        }
        let fnNavSubMenuOnClick = function () {

            let bn = document.querySelector(".bk-nav");
            let bph = document.querySelector(".bk-pg-hdr .nav .title");
            let menuTitle = document.getElementById(activeNavMenuID).getElementsByTagName("span")[0].innerHTML;
            let subMenuTitle = this.getElementsByTagName('span')[0].innerHTML;
            bph.innerHTML = menuTitle + "-->" + subMenuTitle;
            bn.classList.remove('open')
        }
        let navMenus = document.querySelectorAll(".bk-nav > ul > li > a");
        let navSubMenus = document.querySelectorAll(".bk-nav > ul > li > ul > li > a");
        let menuTitle = navMenus[0].getElementsByTagName("span")[0].innerHTML;
        let subMenuTitle = navSubMenus[0].getElementsByTagName('span')[0].innerHTML;
        let bph = document.querySelector(".bk-pg-hdr .nav .title");
        bph.innerHTML = menuTitle + "-->" + subMenuTitle;
        activeNavMenuID = "navMenu0";
        navMenus[0].nextElementSibling.style.display = "block";
        for (var i = 0; i < navMenus.length; i++) {
            navMenus[i].addEventListener("click", fnNavMenuOnClick, true);
            navMenus[i].setAttribute("id", "navMenu" + i);
        }
        for (var i = 0; i < navSubMenus.length; i++) {
            navSubMenus[i].addEventListener("click", fnNavSubMenuOnClick, true);
        }
    }


    var hideShowOnClick = function () {
        let fnMenuToggleListener = function () {
            let bn = document.querySelector(".bk-nav");
            if (!bn.classList.contains('open')) {
                bn.classList.add('open')
            } else {
                bn.classList.remove('open')
            }

        }
        let mt = document.querySelector(".menu-toggle");
        mt.addEventListener("click", fnMenuToggleListener, true)
    }

    var toggleTheme = function () {
        let toggle = true;
        let thmEle = document.querySelector(".bk-pg-hdr .theme");
        thmEle.addEventListener("click", fnThEleOnClick, true);
        function fnThEleOnClick() {
            let css = document.querySelector("link[rel]")
            let href = css.getAttribute("href");
            let target = null;
            if (href.includes("dark.css")) {
                target = href.replace("dark.css", "light.css");
            } else {
                target = href.replace("light.css", "dark.css");
            }
            css.setAttribute("href", target);

            console.log(css.getAttribute("href"))
        }
    }

    var updateTitleOnScroll = function () {
        function throttle(fn, wait) {
            var time = Date.now();
            return function () {
                if ((time + wait - Date.now()) < 0) {
                    fn();
                    time = Date.now();
                }
            }

        }
        function callback() {
            let articleEles = document.querySelectorAll(".bk-cont .bk-pg .bk-pg-content .bk-article");
            for (var i = 0; i < articleEles.length; i++) {
                let eleTop = articleEles[i].getBoundingClientRect().top;
                let eleBottom = articleEles[i].getBoundingClientRect().bottom;
                if (eleTop < window.innerHeight && eleBottom > window.innerHeight) {
                    let currArtId = articleEles[i].id;
                    let navSubMenu = document.querySelector("a[href=\\#" + currArtId + "]");
                    let navSubMenuText = navSubMenu.getElementsByTagName("span")[0].innerHTML;
                    let navMenuText = navSubMenu.parentElement.parentElement.parentElement.children[0].getElementsByTagName("span")[0].innerHTML;
                    document.getElementById("title").innerHTML = navMenuText + "-->" + navSubMenuText;
                }
            }
        }

        let pageEle = document.getElementById("page");
        pageEle.addEventListener("scroll", throttle(callback, 1000))
    }

    return {
        nav: {
            navIntialize: navIntialize,
            hideShowOnClick: hideShowOnClick,
            slideInOutOnSwipe: slideInOutOnSwipe
        },
        theme: {
            toggleTheme: toggleTheme
        },
        article: {
            updateTitleOnScroll: updateTitleOnScroll
        }
    }
})();

myjs.nav.navIntialize();
myjs.nav.hideShowOnClick();
myjs.nav.slideInOutOnSwipe();
myjs.theme.toggleTheme();
myjs.article.updateTitleOnScroll();
