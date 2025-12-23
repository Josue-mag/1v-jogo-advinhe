let listaDeNumerosSorteados = [];

let numeroLimite = 100;

let numeroSecreto = numeroAleatorio()

let tentativas = 1

function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto; 
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
exibirTextoNaTela ('h1', 'Bem Vindo ao Jogo do número Secreto');
exibirTextoNaTela('p','Escolha um número de 1 a 10');
}
exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value; 

   if ( chute == numeroSecreto){
    exibirTextoNaTela('h1', 'Acertou!!!');
    let palavraTentativa = tentativas > 1? 'tentativas'  : 'tentativa';
    let mensagemTentativas = `Parabéns, você adivinhou o número Secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela('p', mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled');
   } 
    
   else{
        if( chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número Secreto é menor');
        }else{
            exibirTextoNaTela('p','O número Secreto é maior');
        };
        tentativas = tentativas + 1;
        tentativas++;
        limparCampo()
   };
}    

function numeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    
    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados= [];
    }
   
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return numeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector ('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = numeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById ('reiniciar').setAttribute('disabled', true)
}