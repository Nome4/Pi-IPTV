const slide=document.querySelector("#slide");
const btnsDisp=document.querySelectorAll("#escolherDisp button");
const slideshow=document.querySelector("#mostra");
let dimAnterior;
let apareceuSlide=false;
let slides;
let atual=0;
const radiosCont=document.querySelector("#mudaSlide");
let radios=[];
let largControles,radioVisivel;
const spanAtual=document.querySelector("#passoAtual"),spanTotal=document.querySelector("#numPassos");
const divControles=document.querySelector("#controles");


const infoSlides=[ // Posição 0 é o passo e 1 é url da img
  [
    [
      "Baixe o app Smart IPTV",
      ""
    ],
    [
      "Nos envie o endereço MAC para inserir o link",
      "1.JPG"
    ],
    [
      "Pronto, sua TV já está configurada",
      ""
    ]
  ],
  [
    [
      "Baixe o app Perfect Player na Play Store",
      "2.jpg"
    ],
    [
      "Clique no ícone de Configuração – canto superior direito",
      "3.jpg"
    ],
    [
      "Clique no Menu Geral",
      "4.jpg"
    ],
    [
      "No campo Playlist, coloque o link que te enviamos",
      "5.jpg"
    ],
    [
      "No campo EPG, coloque o link EPG que enviamos",
      "6.jpg"
    ],
    [
      "Clique em OK e no Menu, clique em Avançado",
      "7.jpg"
    ],
    [
      "Marque as opções Atribuir EPG e Descarregar Suposto Logo",
      "8.jpg"
    ],
    [
      "No Menu Reprodução, selecione Descodificado e mude para Hardware",
      "9.jpg"
    ],
    [
      "$", // $ vai significar "continua o mesmo"
      "10.jpg"
    ],
    [
      "Na opção Tamanho do buffer, coloque 2",
      "11.jpg"
    ],
    [
      "Ao terminar, volte para a tela inicial do Perfect Player e aguarde o carregamento das informações.",
      ""
    ]
  ],
  [
    [
      "Baixe o app GSE IPTV na App Store",
      ""
    ],
    [
      "Abra o app e clique no Menu",
      "12.jpg"
    ],
    [
      "Selecione a opção Remote Playlists",
      "13.jpg"
    ],
    [
      "Clique no ícone + e selecione a opção Add M3U URL",
      "14.jpg"
    ],
    [
      "No campo Playlist name, escolha um nome (por exemplo, CINE IPTV). No campo Playlist link, adicione o link que te enviamos e clique em Add",
      "15.jpg"
    ],
    [
      "Acesse novamente a opção no Menu: Remote Playlist e a playlist criada vai ser a última opção",
      "16.jpg"
    ],
    [
      "Clique na playlist e irá aparecer a lista de canais",
      "17.jpg"
    ]
  ],
  [
    [
      "<a href='https://br.ccm.net/download/baixaki-18214-ip-tv-player'>Baixe o IPTV Player aqui</a>",
      ""
    ],
    [
      "Abra o aplicativo e clique no Menu lateral, selecione Lista e Adicionar",
      "18.jpg"
    ],
    [
      "O IPTV Player vai fechar e abrir com uma janela, no campo Channel List URL (M3U format) coloque o link que te enviamos e clique em OK",
      "19.jpg"
    ],
    [
      "A lista de canais estará à direita",
      "20.jpg"
    ]
  ]
]

function resizeSlide(){
  slide.style.height=Math.min(innerHeight-(innerWidth<=500? 108: 62),600)+"px";
  dimAnterior=innerHeight;
}

function addText(el,txt){
  el.appendChild(document.createTextNode(txt));
}

function select(i,anim){
  if(radioVisivel){
    if(radios[atual]){
      radios[atual].classList.remove("atual");
    }
    radios[i].classList.add("atual");
  }

  if(slides[atual]){
    slides[atual].div.classList.remove("visivel");
  }

  slides[i].div.classList.add("visivel");
  spanAtual.innerHTML=i+1;

  if(anim){
    const atualMaiorQI=atual>i;

    function animaEl(nomeEl){
      const elAnt=slides[atual][nomeEl],
      elNovo=slides[i][nomeEl];

      function addClass(cls){
        elNovo.classList.add(cls);
        elAnt.classList.add(cls);

        setTimeout(function () {
          elNovo.classList.remove(cls);
          elAnt.classList.remove(cls);
        },250);
      }

      if(elNovo.par==undefined || elNovo.par!=elAnt.par){
        if(atualMaiorQI){
          addClass("esqdir");
        }
        else{
          addClass("diresq");
        }
      }
    }

    animaEl("passo");
    animaEl("img");
  }

  atual=i;
}

