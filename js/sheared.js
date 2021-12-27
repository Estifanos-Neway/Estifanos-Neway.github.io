
// utils
function get(id) {
    return document.getElementById(id);
}

// constants

//*elements
const head = get("header");

//* common HTMLs
const HEADER_PATH = "../html/header.html";
const FOOTER_PATH = "../html/footer.html";

//* theme related
const LIGHT_THEME_PATH = "../css/light_theme.css";
const DARK_THEME_PATH = "../css/dark_theme.css";
const THEMES = { "light": LIGHT_THEME_PATH, "dark": DARK_THEME_PATH };
const DEFAULT_THEME = "light";
const DEFAULT_THEME_PATH = THEMES[DEFAULT_THEME];

//* cookie related
const date = new Date();
const cookiesExpireAfter = 10; //years
date.setTime(date.getTime() + cookiesExpireAfter * 365 * 24 * 60 * 60 * 1000);
const cookiesExpireAt = date.toUTCString();

// variables
let lastScrollY = window.scrollY;
let lastScrollDirection = -1;

//functions

function headMove() {
    let scrolledY = window.scrollY;
    let scrollDirection = (scrolledY - lastScrollY) / Math.abs(scrolledY - lastScrollY);
    lastScrollY = scrolledY;
    if (lastScrollDirection == scrollDirection) {
        return;
    } else if (scrollDirection == -1) {
        head.style.transform = "translateY(0)";
    } else {
        head.style.transform = "translateY(-80%)";
    }
    lastScrollDirection *= -1;
}

function cookieToArray() {
    let cookies = document.cookie;
    let cookieArray = {};
    let tempCookieArray = cookies.split(";");
    tempCookieArray.forEach(eachCookie => {
        cookieArray[eachCookie.substring(0, eachCookie.indexOf("="))] = eachCookie.substring(eachCookie.indexOf("=") + 1);
    })
    return cookieArray;
}

function setTheme(theme_path) {
    fetch(theme_path)
        .then(res => res.text())
        .then(text => get("theme").innerHTML = text);
}


function changeTheme() {
    currentTheme = currentTheme == "light" ? "dark" : "light";
    setTheme(THEMES[currentTheme]);
    document.cookie = "theme=" + currentTheme + ";expires=" + cookiesExpireAt + ";path=/";
}

function decorHeader() {
    get(`header__navs__${PAGE_NAME}`).style.color = "var(--primary_color-on-surface)";
}

function setCopyrightDate() {
    let now = new Date();
    get("footer__copyright__date").innerHTML = now.getFullYear();
}

async function fillCommons() {
    //filling the header
    await fetch(HEADER_PATH)
        .then(res => res.text())
        .then(text => head.innerHTML = text);

    //filling the footer
    await fetch(FOOTER_PATH)
        .then(res => res.text())
        .then(text => get("footer").innerHTML = text)
        .catch(() => { });

    // setting properties of the header
    decorHeader();
    get("header__right-icons-con__change-theme-icon").onclick = changeTheme;

    // setting properties of the footer
    setCopyrightDate();
}

//statements

//* initializers
let currentTheme;
let cookiesArray = cookieToArray();
if (Object.keys(cookiesArray).length > 0 && cookiesArray["theme"] !== undefined) {
    currentTheme = cookiesArray["theme"];
} else {
    document.cookie = "theme=" + DEFAULT_THEME + ";expires=" + cookiesExpireAt + ";path=/";
    currentTheme = DEFAULT_THEME;
}
setTheme(THEMES[currentTheme]);
fillCommons();

head.onclick = () => {
    if (get("header__right-icons-con__change-theme-icon").onclick == null) {
        get("header__right-icons-con__change-theme-icon").onclick = changeTheme;
    }
}

//* setting event listeners
window.onscroll = headMove;

