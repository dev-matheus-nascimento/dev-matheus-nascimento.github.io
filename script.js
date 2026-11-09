const d=document,r=d.documentElement,t=d.getElementById("themeSwitch"),g=d.getElementById("githubProjects"),u="devmatheus32";

let theme=localStorage.getItem("portfolio-theme")||"dark";

function setTheme(){
r.dataset.theme=theme;
t.textContent=theme==="dark"?"☀":"☾"
}

t.onclick=()=>{
theme=theme==="dark"?"light":"dark";
localStorage.setItem("portfolio-theme",theme);
setTheme()
};

setTheme();

async function github(){
try{
const[p,repos]=await Promise.all([
fetch(`https://api.github.com/users/${u}`).then(r=>r.ok?r.json():Promise.reject()),
fetch(`https://api.github.com/users/${u}/repos?sort=updated&per_page=8`).then(r=>r.ok?r.json():Promise.reject())
]);

d.getElementById("repoCount").textContent=p.public_repos;
d.getElementById("followerCount").textContent=p.followers;
d.getElementById("starCount").textContent=repos.reduce((n,r)=>n+r.stargazers_count,0);

const visible=repos
.filter(r=>!["mazinn444","devmatheus32.github.io","MoonGUI"].includes(r.name))
.slice(0,4);

g.innerHTML=visible.map(r=>`
<a class="github-mini" href="${r.html_url}" target="_blank" rel="noreferrer">
<h4>${r.name}</h4>
<p>${r.description||"Projeto sem descrição."}</p>
<div class="github-mini-meta">
<span>${r.language||"Código"}</span>
<span>★ ${r.stargazers_count}</span>
<span>⑂ ${r.forks_count}</span>
</div>
</a>`).join("")
}catch{
d.getElementById("repoCount").textContent=
d.getElementById("followerCount").textContent=
d.getElementById("starCount").textContent="--"
}
}

"requestIdleCallback"in window?requestIdleCallback(github):setTimeout(github,500);
