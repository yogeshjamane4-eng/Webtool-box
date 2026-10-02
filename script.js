/* =========================
   WEBTOOLBOX PREMIUM V1
   Pure HTML + CSS + JS
========================= */

const tools = [

{
 id:"qr",
 title:"QR Generator",
 icon:"▦",
 category:"qr",
 glow:"#7c5cff",
 desc:"Create QR codes from text, links, phone numbers or Wi-Fi.",
},

{
 id:"word",
 title:"Word Counter",
 icon:"Aa",
 category:"text",
 glow:"#00d9ff",
 desc:"Count words, characters and spaces instantly."
},

{
 id:"char",
 title:"Character Counter",
 icon:"#",
 category:"text",
 glow:"#00d9ff",
 desc:"Count characters with and without spaces."
},

{
 id:"case",
 title:"Case Converter",
 icon:"Aa",
 category:"text",
 glow:"#00d9ff",
 desc:"Convert text to uppercase, lowercase or title case."
},

{
 id:"spaces",
 title:"Space Cleaner",
 icon:"↔",
 category:"text",
 glow:"#00d9ff",
 desc:"Remove unnecessary extra spaces."
},

{
 id:"duplicate",
 title:"Duplicate Remover",
 icon:"≡",
 category:"text",
 glow:"#00d9ff",
 desc:"Remove duplicate lines from your text."
},

{
 id:"password",
 title:"Password Generator",
 icon:"🔐",
 category:"security",
 glow:"#ff4fd8",
 desc:"Generate strong random passwords."
},

{
 id:"strength",
 title:"Password Strength",
 icon:"◈",
 category:"security",
 glow:"#ff4fd8",
 desc:"Check how strong your password is."
},

{
 id:"random",
 title:"Random String",
 icon:"✦",
 category:"security",
 glow:"#ff4fd8",
 desc:"Generate random strings instantly."
},

{
 id:"percentage",
 title:"Percentage Calculator",
 icon:"%",
 category:"calc",
 glow:"#62f5a7",
 desc:"Calculate percentages quickly."
},

{
 id:"age",
 title:"Age Calculator",
 icon:"⌛",
 category:"calc",
 glow:"#62f5a7",
 desc:"Calculate your exact age."
},

{
 id:"temperature",
 title:"Temperature",
 icon:"℃",
 category:"calc",
 glow:"#62f5a7",
 desc:"Convert Celsius, Fahrenheit and Kelvin."
},

{
 id:"json",
 title:"JSON Formatter",
 icon:"{}",
 category:"dev",
 glow:"#ffb84d",
 desc:"Format and validate JSON."
},

{
 id:"url",
 title:"URL Encoder",
 icon:"🔗",
 category:"dev",
 glow:"#ffb84d",
 desc:"Encode or decode URLs."
},

{
 id:"color",
 title:"Color Picker",
 icon:"◉",
 category:"dev",
 glow:"#ffb84d",
 desc:"Pick a color and get HEX/RGB values."
},

{
 id:"resize",
 title:"Image Resizer",
 icon:"▧",
 category:"image",
 glow:"#00e0a4",
 desc:"Resize images directly in your browser."
},

{
 id:"compress",
 title:"Image Compressor",
 icon:"◌",
 category:"image",
 glow:"#00e0a4",
 desc:"Compress images using browser canvas."
},

{
 id:"converter",
 title:"Image Converter",
 icon:"⇄",
 category:"image",
 glow:"#00e0a4",
 desc:"Convert images to PNG, JPEG or WEBP."
}

];

let favorites =
JSON.parse(localStorage.getItem("wtb_favorites") || "[]");

let recent =
JSON.parse(localStorage.getItem("wtb_recent") || "[]");

let currentTool = null;


/* =========================
   START
========================= */

window.addEventListener("load",()=>{

  setTimeout(()=>{
    document.getElementById("splash").style.display="none";
  },3200);

  renderTools(tools);

});


/* =========================
   RENDER TOOLS
========================= */

