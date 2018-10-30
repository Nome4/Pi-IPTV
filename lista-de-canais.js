const todos=document.querySelectorAll("#listao li");

const input=document.querySelector("#search input"),divSearch=document.querySelector("#search"),
divRes=document.querySelector("#resultados"),resContainer=document.querySelector("#resultContainer"),
h3res=document.querySelector("#result"),btnFechar=document.querySelector("#searchContainer .fechar"),
listao=document.querySelector("#listao");
const placeholder=input.placeholder;

function fechar(){
  resContainer.classList.add("oculto");
  btnFechar.classList.add("oculto");
  listao.classList.remove("oculto");
}

input.addEventListener("focus",function () {
  divSearch.classList.add("focado");
  input.placeholder="";
});
input.addEventListener("blur",function () {
  divSearch.classList.remove("focado");
  input.placeholder=placeholder;
});
btnFechar.addEventListener("click",function () {
  fechar();
  input.value="";
});


// Pesquisar!

function normalizar(str){
  let novaStr="";
  str=str.toLowerCase();

  for(let i=0; i<str.length; i++){
    if(str[i]=="." && (i==str.length-1 || str[i+1]==" ")){
      continue;
    }

    switch(str[i]){
      case "ã":
      case "á":
      case "â":
      case "à":
      novaStr+="a";
      break;

      case "ç":
      novaStr+="c";
      break;

      case "é":
      case "ê":
      novaStr+="e";
      break;

      case "í":
      novaStr+="i";
      break;

      case "ó":
      case "õ":
      case "ô":
      novaStr+="o";
      break;

      case "ú":
      novaStr+="u";
      break;

      case "-":
      if(str[i+1]==" "){
        i++;
      }
      else{
        novaStr+=" ";
      }
      break;

      case ".":
      novaStr+=",";
      break;

      default:
      novaStr+=str[i];
    }
  }

  return novaStr;
}

for(let i=0; i<todos.length; i++){
  todos[i].normal=normalizar(todos[i].textContent);
}


let termosAnt=[],posClasse=false;

input.addEventListener("input",function () {
  // Split que ignora + de 1 espaço

  function split(str){
    if(str=="") return[];
    let pos=0,v=[];
    for(let i=0; ; i++){
      if(str[i]==" "){
        if(i!=0) v.push(str.substring(pos,i));
        while(str[i+1]==" "){
          i++;
        }
        pos=i+1;
      }
      if(i==str.length-1){
        if(str[i]!=" ") v.push(str.substring(pos));
        return v;
      }
    }
  }

  let q=normalizar(input.value);

  if(q=="made by daniel"){
    html.innerHTML="<head><style>\
    html{\
      height:100%;\
    }\
    body{\
      display:flex;\
      justify-content:center;\
      align-items:center;\
      height:100%;\
      margin:0;\
    }\
    @keyframes anim{\
      0%{\
        background-position:0;\
      }\
      100%{\
        background-position:60000vw;\
      }\
    }\
    h1{\
      background: linear-gradient(to right,#ff0000,#ff7f00,#ffff00,#00ff00,#00ffff,#0000ff,#7f00ff,#ff0000);\
      -webkit-background-clip: text;\
      -webkit-text-fill-color: transparent;\
      background-position:0;\
      font-size: 15vw;\
      margin:0;\
      text-align:center;\
      animation:anim 600s linear infinite;\
    }\
    </style></head><body>\
    <h1>DAB DANIEL</h1>\
    </body>";
  }

  let termos=split(q);
  const numTermos=termos.length;

  if(numTermos==0 || (numTermos==termosAnt.length && function(){
    for(let i=0; i<numTermos; i++){
      if(termos[i]!=termosAnt[i]) return false;
    }
    return true;
  }())){
    if(listao.classList.contains("oculto")){
      fechar();
    };
    return;
  }

  termosAnt=termos;
  let corresps=[];


  // Quicksort

  function sortCorresps(left=0, right=corresps.length-1){
    let pivotIndex = Math.floor( (left + right) / 2);
    let pivot = corresps[pivotIndex].relev;

    let leftIndex = left;
    let rightIndex = right;

    while (leftIndex <= rightIndex){
      while(corresps[leftIndex].relev>pivot){
        leftIndex++;
      }

      while(corresps[rightIndex].relev<pivot){
        rightIndex--;
      }

      if (leftIndex <= rightIndex){
        let temp = corresps[leftIndex];
        corresps[leftIndex] = corresps[rightIndex];
        corresps[rightIndex] = temp;
        leftIndex++;
        rightIndex--;
      }
    }

    if (left < leftIndex - 1){
      sortCorresps(left, leftIndex-1);
    }

    if (right > leftIndex){
      sortCorresps(leftIndex, right);
    }
  }


  for(let i=0; i<todos.length; i++){
    const str=todos[i].normal;
    const termosStr=str.split(" ");
    let relev=0;

    for(let j=0; j<numTermos; j++){
      let max=0;

      function proc(v){
        for(let k=0; k<v.length; k++){
          const dif=Math.abs(k-j);

          if(v[k]==termos[j]){
            return 1000000-dif;
          }
          else{
            const ind=v[k].indexOf(termos[j]);
            if(ind==0){
              return 10000-dif;
            }
            else if(ind!=-1){
              return 100-dif;
            }
          }
        }
        return 0;
      }

      max=proc(termosStr);

      let alt=todos[i].dataset.alt;

      if(alt!=undefined){
        alt=alt.split(";");
        for(let k=0; k<alt.length; k++){
          const res=proc(alt[k].split(" "));
          if(res>max) max=res;
        }
      }

      if(max==0){
        relev=0;
        break;
      }

      relev+=max;
    }

    if(relev){
      corresps.push({
        str:todos[i].textContent,
        relev:relev
      });
    }
  }


  divRes.innerHTML="";
  if(!posClasse){
    html.classList.add("animPronta");
    posClasse=true;
  }

  if(btnFechar.classList.contains("oculto")){
    btnFechar.classList.remove("oculto");
    resContainer.classList.remove("oculto");
    listao.classList.add("oculto");
  }
  else{
    resContainer.classList.remove("transicao");
    void resContainer.offsetWidth; // Isso força o browser a reavaliar o CSS no elemento.
    resContainer.classList.add("transicao");
  }

  const len=corresps.length;

  if(len>0){
    sortCorresps();
    const plural=len>1;
    h3res.innerHTML=len+" cana"+(plural? "is": "l")+" encontrado"+(plural? "s": "");

    for(let i=0; i<len; i++){
      const li=document.createElement("li");
      li.appendChild(document.createTextNode(corresps[i].str));
      divRes.appendChild(li);
    }
  }

  else{
    h3res.innerHTML="Nenhum canal encontrado";
  }
});
