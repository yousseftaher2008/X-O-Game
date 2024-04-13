const cell = document.querySelectorAll('.cell');
const score1 = document.querySelectorAll('#score1');
const score2 = document.querySelectorAll('#score2');
const x = document.querySelectorAll('.x');
const o = document.querySelectorAll('.o');
let gamefield = document.querySelector("#game");

let player1 = [];
let player2 = [];
let winner;
let nkla = 0;
let score = {
    player1: 0,
    player2: 0,
}

let ix = 0;
let IN = [1, 1, 1, 1, 1, 1, 1, 1, 1]
const arr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]
first = 1;
let flag = true;
function game()
{

    for(let i = 0; i < cell.length; i++)
    {
        cell[i].addEventListener('click', () => {
            if (flag)
                addplayer1(i);
        })
    }
    return 0;
}

async function addplayer1(i)
{
    if (IN[i])
    {

        flag = false;
        if (first)
        {
            x[i].innerHTML = "X";
        }
        if (!first)
        {
            o[i].innerHTML = "O";
        }
        IN[i] = 0;
        player1.push(i)
        winner = checkwinner (player1, 3);
        if(winner != -1)
        {
            score.player1++;
            printwin(winner)
            return;
        }
        else if (nkla == 4 && first)
        {
            document.getElementById("restart").innerHTML = "Draw";
            color = "gray";
            for(let i = 0; i < 3; i++)
            {
                for (let i = 0; i < 9; i++)
                {
                    cell[i].style.backgroundColor = color;
                }
                if (color != "gray")
                    color = "gray"
                else
                    color = "transparent"
                await sleep(150)
            }
            return
        }
        addplayer2();
    }

}
async function addplayer2()
{
    nkla += 1;
    await sleep(400)
    let i, open = [];

    for(i = 0; i < IN.length; i++)
    {
        if (IN[i])
        {
            open.push(i)
        }
    }
    i = open[Math.floor (Math.random() * (open.length))]
    player2.push(i)
    IN[i] = 0;
    if (first && i != null)
    {
        o[i].innerHTML = "O";
    }
    if (!first && i != null)
    {
        x[i].innerHTML = "X";
    }
    winner = checkwinner (player2, 3);
    if(winner != -1)
    {
        score.player2++;
        printwin(winner)
        return;
    }
    if (nkla == 5)
    {
        x[i].innerHTML = "X"
        document.getElementById("restart").innerHTML = "Draw";
        color = "gray";
        for(let i = 0; i < 3; i++)
        {
            for (let i = 0; i < 9; i++)
            {
                cell[i].style.backgroundColor = color;
            }
            if (color != "gray")
            color = "gray"
            else
            color = "transparent"
            await sleep(150)
        }
        return
    }





    flag = true;
    if (!first)
    {
        game()
    }
}


function checkwinner(player, num){
    let nempty = [], check;
    for (let i = 0; i < arr.length; i++)
    {
        check = 0;
        for(let j = 0; j < player.length; j++)
        {

            if (arr[i].includes(player[j]))
            {
                check ++;
                nempty.push(player[j])
            }
        }
        if (check == 3 && num == 3)
        {
            return i;
        }
        else if(check == 2 && num == 2)
        {
            for(let j = 0; j < arr[i].length; j++)
            {
                if((nempty.includes(arr[i][j])) == false)
                {
                    if (IN[arr[i][j]] )
                        return arr[i][j];
                }
            }
        }
        else if (check == 1 && num == 1)
        {
            let empty = []
            for(let j = 0; j < arr[i].length; j++)
            {
                if((nempty.includes(arr[i][j])) == false)
                {
                    if (IN[arr[i][j]])
                        empty.push(arr[i][j]);
                }

            }
            if(empty.length == 2)
            {
                return empty[0];
            }
        }
    }
    return -1;
}

async function printwin(ixwin)
{

    gamefield.style.backgroundColor = "rgb(100,100,60)";
    gamefield.style.border = "2px solid rgb(200, 200, 0)";
    gamefield.style.boxShadow = "-1px -1px  10px rgb(225, 225, 0), 1px 1px  10px  rgb(250, 250, 0)";
    gamefield.style.width = "0.625em";
    gamefield.style.left = "49%";
    if (ixwin == 0)
    {
        gamefield.style.height = "27.5em";
        gamefield.style.transform = "rotate(90deg)";

        gamefield.style.top = "-20%";
    }
    if (ixwin == 1)
    {
        gamefield.style.height = "27.5em";
        gamefield.style.transform = "rotate(90deg)";
        gamefield.style.top = "13%";
    }

    if (ixwin == 2)
    {
        gamefield.style.height = "27.5em";
        gamefield.style.transform = "rotate(90deg)";

        gamefield.style.top = "46%";

    }

    if (ixwin == 3)
    {
        gamefield.style.height = "27.5em";
        gamefield.style.transform = "rotate(0deg)";
        gamefield.style.left = "15%";
        gamefield.style.top = "13%";
    }

    if (ixwin == 4)
    {

        gamefield.style.height = "27.5em";
        gamefield.style.transform = "rotate(0deg)";
        gamefield.style.top = "13%";

    }

    if (ixwin == 5)
    {
        gamefield.style.height = "27.5em";
        gamefield.style.transform = "rotate(0deg)";
        gamefield.style.left = "82.5%";
        gamefield.style.top = "13%";

    }

    if (ixwin == 6)
    {

        gamefield.style.height = "37.5em";
        gamefield.style.transform = "rotate(-45deg)";
        gamefield.style.top = "0%";
    }

    if (ixwin == 7)
    {
        gamefield.style.height = "37.5em";
        gamefield.style.transform = "rotate(45deg)";
        gamefield.style.top = "0%";
    }
    color = "gray";
    for(let i = 0; i < 3; i++)
    {
        for (let i = 0; i < 3; i++)
        {
            cell[arr[ixwin][i]].style.backgroundColor = color;
        }
        if (color != "gray")
            color = "gray"
        else
            color = "transparent"
        await sleep(300)
    }
    ix = ixwin;
    document.getElementById("restart").innerHTML = "NewGame";
    document.getElementById("score1").innerHTML = "Player One Score: " + score.player1;
    document.getElementById("score2").innerHTML = "Computer Score: " + score.player2;
    IN = [0,0,0,0,0,0,0,0,0];
    player1 = [];
    player2 = [];
}


function deletall()
{
    for(let i = 0; i < x.length; i++)
    {
        x[i].innerHTML = "";
        o[i].innerHTML = "";
    }
    player1 = [];
    player2 = [];
    IN = [1, 1, 1, 1, 1, 1, 1, 1, 1];
    gamefield.style.backgroundColor = "none";
    gamefield.style.border = "none";
    gamefield.style.boxShadow = "none";
    gamefield.style.width = "0px";
    gamefield.style.height = "0px";
    nkla = 0;
    for (let i = 0; i < 9; i++)
    {
        cell[i].style.backgroundColor ="transparent";
    }
    document.getElementById("restart").innerHTML = "Restart";
    if(first == 1)
    {
        first = 0
        flag = false;
        addplayer2()
    }
    else
    {
        first = 1
        flag = true;
    }
}
restart()
let i = game()
if (i == 3){
    document.getElementById("restart").innerHTML = "NewGame";
}
function restart()
{
    document.querySelector('#restart').addEventListener('click', function (){
        deletall()
        game()
    })
    return;
}

function sleep (ms)
{
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            resolve(ms);
        }, ms);
    })
}