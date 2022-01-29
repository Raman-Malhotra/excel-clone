let downloadBtn=document.querySelector(".download");
let openbtn=document.querySelector(".open");



downloadBtn.addEventListener("click",(e)=>{
    let jsonData=JSON.stringify([sheetDb,graphComponentMatrix]);

    let file= new Blob([jsonData],{type:"application/json"});

    let a=document.createElement("a");
    a.href=URL.createObjectURL(file);
    a.download="sheetData.json";
    a.click();
})




openbtn.addEventListener("click",(e)=>{
    let input=document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change",(e)=>{

        let fr=new FileReader();
        let files=input.files;
        let fileObj=files[0];

        fr.readAsText(fileObj);
        fr.addEventListener("load",(e)=>{
            let readSheetData=JSON.parse(fr.result);
            addSheetBtn.click();

            sheetDb=readSheetData[0];
            graphComponentMatrix=readSheetData[1];
            collectedSheetDB[collectedSheetDB.length-1]=sheetDb;
            collectedGraphComponent[collectedGraphComponent.length-1]=graphComponentMatrix;

            handleSheetProperties();


        })
    })
})