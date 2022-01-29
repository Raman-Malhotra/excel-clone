let ctrlKey;
document.addEventListener("keydown",(e)=>{
    ctrlKey=e.ctrlKey;
})

document.addEventListener("keyup",(e)=>{
    ctrlKey=e.ctrlKey;
})


for(let i=0;i<rows;i++)
{
    for(let j=0;j<cols;j++)
    {
        let cell =document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handleSelectedCells(cell);

    }
}
let copyBtn=document.querySelector(".copy");
let cutBtn=document.querySelector(".cut");

let pasteBtn=document.querySelector(".paste");


let rangeStorage=[];

function handleSelectedCells(cell)
{

    cell.addEventListener("click",(e)=>{

        if(!ctrlKey)return;
        if(rangeStorage.length>=2){
defaultSelectedCellsUi();
rangeStorage=[]
        }


        cell.style.border="3px solid #218c74";

        let rid=Number(cell.getAttribute("rid"));
        let cid=Number(cell.getAttribute("cid"));
        rangeStorage.push([rid,cid]);

    })


}

function defaultSelectedCellsUi()
{
    for(let i=0;i<rangeStorage.length;i++)
    {
        let cell =document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);
cell.style.border="1px solid lightgray"
    }

}

let copyData=[];
copyBtn.addEventListener("click",(e)=>{
copyData=[];
    let strow=rangeStorage[0][0];
    let stcol=rangeStorage[0][1];
    let endrow=rangeStorage[1][0];
    let endcol=rangeStorage[1][1];


    for(let i=strow;i<=endrow;i++)
    {
        let copyRow=[];
        for(let j=stcol;j<=endcol;j++)
        {
            let cellProp=sheetDb[i][j];
            copyRow.push(cellProp);
        }
        copyData.push(copyRow);
    }
    defaultSelectedCellsUi();
})


cutBtn.addEventListener("click",(e)=>{
    let strow=rangeStorage[0][0];
    let stcol=rangeStorage[0][1];
    let endrow=rangeStorage[1][0];
    let endcol=rangeStorage[1][1];


    for(let i=strow;i<=endrow;i++)
    {
       
        for(let j=stcol;j<=endcol;j++)
        {
            let cell =document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);




            let cellProp=sheetDb[i][j];


            cellProp.value="";
            cellProp.bold=false;
            cellProp.italic=false;
            cellProp.underline=false;
            cellProp.fontSize=14;
            cellProp.fontFamily="monospace";
            cellProp.fontColor="#000000";
            cellProp.BgColor="#000000";
            cellProp.alignment="left";

            cell.click();









        }
       
    }

defaultSelectedCellsUi();




})


pasteBtn.addEventListener("click",(e)=>{
    if(rangeStorage.length<2)
    {
        return;
    }

    let rowDiff=Math.abs(rangeStorage[0][0]-rangeStorage[1][0]);
    let colDiff=Math.abs(rangeStorage[0][1]-rangeStorage[1][1]);



    



    let address=addressBar.value;

    let [strow,stcol]=decodeRIDCIDFromAddress(address);


    for(let i=strow,r=0;i<=strow+rowDiff;i++,r++)
    {
        for(let j=stcol,c=0;j<=stcol+colDiff;j++,c++)
        {
            let cell =document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            if(!cell)continue;




            let data=copyData[r][c];
            let cellProp=sheetDb[i][j];


            cellProp.value=data.value;
            cellProp.bold=data.bold;
            cellProp.italic=data.italic;
            cellProp.underline=data.underline;
            cellProp.fontSize=data.fontSize;
            cellProp.fontFamily=data.fontFamily;
            cellProp.fontColor=data.fontColor;
            cellProp.BgColor=data.BgColor;
            cellProp.alignment=data.alignment;

            cell.click();





        }
    }
})