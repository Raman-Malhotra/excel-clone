
let collectedSheetDB=[];
let sheetDb=[];
{
    let addSheetBtn=document.querySelector(".sheet-add-icon");
    addSheetBtn.click();
   
}
// for(let i=0;i<rows;i++)
// {
//     let sheetRow=[];
//     for(let j=0;j<cols;j++)
//     {
//         let cellProp={
//             bold:false,
//             italic:false,
//             underline:false,
//             alignment:"left",
//             fontFamily:"monospace",
//             fontSize:"14",
//             fontColor: "#000000",
//             BgColor:"#000000",
//             value:"",
//             formula:"",
//             children:[],

//         }
//         sheetRow.push(cellProp)

//     }
//     sheetDb.push(sheetRow)
// }
let bold=document.querySelector(".bold");
let italic=document.querySelector(".italic")
let underline=document.querySelector(".underline")
let fontSize=document.querySelector(".font-size-prop")
let fontFamily=document.querySelector(".font-family-prop")
let fontColor=document.querySelector(".font-color-prop")
let BgColor=document.querySelector(".Bg-Color-Prop")
let alignment=document.querySelectorAll(".alignment")
let leftAlign=alignment[0];
let centerAlign=alignment[1];
let rightAlign=alignment[2];
// let addressBar=document.querySelector(".address-bar");
let activeColorProp="#d1d8e0";
let inactiveColorProp= "#ecf0f1"

bold.addEventListener("click",()=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    console.log("bold")

    cellProp.bold=!cellProp.bold;
    cell.style.fontWeight=cellProp.bold ? "bold" : "normal";
    bold.style.backgroundColor= cellProp.bold ? activeColorProp : inactiveColorProp
})



italic.addEventListener("click",()=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    
    cellProp.italic=!cellProp.italic;
    cell.style.fontStyle=cellProp.italic ? "italic" : "normal";
    italic.style.backgroundColor= cellProp.italic ? activeColorProp : inactiveColorProp
})



underline.addEventListener("click",()=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    console.log("bold")

    cellProp.underline=!cellProp.underline;
    cell.style.textDecoration=cellProp.underline ? "underline" : "none";
    underline.style.backgroundColor= cellProp.underline ? activeColorProp : inactiveColorProp
})



fontSize.addEventListener("change",()=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    cellProp.fontSize=fontSize.value;
    cell.style.fontSize=cellProp.fontSize+"px";
    fontSize.value=cellProp.fontSize;

    
})

fontFamily.addEventListener("change",()=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    cellProp.fontFamily=fontFamily.value;
    cell.style.fontFamily=cellProp.fontFamily;
    fontFamily.value=cellProp.fontFamily;

    
})



fontColor.addEventListener("change",()=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    cellProp.fontColor=fontColor.value;
    cell.style.color=cellProp.fontColor;
    fontColor.value=cellProp.fontColor;

    
})

BgColor.addEventListener("change",()=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    cellProp.BgColor=BgColor.value;
    cell.style.backgroundColor=cellProp.BgColor;
    BgColor.value=cellProp.BgColor;

    
})



alignment.forEach((alignElem)=>{
    alignElem.addEventListener("click",(e)=>{
        let address=addressBar.value;
        let [cell,cellProp]=getCellAndCellProp(address);
        let alignValue= e.target.classList[0];
        cellProp.alignment=alignValue;

        cell.style.textAlign=cellProp.alignment;

        switch(alignValue)
        {
            case "left":
                leftAlign.style.backgroundColor=activeColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;

                case "right":
                    leftAlign.style.backgroundColor=inactiveColorProp;
                    centerAlign.style.backgroundColor=inactiveColorProp;
                    rightAlign.style.backgroundColor=activeColorProp;
                    break;

                    case "center":
                        leftAlign.style.backgroundColor=inactiveColorProp;
                        centerAlign.style.backgroundColor=activeColorProp;
                        rightAlign.style.backgroundColor=inactiveColorProp;
                        break;

        }
    })
})


let allCells=document.querySelectorAll(".cell");

for(let i=0;i<allCells.length;i++)
{
    addListenerToAttachCellProperties(allCells[i]);
}


function addListenerToAttachCellProperties(cell)
{
    cell.addEventListener("click",(e)=>{



        let address=addressBar.value;
        let [rid,cid]=decodeRIDCIDFromAddress(address);
        let cellProp=sheetDb[rid][cid];


cell.style.fontWeight=cellProp.bold ? "bold" : "normal";
cell.style.fontStyle=cellProp.italic ? "italic" : "normal";
cell.style.textDecoration=cellProp.underline ? "underline" : "none";
cell.style.fontSize=cellProp.fontSize+"px";
cell.style.fontFamily=cellProp.fontFamily;
cell.style.color=cellProp.fontColor;
cell.style.backgroundColor=cellProp.BgColor==="#000000"?"transparent": cellProp.BgColor;

cell.style.textAlign=cellProp.alignment;

switch(cellProp.alignment)
{
    case "left":
        leftAlign.style.backgroundColor=activeColorProp;
        centerAlign.style.backgroundColor=inactiveColorProp;
        rightAlign.style.backgroundColor=inactiveColorProp;
        break;

        case "right":
            leftAlign.style.backgroundColor=inactiveColorProp;
            centerAlign.style.backgroundColor=inactiveColorProp;
            rightAlign.style.backgroundColor=activeColorProp;
            break;

            case "center":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=activeColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;

}
let formulaBar = document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula;
        cell.innerText = cellProp.value;
bold.style.backgroundColor= cellProp.bold ? activeColorProp : inactiveColorProp

italic.style.backgroundColor= cellProp.italic ? activeColorProp : inactiveColorProp

underline.style.backgroundColor= cellProp.underline ? activeColorProp : inactiveColorProp
fontFamily.value=cellProp.fontFamily;
fontColor.value=cellProp.fontColor;
BgColor.value=cellProp.BgColor;
fontSize.value=cellProp.fontSize

    })
}






function getCellAndCellProp(address)

{

    let [rid,cid]=decodeRIDCIDFromAddress(address);
    let cell =document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    console.log(`.cell[rid="${rid}"][cid="${cid}"]`)
    let cellProp=sheetDb[rid][cid];
    return [cell,cellProp];
}
function decodeRIDCIDFromAddress(address)
{
    let rid=Number(address.slice(1)-1);
    let cid= Number(address.charCodeAt(0))-65;
    return [rid,cid]
}