function renderTools(list){

  const grid=document.getElementById("toolsGrid");

  grid.innerHTML="";

  document.getElementById("toolCount").textContent=
    list.length+" tools";

  list.forEach((tool,index)=>{

    const card=document.createElement("div");

    card.className="tool-card";

    card.style.setProperty("--glow",tool.glow);

    card.style.animationDelay=(index*35)+"ms";

    card.onclick=()=>{
      openTool(tool.id);
    };

    const fav=favorites.includes(tool.id);

    card.innerHTML=`

      <button
        class="star ${fav?"active":""}"
        onclick="toggleFavorite(event,'${tool.id}')">
        ${fav?"★":"☆"}
      </button>

      <div class="tool-icon">${tool.icon}</div>

      <h3>${tool.title}</h3>

      <p>${tool.desc}</p>

    `;

    grid.appendChild(card);

  });

}


/* =========================
   SEARCH
========================= */

function searchTools(){

  const q=
    document.getElementById("searchInput")
    .value
    .toLowerCase()
    .trim();

  const result=tools.filter(t=>
    t.title.toLowerCase().includes(q) ||
    t.desc.toLowerCase().includes(q) ||
    t.category.includes(q)
  );

  renderTools(result);

}


/* =========================
   FILTER
========================= */

function filterTools(category,btn){

  document.querySelectorAll(".cat")
    .forEach(x=>x.classList.remove("active"));

  btn.classList.add("active");

  if(category==="all"){
    renderTools(tools);
  }else{
    renderTools(
      tools.filter(t=>t.category===category)
    );
  }

}


/* =========================
   FAVORITES
========================= */

function toggleFavorite(e,id){

  e.stopPropagation();

  if(favorites.includes(id)){

    favorites=favorites.filter(x=>x!==id);

    toast("Removed from favorites");

  }else{

    favorites.push(id);

    toast("⭐ Added to favorites");

  }

  localStorage.setItem(
    "wtb_favorites",
    JSON.stringify(favorites)
  );

  renderTools(tools);

}


function showSection(section){

  document.getElementById("home")
    .classList.add("hidden");

  document.getElementById("favorites")
    .classList.add("hidden");

  document.getElementById("recent")
    .classList.add("hidden");

  if(section==="favorites"){
    document.getElementById("favorites")
      .classList.remove("hidden");

    renderSpecial(
      "favoriteGrid",
      favorites.map(id=>tools.find(t=>t.id===id))
      .filter(Boolean)
    );

  }

  if(section==="recent"){
    document.getElementById("recent")
      .classList.remove("hidden");

    renderSpecial(
      "recentGrid",
      recent.map(id=>tools.find(t=>t.id===id))
      .filter(Boolean)
    );

  }

}


function renderSpecial(id,list){

  const grid=document.getElementById(id);

  grid.innerHTML="";

  if(!list.length){

    grid.innerHTML=`
      <div style="
      grid-column:1/-1;
      text-align:center;
      padding:60px;
      color:var(--muted)">
        Nothing here yet ✨
      </div>
    `;

    return;
  }

  list.forEach(tool=>{

    const card=document.createElement("div");

    card.className="tool-card";

    card.style.setProperty("--glow",tool.glow);

    card.onclick=()=>openTool(tool.id);

    card.innerHTML=`

      <button
      class="star active"
      onclick="toggleFavorite(event,'${tool.id}')">
      ★
      </button>

      <div class="tool-icon">${tool.icon}</div>
      <h3>${tool.title}</h3>
      <p>${tool.desc}</p>

    `;

    grid.appendChild(card);

  });

}


/* =========================
   RECENT
========================= */

function addRecent(id){

  recent=recent.filter(x=>x!==id);

  recent.unshift(id);

  recent=recent.slice(0,8);

  localStorage.setItem(
    "wtb_recent",
    JSON.stringify(recent)
  );

}


/* =========================
   OPEN TOOL
========================= */

