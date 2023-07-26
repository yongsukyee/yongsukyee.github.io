/*
Toggle Dark-mode Button
References: https://traveling-coderman.net/code/light-mode/
            https://www.albertovarela.net/blog/2022/07/implementing-light-dark-mode/
            https://dev.to/albertomontalesi/add-dark-mode-to-your-website-with-just-a-few-lines-of-code-5baf
            https://ryanfeigenbaum.com/dark-mode/
            https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/
*/

function isLight() {
    return localStorage.getItem("light-mode");
}

function toggleRootClass() {
    document.querySelector("body").classList.toggle("light");
}

function toggleLocalStorageItem() {
    if (isLight()) {
        localStorage.removeItem("light-mode");
    } else {
        localStorage.setItem("light-mode", "set");
    }
}

if (isLight()) {
    toggleRootClass();
}

document.querySelector(".theme-icon").addEventListener("click", function () {
    toggleLocalStorageItem();
    toggleRootClass();
});
