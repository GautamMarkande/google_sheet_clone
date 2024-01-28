const theadRow = document.getElementById("table_head_row")
const row = 100;
const col = 26;


const BoldBtn = document.getElementById("bold")
let currCellH1 = document.getElementById("CurrCell")
const ItelicBtn=document.getElementById("itelic")
const UnderlineBtn=document.getElementById("underline")
const leftBtn = document.getElementById("left")
const rightBtn = document.getElementById("right")
const centerBtn = document.getElementById("center")
const fontFamilyDropdown = document.getElementById('fonte-style-dropdown');
const fontSizeDropdown = document.getElementById('fonte-size-dropdown');
const bgColorSelector=document.getElementById('bgColor');
const fontColorSelector=document.getElementById('fontColor');

const cutBtn = document.getElementById('cut-btn');
const copyBtn = document.getElementById('copy-btn');
const pasteBtn = document.getElementById('paste-btn');
const validateBtn = document.getElementById('validate')

let prevCellID;
let currentCell;
let cutCell;
let matrix = new Array(row)
BoldBtn.addEventListener("click",()=>setBold())
ItelicBtn.addEventListener("click",()=>setItelic())
UnderlineBtn.addEventListener("click",()=>setUnderLine())
leftBtn.addEventListener("click",()=>setTextLeft())
rightBtn.addEventListener("click",()=>setTextRight())
centerBtn.addEventListener("click",()=>setTextCenter())
fontFamilyDropdown.addEventListener("change",()=>setFontFam())
fontSizeDropdown.addEventListener("change",()=>setFontSize())
bgColorSelector.addEventListener("change",()=>setBgColor())
fontColorSelector.addEventListener("change",()=>setFontColor())
cutBtn.addEventListener("click",()=>setCutText())
copyBtn.addEventListener("click",()=>setCopyText())
pasteBtn.addEventListener('click',()=>setPasteText())


for(let i = 0; i<row; i++){
  matrix[i] = new Array(col)
  for(let j = 0; j<col;j++){
    matrix[i][j] = {}
  }
}

function updateMatrix(){
  const tempObj = {
    id:currentCell.id,
    text:currentCell.innerText,
    style:currentCell.style.cssText
  }
  let col=currentCell.id[0].charCodeAt(0)-65;
  let row=currentCell.id.substr(1)-1;
  matrix[row][col]=tempObj;
}
console.log(matrix)
function colGen(TypeOfCell, TableRow, isInnerText,rowNum){
 
  for(let i = 0; i<col; i++){
    const cell = document.createElement(TypeOfCell)
    if(isInnerText){
      cell.innerText = String.fromCharCode(i+65)
      cell.id=String.fromCharCode(i+65)
    }else{
      cell.setAttribute('contenteditable','true')
      cell.id = `${String.fromCharCode(i+65)}${rowNum}`
      cell.addEventListener('focusout', updateMatrix);
      cell.addEventListener('focus',event=>onFocusFunction(event.target))
    }
    TableRow.appendChild(cell)
  }
}

colGen('th', theadRow, true)

function setColorOfBox(rowId,colId,color){
    const ColHead = document.getElementById(colId)
    const RowHead = document.getElementById(rowId)
    ColHead.style.backgroundColor=color
    RowHead.style.backgroundColor=color
    updateMatrix()
}

function setBold(){
  if(currentCell.style.fontWeight==="bold"){
    currentCell.style.fontWeight="normal"
    BoldBtn.style.backgroundColor="lightgray"
    BoldBtn.style.color="black"
  }else{
    currentCell.style.fontWeight="bold"
    BoldBtn.style.backgroundColor="black"
    BoldBtn.style.color="white"
  }
  updateMatrix()
}

function setItelic(){
  if(currentCell.style.fontStyle==="italic"){
    currentCell.style.fontStyle="normal"
    ItelicBtn.style.backgroundColor="lightgray"
    ItelicBtn.style.color="black"
  }else{
    currentCell.style.fontStyle="italic"
    ItelicBtn.style.backgroundColor="black"
    ItelicBtn.style.color="white"
  }
  updateMatrix()
}

