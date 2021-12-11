
// utils
function get(id) {
    return document.getElementById(id);
}

// constants
const LIGHT_THEME_PATH = "../css/light_theme.css";
const DARK_THEME_PATH = "../css/dark_theme.css";
const HEADER_PATH = "../html/header.html";
const FOOTER_PATH = "../html/footer.html";
const THEMES = { "light": LIGHT_THEME_PATH, "dark": DARK_THEME_PATH };
const DEFAULT_THEME = "dark";
const DEFAULT_THEME_PATH = THEMES[DEFAULT_THEME];

//variables
let currentTheme = DEFAULT_THEME;

//functions
function setTheme(theme_path) {
    fetch(theme_path)
        .then(res => res.text())
        .then(text => get("theme").innerHTML = text);
}

function decorHeader() {
    get(`header-navs__${PAGE_NAME}`).style.color = "var(--primary_color)";
}

function changeTheme(event) {
    currentTheme = currentTheme=="light"?"dark":"light";
    setTheme(THEMES[currentTheme]);
}

async function fillCommons() {
    //filling the header
    await fetch(HEADER_PATH)
        .then(res => res.text())
        .then(text => get("header").innerHTML = text);

    //filling the footer
    await fetch(FOOTER_PATH)
        .then(res => res.text())
        .then(text => get("footer").innerHTML = text);

    // setting properties of the header
    decorHeader();
    get("change-theme").onclick = changeTheme;
}

function setStyles(){
    get("landing").style.height = `${window.screen.height - window.screen.height*0.13}px`;
}

//statements
setTheme(DEFAULT_THEME_PATH); //recheck
fillCommons();
// setStyles(); 

