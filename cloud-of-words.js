
var modelo;


function init(){
    // Primer modelo
    modelo = {
        words:[],
        action:"default"
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
    cloudElement.innerHTML = "";

    let numeroPalabras = 0;

    let listaPalabras = JSON.parse(JSON.stringify(modelo.words)); 
    
    if(modelo.action == "masusadas"){
        listaPalabras = listaPalabras.sort((wa, wb) =>{
            if(wa.weight == wb.weight)
                return 0;

            if(wa.weight > wb.weight)
                return -1;
            else
                return 1;
        } );
    }

    listaPalabras
    .filter(word => {
        if(modelo.action != "peque")
            return true;
        
        return word.word.length < 5;
    })
    .forEach(word => {
        const wordElement = document.createElement("div");
        
        wordElement.innerText = word.word;
        wordElement.style.fontSize = word.weight+"px";
        
        if(modelo.action != "blue"){
            
            if(word.word.length > 7){
                wordElement.style.color = "#0fa3b1ff";
                
                if(word.weight > 30)
                wordElement.style.color = "#f9f7f3ff";
                
            }else{
                wordElement.style.color = "#b5e2faff";
                
                if(word.weight > 30)
                wordElement.style.color = "#eddea4ff";
            }
            
            if(word.word.startsWith('a'))
            wordElement.style.color = "#f7a072ff";
            
        }else if(modelo.action == "blue"){
            wordElement.style.color = "#0000ffff";
        }
        
        
        numeroPalabras++;
        cloudElement.append(wordElement);
    });

    document.getElementById("muestra").innerText = numeroPalabras;
}

function update(action){
    modelo.action = action;
    view(modelo);
}