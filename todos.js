let html=document.documentElement;
html.classList.remove("semJS");

let nav=document.querySelector("nav"),main=document.querySelector("main"),
botaoColapsa=document.querySelector("#resizer>button");

let margemTopInt;
const alturaNavColaps=22;
let forcarDescolapso=innerWidth<=500 || innerHeight<=500? -1: 1;
let jaColapsou=false;

function alturaNavFixa(){
  return innerWidth<=500? 96: 60;
}

let tamMargem=innerWidth<=500? 0: -2;
let temStyle=false,style;

function colapsaNav(){
  if(scrollY>(margemTopInt||0)){
    if(!jaColapsou){
      jaColapsou=true;
      if(forcarDescolapso==-1) nav.classList.add("colapsada");
      nav.classList.add("fixa");
      main.style.borderTop=alturaNavFixa()+(tamMargem<0? -tamMargem: 0)+"px solid transparent";
      main.style.bottom="1e-10px"; // ??? Não Mexa
    }
  }
  else{
    if(jaColapsou){
      jaColapsou=false;
      tamMargem=alturaNavFixa()-nav.offsetHeight;
      if(tamMargem>0 && !temStyle && html.classList.contains("transicaoPronta")){
        temStyle=true;
        style=document.createElement("style");
        style.appendChild(document.createTextNode(
          "@-webkit-keyframes main{\
            0%{\
              border-top:"+tamMargem+"px solid transparent;\
            }\
            100%{\
              border-top:0px solid transparent;\
            }\
          }\
          @keyframes main{\
            0%{\
              border-top:"+tamMargem+"px solid transparent;\
            }\
            100%{\
              border-top:0px solid transparent;\
            }\
          }\
          main{\
            -webkit-animation:main 200ms linear forwards;\
            animation:main 200ms linear forwards;\
          }"
        ));
        document.head.appendChild(style);
        setTimeout(function () {
          style.remove();
          temStyle=false;
          main.style.borderTop="0px solid transparent";
        },200);
      }
      else{
        main.style.borderTop="0px solid transparent";
      }
      main.style.bottom="0"; // Se tirar essa linha tbm buga
      nav.classList.remove("fixa");
      nav.classList.remove("colapsada");
    }
  }
}

colapsaNav();
onload=function(){
  html.classList.add("transicaoPronta");
}
addEventListener("scroll",colapsaNav);
addEventListener("resize",colapsaNav);
botaoColapsa.addEventListener("click",function (e) {
  forcarDescolapso*=-1;
  nav.classList.toggle("colapsada");
});


// Remover borda azul feia

function removeBorda(){
  html.classList.add("removerBorda");
  removeEventListener("mousemove",removeBorda);
}

addEventListener("mousemove",removeBorda);
