let letrasCorretas = 0
let letrasErradas = 0
let tempoRestante = 60
let textoAtual = ''
let cronometroInicial

let textos = [
    "Aprender a digitar é essencial. Comece com práticas diárias.",
    "A vida é uma aventura incrível. Aproveite cada momento e faça memórias inesquecíveis!",
    "A vida é uma dança constante entre desafios e conquistas. Cada passo nos ensina algo novo. Aproveite a jornada e celebre cada pequena vitória!",
    "Em cada amanhecer, a vida nos oferece uma nova chance de recomeçar. Enfrente os desafios com coragem, abrace as oportunidades com entusiasmo e nunca deixe de sonhar. Viva intensamente!",
    "A vida é uma aventura repleta de momentos inesquecíveis. Enfrente os desafios com determinação, celebre as conquistas com alegria e nunca perca a esperança. Cada dia é uma nova página em sua história, pronta para ser escrita com paixão e propósito."
]

function iniciarCronometro(){

    if(cronometroInicial) clearInterval(cronometroInicial)
    
    tempoRestante = 60

    document.querySelector('.cronometro').textContent = tempoRestante

    cronometroInicial = setInterval(() => {

        tempoRestante --
        document.querySelector('.cronometro').textContent = tempoRestante
        if(tempoRestante <= 0) {
            clearInterval(cronometroInicial)
            verificar_resultado()
        }

    }, 1000);
    
}

function verificar_resultado(){

    let porcentagemAcertos = letrasCorretas / textoAtual.length

    if (porcentagemAcertos >= 0.8) {
        alert('Parabens vc foi aprovado!!!')
    }else{
        alert('Infelizmente vc n conseguiu tente novamente')
    }

    resetar()
}


function resetar(){

    const entradaTexto = document.querySelector('.entradaTexto')
    entradaTexto.value = ''
    entradaTexto.disabled = true

    clearInterval(cronometroInicial)

    document.querySelector('.corretas').textContent = '0'
    document.querySelector('.erradas').textContent = '0'
    document.querySelector('.cronometro').textContent = '60'

    tempoRestante = 60
    letrasCorretas = 0
    letrasErradas = 0


    Array.from(document.querySelector('#texto').children).forEach(element => {
        element.classList.remove('certo', 'errado')    
    });
}

function mudarNivel(number){

    resetar()

    
    textoAtual = textos[number - 1]

    const areaTexto = document.getElementById('texto')

    areaTexto.innerHTML = textoAtual.split('').map(letra => `<span>${letra}</span>`).join('');

    document.querySelector('.entradaTexto').disabled = false

}

document.querySelector('.entradaTexto').addEventListener('input', (event) => {
    if (tempoRestante === 60) iniciarCronometro();

    const entradaText = event.target.value;

    if (entradaText.length > textoAtual.length) {
        event.target.value = entradaText.substring(0, textoAtual.length);
        return;
    }

    letrasCorretas = 0;
    letrasErradas = 0;

    Array.from(document.getElementById('texto').children).forEach((letra, index) => {

        if (index < entradaText.length) {

            if (entradaText[index] === letra.textContent) {

                letra.classList.add('certo');
                letra.classList.remove('errado');
                letrasCorretas++;

            } 
            else {
                
                letra.classList.remove('certo');
                letra.classList.add('errado');
                letrasErradas++;
            }
        } else {
            letra.classList.remove('certo', 'errado');
        }
    });

    document.querySelector('.corretas').textContent = letrasCorretas;
    document.querySelector('.erradas').textContent = letrasErradas;

    if (entradaText.length === textoAtual.length) verificar_resultado();
});


