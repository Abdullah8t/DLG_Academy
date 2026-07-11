const html=document.getElementById("html");

const css=document.getElementById("css");

const js=document.getElementById("js");

const output=document.getElementById("output");

document.getElementById("run").onclick=function(){

const code=`

<html>

<head>

<style>

${css.value}

</style>

</head>

<body>

${html.value}

<script>

${js.value}

<\/script>

</body>

</html>

`;

output.srcdoc=code;

};

document.getElementById("clear").onclick=function(){

html.value="";

css.value="";

js.value="";

output.srcdoc="";

};

document.getElementById("save").onclick=function(){

localStorage.setItem("html",html.value);

localStorage.setItem("css",css.value);

localStorage.setItem("js",js.value);

alert("Project Saved");

};

window.onload=function(){

html.value=localStorage.getItem("html")||"";

css.value=localStorage.getItem("css")||"";

js.value=localStorage.getItem("js")||"";

};

document.getElementById("download").onclick=function(){

const code=`

<html>

<head>

<style>

${css.value}

</style>

</head>

<body>

${html.value}

<script>

${js.value}

<\/script>

</body>

</html>

`;

const blob=new Blob([code],{type:"text/html"});

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="project.html";

a.click();

}; 