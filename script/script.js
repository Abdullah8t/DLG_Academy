const menuBtn = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

if(menuBtn){
    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e){
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

const topBtn = document.getElementById("topBtn");

if (topBtn) {
    window.addEventListener("scroll", () => {

        if(window.scrollY > 300){
            topBtn.style.display = "block";
        }else{
            topBtn.style.display = "none";
        }

    });

    topBtn.addEventListener("click", () => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

    });
}

window.addEventListener("load", () => {

    setTimeout(() => {
        alert("👋 Welcome to CodeMaster Academy!");
    }, 800);

});

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-12px)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
    });

});

function counter(id,start,end,duration){

    let obj=document.getElementById(id);

    let current=start;

    let increment=end/duration*10;

    let timer=setInterval(()=>{

        current+=increment;

        obj.innerHTML=Math.floor(current);

        if(current>=end){
            obj.innerHTML=end;
            clearInterval(timer);
        }

    },10);

}

const darkButton = document.getElementById("darkMode");

if(darkButton){

darkButton.onclick = function(){

document.body.classList.toggle("dark");

};

}

