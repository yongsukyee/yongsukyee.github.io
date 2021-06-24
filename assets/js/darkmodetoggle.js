/*
Toggle Dark-mode Button
References: https://dev.to/albertomontalesi/add-dark-mode-to-your-website-with-just-a-few-lines-of-code-5baf
            https://medium.com/geekculture/how-to-toggle-between-light-dark-mode-7efcb48d6211
            https://ryanfeigenbaum.com/dark-mode/
*/

document.getElementById('toggleTheme').addEventListener('click', function (e) {
    document.body.classList.toggle('dark');
    const target = e.target;
    target.classList.toggle('fa-moon');
    target.classList.toggle('fa-sun');
    
    localStorage.setItem("colorTheme", document.body.classList.contains("dark") ? "dark" : "light");
});