function openTool(id){

  const tool=tools.find(t=>t.id===id);

  if(!tool)return;

  currentTool=tool;

  addRecent(id);

  document.getElementById("modalIcon").textContent=
    tool.icon;

  document.getElementById("modalTitle").textContent=
    tool.title;

  document.getElementById("modalDescription").textContent=
    tool.desc;

  document.getElementById("modalCategory").textContent=
    tool.category;

  document.getElementById("toolBody").innerHTML=
    getToolHTML(id);

  document.getElementById("toolModal")
    .classList.add("show");

}


function closeTool(){

  document.getElementById("toolModal")
    .classList.remove("show");

  currentTool=null;

}


/* =========================
   TOOL INTERFACES
========================= */

function getToolHTML(id){

switch(id){

/* QR */

case "qr":

return `

<select id="qrType">
<option value="text">Text / URL</option>
<option value="phone">Phone</option>
<option value="wifi">Wi-Fi</option>
</select>

<input id="qrInput"
class="input"
placeholder="Enter text or URL">

<div id="wifiFields" class="hidden">

<input id="wifiName"
class="input"
placeholder="Wi-Fi name">

<input id="wifiPass"
class="input"
placeholder="Wi-Fi password">

</div>

<button class="primary full"
onclick="generateQR()">
⚡ Generate QR
</button>

<div id="qrResult" class="qr-result"></div>

`;


/* WORD */

case "word":

return `

<textarea id="textTool"
placeholder="Type or paste your text..."></textarea>

<button class="primary full"
onclick="countWords()">
Calculate ✨
</button>

<div id="wordResult" class="result"></div>

`;


/* CHARACTER */

case "char":

return `

<textarea id="textTool"
placeholder="Enter your text..."></textarea>

<button class="primary full"
onclick="countCharacters()">
Count Characters
</button>

<div id="charResult" class="result"></div>

`;


/* CASE */

case "case":

return `

<textarea id="textTool"
placeholder="Enter text..."></textarea>

<button class="secondary full"
onclick="convertCase('upper')">
UPPERCASE
</button>

<button class="secondary full"
onclick="convertCase('lower')">
lowercase
</button>

<button class="primary full"
onclick="convertCase('title')">
Title Case
</button>

<div id="caseResult" class="result"></div>

`;


/* SPACES */

case "spaces":

return `

<textarea id="textTool"
placeholder="Paste text with extra spaces..."></textarea>

<button class="primary full"
onclick="cleanSpaces()">
✨ Clean Spaces
</button>

<div id="spaceResult" class="result"></div>

`;


/* DUPLICATE */

case "duplicate":

return `

<textarea id="textTool"
placeholder="One line per item..."></textarea>

<button class="primary full"
onclick="removeDuplicates()">
Remove Duplicates
</button>

<div id="duplicateResult" class="result"></div>

`;


/* PASSWORD */

case "password":

return `

<input id="passLength"
class="input"
type="number"
value="16"
min="4"
max="64"
placeholder="Length">

<button class="primary full"
onclick="generatePassword()">
🔐 Generate Password
</button>

<div id="passResult" class="result"></div>

`;


/* STRENGTH */

case "strength":

return `

<input id="strengthInput"
class="input"
type="text"
placeholder="Enter password">

<button class="primary full"
onclick="checkStrength()">
Check Strength
</button>

<div id="strengthResult" class="result"></div>

`;


/* RANDOM */

case "random":

return `

<input id="randomLength"
class="input"
type="number"
value="20"
placeholder="Length">

<button class="primary full"
onclick="randomString()">
Generate Random String
</button>

<div id="randomResult" class="result"></div>

`;


/* PERCENTAGE */

case "percentage":

return `

<input id="percentA"
class="input"
type="number"
placeholder="Percentage">

<input id="percentB"
class="input"
type="number"
placeholder="Value">

<button class="primary full"
onclick="percentage()">
Calculate
</button>

<div id="percentResult" class="result"></div>

`;


/* AGE */

case "age":

return `

<input id="birthDate"
class="input"
type="date">

<button class="primary full"
onclick="calculateAge()">
Calculate Age
</button>

<div id="ageResult" class="result"></div>

`;


/* TEMPERATURE */

case "temperature":

return `

<input id="tempValue"
class="input"
type="number"
placeholder="Temperature">

<select id="tempFrom">
<option value="c">Celsius</option>
<option value="f">Fahrenheit</option>
<option value="k">Kelvin</option>
</select>

<select id="tempTo">
<option value="f">Fahrenheit</option>
<option value="c">Celsius</option>
<option value="k">Kelvin</option>
</select>

<button class="primary full"
onclick="convertTemperature()">
Convert
</button>

<div id="tempResult" class="result"></div>

`;


/* JSON */

case "json":

return `

<textarea id="jsonInput"
placeholder='{"name":"Yogesh","tool":"WebToolBox"}'></textarea>

<button class="primary full"
onclick="formatJSON()">
Format JSON
</button>

<div id="jsonResult" class="result"></div>

`;


/* URL */

case "url":

return `

<textarea id="urlInput"
placeholder="Enter URL or text..."></textarea>

<button class="secondary full"
onclick="encodeURL()">
Encode
</button>

<button class="primary full"
onclick="decodeURL()">
Decode
</button>

<div id="urlResult" class="result"></div>

`;


/* COLOR */

case "color":

return `

<input id="colorInput"
type="color"
value="#7c5cff"
class="input"
style="height:80px">

<button class="primary full"
onclick="getColor()">
Get Color
</button>

<div id="colorResult" class="result"></div>

`;


/* RESIZE */

case "resize":

return `

<input id="resizeFile"
class="input"
type="file"
accept="image/*">

<input id="resizeWidth"
class="input"
type="number"
placeholder="New width">

<button class="primary full"
onclick="resizeImage()">
Resize Image
</button>

<div id="resizeResult"></div>

`;


/* COMPRESS */

case "compress":

return `

<input id="compressFile"
class="input"
type="file"
accept="image/*">

<select id="compressQuality">
<option value=".9">High Quality</option>
<option value=".7">Medium</option>
<option value=".5">Small Size</option>
<option value=".3">Very Small</option>
</select>

<button class="primary full"
onclick="compressImage()">
Compress Image
</button>

<div id="compressResult"></div>

`;


/* CONVERTER */

case "converter":

return `

<input id="convertFile"
class="input"
type="file"
accept="image/*">

<select id="convertFormat">
<option value="image/png">PNG</option>
<option value="image/jpeg">JPEG</option>
<option value="image/webp">WEBP</option>
</select>

<button class="primary full"
onclick="convertImage()">
Convert Image
</button>

<div id="convertResult"></div>

`;

}

}


