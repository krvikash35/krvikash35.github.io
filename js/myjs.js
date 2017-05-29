var myjs = (function () {
    var book = {
        currArtEleId: null,
        currArtEleBottom: 0
    }

    let slideInOutOnSwipe = function () {
        let pageEle = document.getElementById("page"),
            navEle = document.getElementById("nav"),
            startx,
            starty,
            distx,
            disty,
            qualifyDistPxl = 50,
            allowedDiagonalPxl = 50,
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
            if (startx < 100 && distx > qualifyDistPxl && Math.abs(disty) < allowedDiagonalPxl) {
                navEle.classList.add("open");
            } else if (startx > 150 && distx < -qualifyDistPxl && Math.abs(disty) < allowedDiagonalPxl) {
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

            let oldel = bph;
            newel = bph.cloneNode(true);
            bph.parentNode.replaceChild(newel, oldel);
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

            // console.log(css.getAttribute("href"))
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
                let scrollArticleEleId = articleEles[i].id;
                if (eleTop < window.innerHeight && eleBottom > window.innerHeight && book.currArtEleId!=scrollArticleEleId) {
                    book.currArtEleId = scrollArticleEleId;
                    let currArtId = book.currArtEleId;
                    let navSubMenu = document.querySelector("a[href=\\#" + currArtId + "]");
                    let navSubMenuText = navSubMenu.getElementsByTagName("span")[0].innerHTML;
                    let navMenuText = navSubMenu.parentElement.parentElement.parentElement.children[0].getElementsByTagName("span")[0].innerHTML;
                    let titleEle = document.getElementById("title");
                    titleEle.innerHTML = navMenuText+"-->"+navSubMenuText;
                    let oldel = titleEle;
                    newel = titleEle.cloneNode(true);
                    titleEle.parentNode.replaceChild(newel, oldel);
                    break;
                }
            }
        }

        let pageEle = document.getElementById("page");
        pageEle.addEventListener("scroll", throttle(callback, 1000))
    }

    function setCurrArticleEleId(){
        let artEls = document.querySelectorAll(".bk-cont .bk-pg .bk-pg-content .bk-article");
        for(var i=0; i<artEls.length; i++){
            let elTop = artEls[i].getBoundingClientRect().top;
            let elBottom = artEls[i].getBoundingClientRect().bottom;
            let windowHeight = window.innerHeight;
            if( elTop>windowHeight && elBottom>windowHeight){
                return book.currArtEleId = artEls[i].id;
            }
        }
    }

    function getArticleOnSubMenuClick(){
        let xhttp = new XMLHttpRequest();
        let subMenuEles = document.querySelectorAll(".bk-nav > ul > li > ul > li > a");
        let articlePageEle = document.getElementById('articles')
        for(var i=0; i<subMenuEles.length; i++){
            subMenuEles[i].addEventListener('click', fnSubMenuOnClick);
        }
        subMenuEles[1].click()
        function fnSubMenuOnClick(e){
            e.preventDefault()
            let article_file_name = this.getAttribute('data-aritcle_file_name');
            // console.log(article_file_name);
            xhttp.onreadystatechange = function(){
                if (this.readyState == 4 ) {
                    if( this.status == 200 ){
                        articlePageEle.innerHTML = xhttp.responseText;
                    }else{
                        articlePageEle.innerHTML = "<article><h3>No Article Found</h3></article>";
                    }
                    let artEles = document.getElementById("articles")
                    book.currArtEleBottom = artEles.getBoundingClientRect().bottom
                    // console.log(artEles.getBoundingClientRect().bottom)
                }else{
                    articlePageEle.innerHTML = "<article><h3>Please Wait...</h3></article>";
                }
            }
            xhttp.open("GET", "/article/"+article_file_name, true)
            xhttp.send()
        }
    }

    function updateArtProgOnScroll(){
        let pageEle = document.getElementById("page");
        let artEle = document.getElementById("articles");
        let progEle = document.getElementById("art_prog_bar");
        let pageBottom = pageEle.getBoundingClientRect().bottom;
        // let OrigArtBottom = artEle.getBoundingClientRect().bottom;
        pageEle.addEventListener("scroll", throttle(callback, 500))

        function throttle(fn, wait) {
            var time = Date.now();
            return function () {
                if ((time + wait - Date.now()) < 0) {
                    fn();
                    time = Date.now();
                }
            }

        }

        function callback(){
            let CurrArtBottom = artEle.getBoundingClientRect().bottom;
            // console.log(book.currArtEleBottom, pageBottom)
            // console.log(CurrArtBottom, pageBottom)
            let percentScroll = 100-Math.floor ( (CurrArtBottom-pageBottom)/(book.currArtEleBottom-pageBottom)*100 )
            if(percentScroll >= 100){
                percentScroll = 100
            }else if(percentScroll <= 0){
                percentScroll = 0;
            }
            progEle.style.width = percentScroll+"%";
            // console.log(percentScroll)
        }


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
            updateTitleOnScroll: updateTitleOnScroll,
            setCurrArticleEleId: setCurrArticleEleId,
            updateArtProgOnScroll: updateArtProgOnScroll
        },
        xhr: {
            getArticleOnSubMenuClick: getArticleOnSubMenuClick
        }
    }
})();

myjs.nav.navIntialize();
myjs.nav.hideShowOnClick();
myjs.nav.slideInOutOnSwipe();
myjs.theme.toggleTheme();
// myjs.article.updateTitleOnScroll();
myjs.article.updateArtProgOnScroll()
myjs.article.setCurrArticleEleId();
myjs.xhr.getArticleOnSubMenuClick();
