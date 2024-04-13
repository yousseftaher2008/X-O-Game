const cell = document.querySelectorAll('.cell');
const score1 = document.querySelectorAll('#score1');
const score2 = document.querySelectorAll('#score2');
const x = document.querySelectorAll('.x');
const o = document.querySelectorAll('.o');
let gamefield = document.querySelector("#game");

let player1 = [];
let player2 = [];
let winner;
let score = {
    player1: 0,
    player2: 0,
}

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

let flag = true;
function game()
{

    for(let i = 0; i < cell.length; i++)
    {
        cell[i].addEventListener('click', () => {
            if (flag == true)
                addplayer1(i);

            else
                addplayer2(i);


            winner = checkwinner (player1);
            if(winner != -1)
            {
                score.player1++;
                printwin(winner)
                return 1;
            }
            winner = checkwinner(player2);
            if(winner != -1)
            {
                score.player2++;
                printwin(winner)
                return 2;
            }
        })
    }
    return 0;
}
function addplayer1(i)
{
    if (IN[i])
    {
        flag = false;
        x[i].innerHTML = "X";
        IN[i] = 0;
        player1.push(i)
        draw = 0;

    }
}
function addplayer2(i)
{
    if (IN[i])
    {
        flag = true;
        o[i].innerHTML = "O";
        IN[i] = 0;
        player2.push(i)
        draw = 0;

    }
}


function checkwinner(player){
    for (let i = 0; i < arr.length; i++)
    {
        check = 0;
        for(let j = 0; j < player.length; j++)
        {

            if (arr[i].includes(player[j]))
                check ++;
        }
        if (check == 3)
        {

            return i;
        }
    }
    return -1;
}

function printwin(ixwin)
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


    document.getElementById("restart").innerHTML = "NewGame";
    document.getElementById("score1").innerHTML = "Player One Score: " + score.player1;
    document.getElementById("score2").innerHTML = "Player Two Score: " + score.player2;
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
    flag = true
    document.getElementById("restart").innerHTML = "Restart";
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