async function isGraphCyclicTracePath(graphComponentMatrix,cycleResponse)
{
    let [srcr,srcc]=cycleResponse;

    let visited=[];
    let dfsvisited=[];
    for(let i=0;i<rows;i++)
    {
        let visitedRow=[];
        let dfsVisitedRow=[];
        for(let j=0;j<cols;j++)
        {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsvisited.push(dfsVisitedRow);
    }


    // for(let i=0;i<rows;i++)
    // {
    //     for(let j=0;j<cols;j++)
    //     {
    //        let response= dfsCycleDetection(graphComponentMatrix,i,j,visited,dfsvisited);
    //        if(response==true)return true;
    //     }
    // }
    let response= await dfsCycleDetectionTracePath(graphComponentMatrix,srcr,srcc,visited,dfsvisited);
    if(response===true)return Promise.resolve(true);
    return Promise.resolve(false);
}
function colorPromise()
{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },1000)
    })
}

async function dfsCycleDetectionTracePath(graphComponentMatrix,srcr,srcc,visited,dfsvisited)
{

    visited[srcr][srcc]=true;
    dfsvisited[srcr][srcc]=true;
    let cell =document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);
   cell.style.backgroundColor="lightblue";
   await colorPromise();
    


    for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++) {
        let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];
        if (visited[nbrr][nbrc] === false) {
            let response = await dfsCycleDetectionTracePath(graphComponentMatrix, nbrr, nbrc, visited, dfsvisited);
            if (response === true) {
                
                cell.style.backgroundColor="transparent"
                await colorPromise();
                
                return Promise.resolve(true); }// Found cycle so return immediately, no need to explore more path
        }
        else if (visited[nbrr][nbrc] === true && dfsvisited[nbrr][nbrc] === true) {
            // Found cycle so return immediately, no need to explore more path

            let cyclicCell =document.querySelector(`.cell[rid="${nbrr}"][cid="${nbrc}"]`);
           cyclicCell.style.backgroundColor="lightsalmon";
         await  colorPromise();
            cyclicCell.style.backgroundColor="transparent";
           
           cell.style.backgroundColor="transparent";await colorPromise();
        
            return Promise.resolve(true);
        }
    }

    dfsvisited[srcr][srcc]=false;return Promise.resolve(false);

}