function atualizaBotoes(){
  while(radios.length>slides.length){
    radios.pop().remove();
  }
  while(radios.length<slides.length){
    const btn=document.createElement("button");
    radiosCont.appendChild(btn);
    const ind=radios.push(btn)-1;
    btn.onclick=function () {
      if(ind!=atual) select(ind,true);
    };
  }
}


addEventListener("orientationchange",function () {
  if(!apareceuSlide) return;
  
  let gambiarra=setInterval(function () {
    if(dimAnterior!=innerHeight){
      resizeSlide();
      clearInterval(gambiarra);

      if(largControles<=slideshow.offsetWidth){
        radioVisivel=true;
        divControles.classList.remove("telaPequena");
        if(radios.length!=slides.length){
          atualizaBotoes();
        }
        for(let i=0; i<slides.length; i++){
          if(i==atual){
            radios[i].classList.add("atual");
          }
          else{
            radios[i].classList.remove("atual");
          }
        }
      }
      else{
        radioVisivel=false;
        divControles.classList.add("telaPequena");
      }
    }
  },10);
});

for(let i=0; i<btnsDisp.length; i++){
  btnsDisp[i].addEventListener("click",function () {
    slide.classList.remove("superOculto");
    resizeSlide();
    apareceuSlide=true;


    // Carregar HTML dos slides

    slideshow.innerHTML="";
    slides=[];
    const vetorInfo=infoSlides[i];
    let pares=0;

    for(let j=0; j<vetorInfo.length; j++){
      const el=document.createElement("section");
      let passo=document.createElement("h3"),img=document.createElement("div");
      img.classList.add("imgCont");
      el.appendChild(passo);
      el.appendChild(img);

      let passoMobile=document.createElement("span");
      addText(passoMobile,"Passo "+(j+1)+"/"+vetorInfo.length+": ");
      passoMobile.classList.add("passoMobile");
      passo.appendChild(passoMobile);

      if(vetorInfo[j][0]=="$"){
        passo.innerHTML+=vetorInfo[j-1][0];
        pares++;
        passo.par=pares;
        slides[j-1].passo.par=pares;
      }
      else{
        passo.innerHTML+=vetorInfo[j][0];
      }

      if(vetorInfo[j][1]!=""){
        let src;
        if(vetorInfo[j][1]=="$"){
          src=vetorInfo[j-1][1];
          pares++;
          img.par=pares;
          slides[j-1].img.par=pares;
        }
        else{
          src=vetorInfo[j][1];
        }
        img.style.backgroundImage="url('"+src+"')";
      }
      else{
        el.classList.add("semImg");
        const htmlPasso=passo.innerHTML;
        passo.innerHTML="<span>"+htmlPasso+"</span>";
      }

      slides[j]={
        div:el,
        passo:passo,
        img:img
      };
      slideshow.appendChild(el);
    }

    spanTotal.innerHTML=slides.length;


    // Adiciona botões de mudar slide

    const largMin=77,largRadio=30;
    largControles=largMin+slides.length*largRadio
      +(innerWidth<1000? 0.06*innerWidth: 60); // Condizer com media query

    if(largControles<=slideshow.offsetWidth){
      atualizaBotoes();
      radioVisivel=true;
      divControles.classList.remove("telaPequena");
    }
    else{
      radioVisivel=false;
      divControles.classList.add("telaPequena");
    }

    select(0);


    // Transição scroll

    if(innerHeight<html.offsetHeight){ // Se tem scroll
      const frames=25;

      setTimeout(function () {
        const incr=1/frames*(html.offsetHeight-innerHeight-scrollY);
        let scroll=scrollY;

        function pararScroll(){
          clearInterval(parar);
          removeEventListener("resize",pararScroll);
        }

        addEventListener("resize",pararScroll);

        let parar=setInterval(function () {
          if(scrollY+innerHeight>=html.offsetHeight){
            pararScroll();
            return;
          }

          scroll+=incr;
          scrollTo(0,scroll);
        },10);
      },20);
    }
  });
}


// Slide

let btnPassar=document.querySelectorAll('#controles>button');
btnPassar[0].addEventListener("click",function () {
  if(atual>0){
    select(0,true);
  }
});
btnPassar[1].addEventListener("click",function () {
  if(atual>0){
    select(atual-1,true);
  }
});
btnPassar[2].addEventListener("click",function () {
  if(atual<slides.length-1){
    select(atual+1,true);
  }
});
btnPassar[3].addEventListener("click",function () {
  if(atual<slides.length-1){
    select(slides.length-1,true);
  }
});
