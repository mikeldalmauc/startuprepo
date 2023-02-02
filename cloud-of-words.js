
var modelo;


function init(){
    // Primer modelo
    modelo = {
        words:[]
    };

    fetch("cloud-of-words.json")
    .then((response) => response.json())
    .then((response) => {
        modelo.words = response.words;
        
        // Primera vista
        view(modelo);
    });
}


function view(modelo){
    
    let cloudElement = document.getElementById("cloud-of-words");

    modelo.words.forEach(word => {

        const wordElement = document.createElement("div");
        wordElement.innerText = word.word;
        wordElement.style.fontSize = word.weight+"px";

        cloudElement.append(wordElement);
    });
}