/* =========================
   QR
========================= */

document.addEventListener("change",e=>{

  if(e.target.id==="qrType"){

    const wifi=
      document.getElementById("wifiFields");

    if(e.target.value==="wifi")
      wifi.classList.remove("hidden");
    else
      wifi.classList.add("hidden");

  }

});


function generateQR(){

  const type=document.getElementById("qrType").value;

  let data="";

  if(type==="wifi"){

    const ssid=document.getElementById("wifiName").value;

    const pass=document.getElementById("wifiPass").value;

    if(!ssid){
      toast("Enter Wi-Fi name");
      return;
    }

    data=`WIFI:T:WPA;S:${ssid};P:${pass};;`;

  }else{

    data=document.getElementById("qrInput").value.trim();

  }

  if(!data){

    toast("Enter something first");

    return;

  }

  const result=document.getElementById("qrResult");

  result.classList.remove("ready");

  result.innerHTML=`
    <div style="padding:25px">
      <div class="loader" style="margin:auto">
        <i></i>
      </div>
      <p style="margin-top:15px;color:#888">
      Creating your QR...
      </p>
    </div>
  `;

  result.style.display="block";

  setTimeout(()=>{

    const url=
      "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data="
      +encodeURIComponent(data);

    result.innerHTML=`

      <div class="qr-shine">

        <img src="${url}" alt="QR Code">

      </div>

      <p style="margin:15px 0;color:#888">
        QR Code Ready ✨
      </p>

      <button class="primary"
      onclick="downloadQR('${url}')">
      ↓ Download QR
      </button>

    `;

    result.classList.add("ready");

    toast("✨ QR Code Ready!");

  },700);

}


