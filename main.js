function changeSize()
{
  matchMedia('(max-height: 426px) and (orientation: landscape)').matches
  ? render(gameInformation)
  : renderTableInfo(gameInformation)
}

addEventListener('resize',changeSize);
addEventListener('DOMContentLoaded',changeSize);

function cargaNombre(event)
{
  event.preventDefault();
  
  localStorage.clear();  
  let nombreNav = document.getElementById("inpName").value;
  localStorage.setItem("nombre",nombreNav);
}

function insertarNombre()
{
  var localName = localStorage.getItem("nombre");
  document.getElementsByName("nombre-nav").forEach(inpName=>{
    inpName.innerHTML = localName;
  })
}

function load()
{
  document.getElementById("pagina1").style.display = "block";
  document.getElementById("pagina2").style.display = "none";
  document.getElementById("pagina3").style.display = "none";
}

function paginacion()
{ 
    const pag1 = document.getElementById("page-1");
    const pag2 = document.getElementById("page-2");
    const pag3 = document.getElementById("page-3");

    pag1.addEventListener("click", () => {
      document.getElementById("pagina1").style.display = "block";
      document.getElementById("pagina2").style.display = "none";
      document.getElementById("pagina3").style.display = "none";
      pag1.className = "active-pagination";
      pag3.className = pag1.className.replace( /(?:^|\s)active-pagination(?!\S)/g , '' );
      pag2.className =pag2.className.replace( /(?:^|\s)active-pagination(?!\S)/g , '' );
      });
      
      pag2.addEventListener("click", () => {
        document.getElementById("pagina1").style.display = "none";
        document.getElementById("pagina2").style.display = "block";
        document.getElementById("pagina3").style.display = "none";
      
        pag2.className = "active-pagination";
        pag1.className = pag1.className.replace( /(?:^|\s)active-pagination(?!\S)/g , '' );
        pag3.className =pag2.className.replace( /(?:^|\s)active-pagination(?!\S)/g , '' );
      });
    
      pag3.addEventListener("click", () => {
        document.getElementById("pagina1").style.display = "none";
        document.getElementById("pagina2").style.display = "none";
        document.getElementById("pagina3").style.display = "block";
        pag3.className = "active-pagination";
        pag1.className = pag1.className.replace( /(?:^|\s)active-pagination(?!\S)/g , '' );
        pag2.className =pag2.className.replace( /(?:^|\s)active-pagination(?!\S)/g , '' );
      });

}

function renderTableInfo(gameInformation)
{
  let dayAnterior=0;
  document.getElementById("tbody").innerHTML=``;
  document.getElementById("tbody2").innerHTML=``;
  gameInformation[0].GameList.forEach((data) => {
      let tr = document.createElement("tr");   
      if(dayAnterior!=data.Day)
      {
       tr.innerHTML = `<td rowspan="2">${data.Day}</td>`  
       dayAnterior=data.Day;
      }  
      tr.innerHTML +=  `
           <td>${data.Teams} <br> <a target="_blank" href=${data.Map}>${data.Location}</a></td>
           <td>${data.Times}</td>
           `;      
      document.getElementById("tbody").appendChild(tr);
    });
    dayAnterior=0;
    gameInformation[1].GameList.forEach((data) => {
      let tr = document.createElement("tr");
      if(dayAnterior!=data.Day)
      {
      tr.innerHTML = `
      <td rowspan="2">${data.Day}</td>`
      dayAnterior=data.Day;
      }      
      tr.innerHTML +=`
      <td>${data.Teams} <br> <a target="_blank" href=${data.Map}>${data.Location}</a></td>
      <td>${data.Times}</td>
      </tr>`;
      document.getElementById("tbody2").appendChild(tr);
    });
}

function render(gameInformation)
{
  document.getElementsByName("thead").forEach(elemento =>{
    elemento.innerHTML =`` ;
  });
  document.getElementById("tbody").innerHTML=``;
  document.getElementById("tbody2").innerHTML=``;

  gameInformation[0].GameList.forEach((data,index) => {
      let tr = document.createElement("tr");
      tr.id = "columna"+index;
      let id = "sep"+index;
      tr.innerHTML = `
      <td class="col-2" id="${id}" name="septemberColum" onclick="renderInfo(gameInformation[0],${index},'contenido')">${data.Teams} </td>
      </tr>`;
      document.getElementById("tbody").appendChild(tr);
    });
    gameInformation[1].GameList.forEach((data,index) => {
      let tr = document.createElement("tr");
      tr.id = "columnaB"+index;
      let id = "oct"+index;
      tr.innerHTML = `
      <td class="col-2" id="${id}" name="octoberColum" onclick="renderInfo(gameInformation[1],${index},'contenido2')">${data.Teams} </td>
      </tr>`;
      document.getElementById("tbody2").appendChild(tr);
    });
    let tr = document.createElement("td");
    tr.rowSpan = 9;
    tr.id = "contenido";
    document.getElementById("columna0").appendChild(tr); 
    let tr2 = document.createElement("td");
    tr2.rowSpan = 9;
    tr2.id = "contenido2";
    document.getElementById("columnaB0").appendChild(tr2);
    renderInfo(gameInformation[0],0,"contenido");
    renderInfo(gameInformation[1],0,"contenido2");  
}

function renderInfo(obj, objClick,idRow)
{
  let div = document.createElement("div");
  div.id = "contenido-game";
  div.className = "row";
  div.innerHTML =` 
  <div class="col-4">
  <p> Day: ${obj.GameList[objClick].Day} </p>
  <p> Location: ${obj.GameList[objClick].Location} </p>
  <p> Times: ${obj.GameList[objClick].Times} </p>
  </div>
  <iframe class="col-7" src=${obj.GameList[objClick].Map}></iframe>
  `;

  document.getElementById(idRow).innerHTML=``;
  document.getElementById(idRow).append(div);

  if(obj.Mounth=="SEPTEMBER")
  {
    document.getElementsByName("septemberColum").forEach(element => {
      element.className = element.className.replace( /(?:^|\s)active-nav(?!\S)/g , '' );
    });
    document.getElementById("sep"+objClick).className="active-nav";
  }

  if(obj.Mounth=="OCTOBER")
  {
    document.getElementsByName("octoberColum").forEach(element => {
      element.className = element.className.replace( /(?:^|\s)active-nav(?!\S)/g , '' );
    });
    document.getElementById("oct"+objClick).className="active-nav";
  }
}

function ocultarSecciones(id)
{ 
  document.getElementsByName("secciones").forEach(data=>{

    if(data.id!=id)
    {
      data.style.display="none";
    }
    else
    {
      data.style.display="block";
    }   
  })
}