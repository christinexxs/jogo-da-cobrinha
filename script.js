/* Play Board é a tela ou tabuleiro */
/* Conteiner onde a cobra e a comida serão renderizadas */
const playBoard = document.querySelector(".play-board");

/* Pontuação atual do jogador */
const scoreElement = document.querySelector(".score");

/* Recorde (maiorpontuação) */
const highScoreElement =  document.querySelector(".high-score");

/* Controles de movimento */
/* Seleciona elementos <i> Iconnes Botões para Devices Mobiles */
const controls = document.querySelectorAll(".controls i");

/* Cadastro de Variaveis */

/* Variaveis Boleana que indica se o jogo terminou */
let gameOver = false;

/* variavel para armazenar as coordenadas X e Y DA Comida */
let foodX, foodY;

/* Armazena as coordenadas X e Y da cabeça da cobra (posição inicial de 5)*/
let snakeX = 5, snakeY = 5;

/*variavel para armazenar a velocidade nas direções X e Y, inicialmente em 0, pq a cobra está parada  */
let velocityX = 0, velocityY = 0;

/*uma Array para armazenar as cordenadas de cada segmento do corpo,primeiro elemento é a cabeça */
let snakeBody = [];

/*  variavel para armazenar o ID do intervalo que será usado para atualizar para o jogo em um determinado ritmo*/
let setIntervalId;

/* uma variavel para manter a pontuação atual do jogador */
let score = 0;



/* Obtenha pontuação alta do para armazenamento local */
/* tenta recuperar o valor associado à  chave "high-score" do arzenamento local do navegador*/
let highScore = localStorage.getItem("high-score") || 0;

/* se o localStorage retornar NULL (caso ele não exista), a variavel highscore sera definida como 0 */


/* posição aleatoria entre 1 e 30 para a comida  */
/* gera Coordenadas aleatórias para a nova posição da comida */
const updateFoodPosition = () => {

/* +1 : Adicionar 1 para garantir que as coordenadas da comida estejam entre 1 e 30. */
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Mth.floor(Math.random() * 30) + 1;
}

/* finção para lidar com o Fim do Jogo */
/* função handleGamaeOver = quando a cobra colide consigo mesma ou com as paredes do tabuleiro */

const handleGamaeOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over!!! Aperte Ok para iniciar novamente...")
    location.reload();
}

/* função para mudar a direção da cobrinha */
const changeDiretion = e => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != -1){
        velocityX = -1;
        velocityY = 0;
    } else if (e,key == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}
    controls.forEach( button => bitton.addEventListen("click" , () => changeDiretion({ ket: button.dataset.key})));

    /* começar o game = init Game */
    const initGame = () => {
        if (gameOver) return handleGamaeOver();
        let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"`

        /* quando a cobra se alimenta */
            if(snakeX === foodX && snakeY === foodY){
                updateFoodPosition();
                snakeBody.push([foodY, foodX, foodX]);
                score++;
                highScore = score >= highScore ? score : highScore

                localStorage.setItem("high-score" , highScore);
                scoreElement.innerHTML = ` Score: ${score}`;
                highScoreElement.innerHTML = `High Score: ${highScore}`;
            }
        snakeX += velocityX;
        snakeY += velocityY;

        for (let i = snakeBody.length - 1; i> 0; i--){
            snakeBody[i] = snakeBody[i - 1];
        }

        snakeBody[0] = [snakeX, snakeY];

        if(snakeX <= 0 || snakeX > 30 ||snakeY <= 0 || snakeY > 30){
            return gameOver = true;
        }
    }