function downloadQR(url){

  const a=document.createElement("a");

  a.href=url;
  a.download="WebToolBox-QR.png";

  document.body.appendChild(a);
  a.click();
  a.remove();

  toast("QR download started");

}


/* =========================
   TEXT TOOLS
========================= */

function countWords(){

  const text=document.getElementById("textTool").value;

  const words=text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  document.getElementById("wordResult").textContent=
`Words: ${words}
Characters: ${text.length}
Characters without spaces: ${text.replace(/\s/g,"").length}`;

}


function countCharacters(){

  const text=document.getElementById("textTool").value;

  document.getElementById("charResult").textContent=
`Characters: ${text.length}
Without spaces: ${text.replace(/\s/g,"").length}
Words: ${text.trim()?text.trim().split(/\s+/).length:0}`;

}


function convertCase(type){

  const text=document.getElementById("textTool").value;

  let result=text;

  if(type==="upper")
    result=text.toUpperCase();

  if(type==="lower")
    result=text.toLowerCase();

  if(type==="title")
    result=text.toLowerCase()
      .replace(/\b\w/g,c=>c.toUpperCase());

  document.getElementById("caseResult").textContent=result;

}


function cleanSpaces(){

  const text=document.getElementById("textTool").value;

  document.getElementById("spaceResult").textContent=
    text.replace(/\s+/g," ").trim();

}


function removeDuplicates(){

  const text=document.getElementById("textTool").value;

  const lines=text.split("\n");

  const unique=[...new Set(
    lines.map(x=>x.trim())
    .filter(Boolean)
  )];

  document.getElementById("duplicateResult").textContent=
    unique.join("\n");

}


/* =========================
   SECURITY
========================= */

function generatePassword(){

  const len=Math.max(
    4,
    Math.min(
      64,
      Number(document.getElementById("passLength").value)||16
    )
  );

  const chars=
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";

  let out="";

  const array=new Uint32Array(len);

  crypto.getRandomValues(array);

  for(let i=0;i<len;i++)
    out+=chars[array[i]%chars.length];

  document.getElementById("passResult").innerHTML=
    `<b>${escapeHTML(out)}</b>
     <br><button class="secondary"
     onclick="copyText('${escapeAttr(out)}')">
     Copy
     </button>`;

}


function checkStrength(){

  const p=document.getElementById("strengthInput").value;

  let score=0;

  if(p.length>=8)score++;

  if(/[A-Z]/.test(p))score++;

  if(/[a-z]/.test(p))score++;

  if(/[0-9]/.test(p))score++;

  if(/[^A-Za-z0-9]/.test(p))score++;

  let label=
    score<=2?"Weak":
    score===3?"Medium":
    score===4?"Strong":"Very Strong";

  document.getElementById("strengthResult").textContent=
    `Strength: ${label}\nScore: ${score}/5`;

}


function randomString(){

  const len=Math.max(
    1,
    Math.min(
      100,
      Number(document.getElementById("randomLength").value)||20
    )
  );

  const chars=
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result="";

  const arr=new Uint32Array(len);

  crypto.getRandomValues(arr);

  for(let i=0;i<len;i++)
    result+=chars[arr[i]%chars.length];

  document.getElementById("randomResult").textContent=result;

}


/* =========================
   CALCULATORS
========================= */

function percentage(){

  const a=Number(
    document.getElementById("percentA").value
  );

  const b=Number(
    document.getElementById("percentB").value
  );

  document.getElementById("percentResult").textContent=
    `${a}% of ${b} = ${(a*b)/100}`;

}


function calculateAge(){

  const value=
    document.getElementById("birthDate").value;

  if(!value){

    toast("Select birth date");

    return;

  }

  const birth=new Date(value);

  const today=new Date();

  let age=today.getFullYear()-birth.getFullYear();

  const month=today.getMonth()-birth.getMonth();

  if(
    month<0 ||
    (month===0 && today.getDate()<birth.getDate())
  ){
    age--;
  }

  document.getElementById("ageResult").textContent=
    `Your age is ${age} years.`;

}