function setUnderLine(){
  if(currentCell.style.textDecoration==="underline"){
    currentCell.style.textDecoration="none"
    UnderlineBtn.style.backgroundColor="lightgray"
    UnderlineBtn.style.color="black"
  }else{
    currentCell.style.textDecoration="underline"
    UnderlineBtn.style.backgroundColor="black"
    UnderlineBtn.style.color="white"
  }
  updateMatrix()
}

function setTextLeft(){
  if(currentCell.style.textAlign==="left"){
    currentCell.style.textAlign="center"
  }else{
    currentCell.style.textAlign="left"
  }
  updateMatrix()
}

function setTextRight(){
  if(currentCell.style.textAlign==="right"){
    currentCell.style.textAlign="center"
  }else{
    currentCell.style.textAlign="right"
  }
  updateMatrix()
}

function setTextCenter(){
    currentCell.style.textAlign="center"
    updateMatrix()
}

function setFontFam(){
  currentCell.style.fontFamily=fontFamilyDropdown.value;
  updateMatrix()
}

function setFontSize(){
  currentCell.style.fontSize=fontSizeDropdown.value;
  updateMatrix()
}

function setBgColor(){
  currentCell.style.backgroundColor=bgColorSelector.value
  updateMatrix()
}

function setFontColor(){
  currentCell.style.color=fontColorSelector.value;
  updateMatrix()
}

function setCutText(){
  cutCell={
    text: currentCell.innerText,
    style: currentCell.style.cssText,
  }
  currentCell.innerText='';
  currentCell.style.cssText='';
  updateMatrix()
}

function setCopyText(){
  cutCell={
    text: currentCell.innerText,
    style: currentCell.style.cssText,
  }
  updateMatrix()
}

function setPasteText(){
  currentCell.innerText = cutCell.text
  currentCell.style=cutCell.style
  updateMatrix()
}

function dowloadMatrix(){
  console.log(matrix)
  const matrixString = JSON.stringify(matrix)
  const blob = new Blob([matrixString],{type:'application/json'})
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob)
  link.download = 'table.josn'
  link.click();
}

validateBtn.addEventListener('click',()=>setValidation())
let text;
if(currentCell&&currentCell.innerText!==""){
  console.log(currentCell.innerText)
}

function setValidation(){
  text = currentCell.innerText
  // console.log(text)
  console.log(typeof text)
  if(isNaN(text)){
    alert('please enter number')
  }
}
function onFocusFunction(cell){
 currentCell = cell
  if(prevCellID){
    // const ColHead = document.getElementById(prevCellID[0])
    // const RowHead = document.getElementById(prevCellID.substring(1))
    // ColHead.style.backgroundColor="transparent"
    // RowHead.style.backgroundColor="transparent"
    setColorOfBox(prevCellID.substring(1),prevCellID[0],"transparent")
  }
  
  // const ColHead = document.getElementById(cellId[0])
  // const RowHead = document.getElementById(cellId.substring(1))
  // ColHead.style.backgroundColor="lightblue"
  // RowHead.style.backgroundColor="lightblue"
  setColorOfBox(cell.id.substring(1),cell.id[0],"lightblue")
  currCellH1.innerText = cell.id
  prevCellID = cell.id
  
}
const tbody = document.getElementById("TableBody")
for(let  i = 0; i<row; i++){
    const tr= document.createElement('tr')
    const th = document.createElement('th')
    th.id=i+1
    th.innerText = i+1;
    tr.appendChild(th)
    const rowNum = i+1
    colGen('td',tr,false,rowNum)
    tbody.appendChild(tr)
}


// function parent(call1){
//   call1(call2(call3))
// }
// parent((call2)=>clg)
let t = 5;
// setTimeout(()=>{
// console.log("set timeout")
// },2000)

// setInterval(()=>{
//    t--
//    if(t===0){
//     clearInterval()
//    }
// },1000)