let wrapper=document.querySelector("#wrapper"),header=document.querySelector("header"),footer=document.querySelector("footer"),
imgsRodape=document.querySelector("#imgsRodape");

function getHeight(){
  return innerHeight-22;
}

function margemHeader(){
  wrapper.style.marginTop=(margemTopInt=min(header.offsetHeight))+"px";
}

function alternaFundo(){
  header.style.top=-scrollY/2+"px";
  footer.style.bottom=(scrollY-html.offsetHeight+innerHeight)/2+"px";
}

function min(a){
  let altura=getHeight();
  return a>altura? altura: a;
}

function margemFooter(){
  imgsRodape.style.display="";
  footer.style.paddingTop="";

  if(footer.offsetHeight+24>getHeight()) {
    imgsRodape.style.display="none";
    footer.style.paddingTop="60px";
  }

  wrapper.style.marginBottom=min(footer.offsetHeight)+"px";
}

function todasAsMargens(){
  margemHeader();
  margemFooter();
}

function tudo(){
  todasAsMargens();
  alternaFundo();
}

let prevOnload=onload;
tudo();
onload=function(){
  prevOnload();
  tudo();
}
addEventListener("resize",tudo);
addEventListener("scroll",alternaFundo);


// Popup

let comPopup=document.querySelectorAll(".comPopup"),popup=document.querySelector(".popup");

function abre(){
  popup.classList.remove("oculto");
}
function fecha(){
  popup.classList.add("oculto");
}


// Fechar qdo clicar fora

popup.addEventListener("click", function (e) {
  if(e.target==popup){
    fecha();
  }
});


// Abrir e fechar normal

for(let i=0; i<comPopup.length; i++)
  comPopup[i].addEventListener("click",abre);
document.querySelector(".fechar").addEventListener("click",fecha);
