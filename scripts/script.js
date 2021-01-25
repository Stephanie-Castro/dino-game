//Selecionando a div de class .dino
const dino = document.querySelector('.dino');
//console.log(dino); //mostrando o elemento selecionado acima


//Selecionando a div de class .background
const background = document.querySelector('.background');


//variável de controle do pulo:
let isJumping = false;

//variável de controle da posição do dinossauro:
let dinoYPosition = 0;



//Podemos fazer o eventListener executar uma ação como nos exmplos abaixo
//sempre que pressionar uma tecla ...
/*
document.addEventListener('keyup', () => {
	console.log("Pressionou uma tecla");
});
*/

//Outro modo de escrever o código acima
/*
document.addEventListener('keyup', funcion() {
});
*/



function handleKeyUp(event){
	if (event.keyCode === 32) { //32 é o key code do spacebar
								// http://keycode.info para checar outros keyCodes
		//console.log("Pressionou a tecla espaço");

		if(!isJumping){ //Se o dino já não estiver pulando, ele pode pular
			jump();
		}
		
	}
}

function jump(){
	isJumping = true; //o dino agora está pulando

	let upInterval = setInterval(() => {
		if(dinoYPosition < 150){ //subindo
			dinoYPosition += 20;
			dino.style.bottom = dinoYPosition + 'px';
		} else{
			clearInterval(upInterval); //para de subir

			//descendo:
			let downInterval = setInterval(() => {
				if(dinoYPosition <= 0){
					clearInterval(downInterval); //para de descer
					isJumping  = false; //O dino terminou de pular
				} else{
					dinoYPosition -= 20;
					dino.style.bottom = dinoYPosition + 'px';
				}
				
			}, 20); //20milissegundos é tempo de descida do dino
		}
		
	}, 20); //20milissegundos é tempo de subida do dino

}



function creatCactus(){
	const cactus = document.createElement('div'); //criando a div que representará o cactus
	let cactusPosition = 1000;
	let randomTime = Math.random() * 6000; //Irá gerar números aleatórios para criação dos cactos

	cactus.classList.add('cactus'); //adicinando uma classe de nome cactus a essa div
	cactus.style.left = cactusPosition + 'px';
	background.appendChild(cactus);

	let leftInterval = setInterval(() => {
		if(cactusPosition >= -60){ //Se o cactus ainda estiver aparecendo na tela (ele tem largura de 60 px) ...
			if(cactusPosition > 0 && cactusPosition < 60 && dinoYPosition < 60){ //Se o cactos estiver na região de contato com o dinossauro e o dinossauro estiver baixo demais a ponto de 'encostar' no cactos (pulando ou não) ...
				//GAME OVER
				clearInterval(leftInterval);
				document.body.innerHTML = '<h1 class="game-over"> Game Over </h1>';
			}
			cactusPosition -= 10; //é como a velocidade de movimento do cactos, quanto maior o valor, maior a dificuldade do jogo
			cactus.style.left = cactusPosition + 'px';
		} else{ //Se o cactus tiver saído totalmente da tela (ele tem largura de 60 px) ...
			clearInterval(leftInterval); //para de mover para a esquerda
			background.removeChild(cactus);
		}
					
	}, 20); //20milissegundos é tempo de movimento para a esquerda do cactos

	setTimeout(creatCactus, randomTime); //Novos cactos são criados de forma aleatória, usando recursividade
}




creatCactus();

//Podemos fazer o eventListener executar uma chamada de método para executar um determinado código especificado no método
//No caso, sempre que clicar em uma tecla, chama a function handleKeyUp que checa se a tecla clicada é o espaço
document.addEventListener('keyup', handleKeyUp);