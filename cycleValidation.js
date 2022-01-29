let collectedGraphComponent=[]
// let graphComponentMatrix= [];



// for(let i=0;i<rows;i++)
// {
//     let row=[];

//     for(let j=0;j< cols;j++)
//     {
//         row.push([]);
//     }
//     graphComponentMatrix.push(row);
// }



function isGraphCyclic(graphComponentMatrix)
{

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


    for(let i=0;i<rows;i++)
    {
        for(let j=0;j<cols;j++)
        {
           let response= dfsCycleDetection(graphComponentMatrix,i,j,visited,dfsvisited);
           if(response==true)return [i,j];
        }
    }
    return false;
}

function dfsCycleDetection(graphComponentMatrix,srcr,srcc,visited,dfsvisited)
{

    visited[srcr][srcc]=true;
    dfsvisited[srcr][srcc]=true;


    for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++) {
        let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];
        if (visited[nbrr][nbrc] === false) {
            let response = dfsCycleDetection(graphComponentMatrix, nbrr, nbrc, visited, dfsvisited);
            if (response === true) return true; // Found cycle so return immediately, no need to explore more path
        }
        else if (visited[nbrr][nbrc] === true && dfsvisited[nbrr][nbrc] === true) {
            // Found cycle so return immediately, no need to explore more path
            return true;
        }
    }

    dfsvisited[srcr][srcc]=false;return false;

}