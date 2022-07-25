let perguntaAtual = 0;
let opt = [];
let btInicar = document.getElementById('btInicar');

let tema = null; 


btInicar.addEventListener('click', ()=>{
    let paginaTemaRedacao = document.querySelector('.temaRedacao');
    paginaTemaRedacao.style.display = 'none'
    tema = document.getElementById('tema').value;
    mostrarPergunta(); 
})
function mostrarPergunta() {

    if(perguntas[tema][perguntaAtual]) {
        let perg = perguntas[tema][perguntaAtual];
        let pct = Math.floor((perguntaAtual / perguntas[tema].length) * 100);

        document.querySelector('.barra').style.width = `${pct}%`;        
        document.querySelector('.success_info').style.display = 'none';
        document.querySelector('.question_area').style.display = 'block';
        document.querySelector('.question').innerHTML = perg.pergunta;
   
        let op = '';

        if(perguntaAtual > 0){
            document.getElementById('btVoltar').style.display = 'block';
        } else {
            document.getElementById('btVoltar').style.display = 'none';
        }
        
        for(let i in perg.options) {
            if(perguntaAtual === 5) {
                op += `<label><input value="${perg.options[i]}" type="checkbox" name="options"><span>${perg.options[i]}</span></input></label><br>`;    

            }else{
                op += `<label><input value="${perg.options[i]}" type="radio" name="options" id="options"><span>${perg.options[i]}</span></input></label><br>`;
            }
        }
        document.querySelector('.options').innerHTML = op;       
        
    } else {
        fim(opt);
    }
}

let btAvancar = document.getElementById('btAvancar');
btAvancar.addEventListener('click', ()=>{
    let checked = document.querySelectorAll('.options input');    
    let tituloQuestao = document.querySelector('.question span');  

    let op = null;
    
    for(check of checked){        
        if(check.checked){
            op = check.value;
            opt.push(`${tituloQuestao.innerText.bold()} = ${check.value}`);
        }
    }

    if(op === null){
        modal();
        return;
    }   

    console.log(opt);    
    perguntaAtual++;
    mostrarPergunta();
});

function fim(opt){
    document.querySelector('.success_info').style.display = 'block';
    document.querySelector('.question_area').style.display = 'none';
    document.querySelector('.barra').style.width = `100%`;

    let vescolhas =  '';
    
    for(op of opt){
        vescolhas += `<p>${op}</p>`;
    }
    document.querySelector('.success_info .escolhas').innerHTML = vescolhas;
}

let btReiniciar = document.getElementById('btReiniciar');
btReiniciar.addEventListener('click', () => {    
    perguntaAtual = 0;
    opt = [];
    mostrarPergunta();
});

function modal(){
    let modal = document.getElementById('staticBackdrop');
    let minhaModal = new bootstrap.Modal(modal)
    minhaModal.show();
    return;
}

let btVoltar = document.getElementById('btVoltar');
btVoltar.addEventListener('click', () => {
    perguntaAtual--;
    mostrarPergunta();
    opt.splice(-1, 1);    
});

