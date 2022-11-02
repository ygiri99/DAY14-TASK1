var gdata = [],
  first = 0,
  dataPerPage = 5,
  noOfPages = 0;
var start,
  end,
  currentBtn = 1,
  navbtn;
//h1 creation
const h1 = document.createElement("h1");
h1.innerText = "E-MAIL DATA PAGINATION";
h1.id = "title";
h1.className = "text-center text-danger";
//p creation
const p = document.createElement("p");
p.innerText = "Details of 100 persons 5 per page";
p.setAttribute("class", "text-center text-primary");
p.id = "description";
//main div creation
const div = document.createElement("div");
div.className = "table-responsive m-1";
//table creation
const table = document.createElement("table");
table.className = "table table-bordered border-info";
table.id = "table";
//table head
const thead = document.createElement("thead");
thead.className = "table  table-dark";
//thead row creation
const tr = document.createElement("tr");
["Id", "Name", "E-mail"].forEach((theadname) => {
  const th = document.createElement("th");
  th.innerText = theadname;
  tr.appendChild(th);
});
thead.appendChild(tr);
//tbody creation
const tbody = document.createElement("tbody");
//table div append
table.append(thead, tbody);
div.append(table);

//window starting page data
const datareq = new XMLHttpRequest();

datareq.open(
  "GET",
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
);

datareq.send(null);

datareq.onload = () => {
  const data = JSON.parse(datareq.responseText);
  gdata = data;
  noOfPages = Math.ceil(gdata.length / dataPerPage);

  (start = 0), (end = dataPerPage);
  data.slice(start, end).forEach(({ id, name, email }) => {
    const trbody = document.createElement("tr");
    const tdid = document.createElement("td");
    tdid.innerText = id;
    const tdname = document.createElement("td");
    tdname.innerText = name;
    const tdemail = document.createElement("td");
    tdemail.innerText = email;
    trbody.append(tdid, tdname, tdemail);
    tbody.appendChild(trbody);
  });


//nav div creation
const divnav = document.createElement("div");
divnav.className = "d-flex justify-content-center";
divnav.id = "buttons";

//first buttons creation
const firstbtn = document.createElement("button");
firstbtn.className = "btn btn-primary text-white m-1";
firstbtn.innerText = "First";

//previous button creation
const prevbtn = document.createElement("button");
prevbtn.className = "btn btn-warning m-1";
prevbtn.innerText = "Prev";

//navbutton creation
const navdiv = document.createElement("div");
const navbtns = [...Array(noOfPages).keys()].map((i) => {
  navbtn = document.createElement("button");
  navbtn.className = "btn btn-outline-info m-1";
  const page = i + 1;
  navbtn.innerText = page;
  if(currentBtn == page)navbtn.className ="btn btn-outline-info active";
  //navbutton display function
  navbtn.addEventListener("click", () => {
    let b = page;
    const nend = dataPerPage * b;
    const nstart = nend - dataPerPage;
    displaydata(nstart,nend);
    (start = nstart), (end = nend);
  });
  
  return navbtn;
});
navdiv.append(...navbtns);

//next button creation
const nextbtn = document.createElement("button");
nextbtn.className = "btn btn-warning m-1";
nextbtn.innerHTML = "Next";

//last button creation
const lastbtn = document.createElement("button");
lastbtn.className = "btn btn-primary text-white m-1";
lastbtn.innerText = "Last";

//appending nav buttons
divnav.append(firstbtn, prevbtn, navdiv, nextbtn, lastbtn);
div.appendChild(divnav);

//appending in document
document.body.append(h1, p, div);



//display function for first,last,prev,next buttonsw
const displaydata = (dstart, dend) => {
  tbody.innerHTML = "";
  gdata.slice(dstart, dend).forEach(({ id, name, email }) => {
    const trbody = document.createElement("tr");
    const tdid = document.createElement("td");
    tdid.innerText = id;
    const tdname = document.createElement("td");
    tdname.innerText = name;
    const tdemail = document.createElement("td");
    tdemail.innerText = email;
    trbody.append(tdid, tdname, tdemail);
    tbody.appendChild(trbody);
  });
  (start = dstart), (end = dend);
};



//First button click action function
const show = (start) => {
  const fstart = start;
  const fend = fstart + dataPerPage;
  displaydata(fstart, fend);
  //firstbtn.disabled=true;
};

firstbtn.addEventListener("click", () => show(0));

//Previous button click action function
function pre() {
  if (end > dataPerPage) {
    const pstart = start - dataPerPage;
    const pend = end - dataPerPage;
    displaydata(pstart, pend);
  }
}
prevbtn.addEventListener("click", pre);

//Last button click action function
const lst = () => {
  if (start < gdata.length - dataPerPage) {
    const lstart = gdata.length - dataPerPage;
    const lend = gdata.length;
    displaydata(lstart, lend);
  }
};
lastbtn.addEventListener("click", lst);

//Next button click action function
const next = () => {
  if (end < gdata.length) {
    const nstart = start + dataPerPage;
    const nend = nstart + dataPerPage;
    displaydata(nstart, nend);
  }
};
nextbtn.addEventListener("click", next);
};