function convertTemperature(){

  const v=Number(
    document.getElementById("tempValue").value
  );

  const from=document.getElementById("tempFrom").value;

  const to=document.getElementById("tempTo").value;

  let c;

  if(from==="c")c=v;
  if(from==="f")c=(v-32)*5/9;
  if(from==="k")c=v-273.15;

  let result;

  if(to==="c")result=c;
  if(to==="f")result=c*9/5+32;
  if(to==="k")result=c+273.15;

  document.getElementById("tempResult").textContent=
    result.toFixed(2);

}


/* =========================
   DEVELOPER
========================= */

function formatJSON(){

  const input=
    document.getElementById("jsonInput").value;

  try{

    const parsed=JSON.parse(input);

    document.getElementById("jsonResult").textContent=
      JSON.stringify(parsed,null,2);

    toast("✓ Valid JSON");

  }catch(e){

    document.getElementById("jsonResult").textContent=
      "Invalid JSON\n\n"+e.message;

    toast("Invalid JSON");

  }

}


function encodeURL(){

  const text=document.getElementById("urlInput").value;

  document.getElementById("urlResult").textContent=
    encodeURIComponent(text);

}


function decodeURL(){

  const text=document.getElementById("urlInput").value;

  try{

    document.getElementById("urlResult").textContent=
      decodeURIComponent(text);

  }catch{

    document.getElementById("urlResult").textContent=
      "Invalid encoded URL";

  }

}


function getColor(){

  const color=
    document.getElementById("colorInput").value;

  const r=parseInt(color.substr(1,2),16);

  const g=parseInt(color.substr(3,2),16);

  const b=parseInt(color.substr(5,2),16);

  document.getElementById("colorResult").textContent=
`HEX: ${color}
RGB: rgb(${r}, ${g}, ${b})`;

}


/* =========================
   IMAGE TOOLS
========================= */

function loadImage(file,callback){

  if(!file){

    toast("Choose an image");

    return;

  }

  const reader=new FileReader();

  reader.onload=e=>{

    const img=new Image();

    img.onload=()=>callback(img);

    img.src=e.target.result;

  };

  reader.readAsDataURL(file);

}


function resizeImage(){

  const file=
    document.getElementById("resizeFile").files[0];

  const width=
    Number(document.getElementById("resizeWidth").value);

  if(!width){

    toast("Enter width");

    return;

  }

  loadImage(file,img=>{

    const ratio=width/img.width;

    const canvas=document.createElement("canvas");

    canvas.width=width;

    canvas.height=Math.round(img.height*ratio);

    const ctx=canvas.getContext("2d");

    ctx.drawImage(img,0,0,canvas.width,canvas.height);

    canvas.toBlob(blob=>{

      const url=URL.createObjectURL(blob);

      document.getElementById("resizeResult").innerHTML=`

        <img class="image-preview"
        src="${url}">

        <a class="primary"
        style="display:block;text-align:center;text-decoration:none"
        href="${url}"
        download="resized-image.png">
        ↓ Download Image
        </a>

      `;

      toast("✨ Image resized");

    },"image/png");

  });

}


function compressImage(){

  const file=
    document.getElementById("compressFile").files[0];

  const quality=
    Number(document.getElementById("compressQuality").value);

  loadImage(file,img=>{

    const canvas=document.createElement("canvas");

    canvas.width=img.width;
    canvas.height=img.height;

    const ctx=canvas.getContext("2d");

    ctx.drawImage(img,0,0);

    canvas.toBlob(blob=>{

      const url=URL.createObjectURL(blob);

      const oldSize=(file.size/1024).toFixed(1);

      const newSize=(blob.size/1024).toFixed(1);

      document.getElementById("compressResult").innerHTML=`

        <img class="image-preview"
        src="${url}">

        <div class="result">
        Original: ${oldSize} KB
        <br>
        Compressed: ${newSize} KB
        </div>

        <a class="primary"
        style="display:block;text-align:center;text-decoration:none"
        href="${url}"
        download="compressed-image.jpg">
        ↓ Download
        </a>

      `;

      toast("⚡ Image compressed");

    },"image/jpeg",quality);

  });

}


function convertImage(){

  const file=
    document.getElementById("convertFile").files[0];

  const format=
    document.getElementById("convertFormat").value;

  loadImage(file,img=>{

    const canvas=document.createElement("canvas");

    canvas.width=img.width;
    canvas.height=img.height;

    const ctx=canvas.getContext("2d");

    ctx.drawImage(img,0,0);

    canvas.toBlob(blob=>{

      const url=URL.createObjectURL(blob);

      const ext=
        format==="image/png"?"png":
        format==="image/webp"?"webp":"jpg";

      document.getElementById("convertResult").innerHTML=`

        <img class="image-preview"
        src="${url}">

        <a class="primary"
        style="display:block;text-align:center;text-decoration:none"
        href="${url}"
        download="converted-image.${ext}">
        ↓ Download ${ext.toUpperCase()}
        </a>

      `;

      toast("✨ Image converted");

    },format,.9);

  });

}


/* =========================
   THEME
========================= */

function toggleTheme(){

  document.body.classList.toggle("light");

  const light=
    document.body.classList.contains("light");

  localStorage.setItem(
    "wtb_theme",
    light?"light":"dark"
  );

  document.getElementById("themeBtn").textContent=
    light?"☀":"☾";

  toast(light?"☀ Light mode":"☾ Dark mode");

}


if(localStorage.getItem("wtb_theme")==="light"){

  document.body.classList.add("light");

  setTimeout(()=>{
    document.getElementById("themeBtn").textContent="☀";
  },0);

}


/* =========================
   PROFILE
========================= */

function openProfile(){

  document.getElementById("profileModal")
    .classList.add("show");

  const saved=
    localStorage.getItem("wtb_profile_name");

  if(saved){

    document.getElementById("profileName").value=saved;

    document.getElementById("profileResult").textContent=
      "Welcome back, "+saved+" ✨";

  }

}


function closeProfile(){

  document.getElementById("profileModal")
    .classList.remove("show");

}


function saveProfile(){

  const name=
    document.getElementById("profileName")
    .value.trim();

  if(!name){

    toast("Enter your name");

    return;

  }

  localStorage.setItem(
    "wtb_profile_name",
    name
  );

  document.getElementById("profileResult").textContent=
    "Profile saved locally ✨";

  toast("Welcome, "+name+"!");

}


/* =========================
   NAVIGATION
========================= */

function goHome(){

  document.getElementById("home")
    .classList.remove("hidden");

  document.getElementById("favorites")
    .classList.add("hidden");

  document.getElementById("recent")
    .classList.add("hidden");

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

}


/* =========================
   TOAST
========================= */

let toastTimer;

function toast(message){

  const el=document.getElementById("toast");

  el.textContent=message;

  el.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer=setTimeout(()=>{
    el.classList.remove("show");
  },2200);

}


/* =========================
   COPY
========================= */

function copyText(text){

  navigator.clipboard.writeText(text)
    .then(()=>{
      toast("📋 Copied!");
    })
    .catch(()=>{
      toast("Copy unavailable");
    });

}


/* =========================
   SECURITY HELPERS
========================= */

function escapeHTML(str){

  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

}


function escapeAttr(str){

  return String(str)
    .replaceAll("\\","\\\\")
    .replaceAll("'","\\'");

}


/* =========================
   CLOSE MODALS
========================= */

document.getElementById("toolModal")
.addEventListener("click",e=>{

  if(e.target.id==="toolModal")
    closeTool();

});

document.getElementById("profileModal")
.addEventListener("click",e=>{

  if(e.target.id==="profileModal")
    closeProfile();

});


/* CTRL/CMD + K */

document.addEventListener("keydown",e=>{

  if((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==="k"){

    e.preventDefault();

    const input=
      document.getElementById("searchInput");

    input.focus();

  }

});