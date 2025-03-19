const containerEl=document.querySelector(".container");
const btnStart=document.querySelector(".start");
const btnRestart=document.querySelector(".restart");
const btnCheck=document.querySelector(".check");
const wordsContainerEl=document.querySelector(".words-container");
const inputEl=document.querySelector("input");
const labelEl=document.querySelector("label");

const words = [ "mare", "casa", "luna", "masa", "vaca", "soare", "nor",
    "castel", "cartof", "pisica", "cuvant", "minge", "lacrimă", "pădure",
    "astronaut", "elefant", "computer", "programare", "crocodil", "fotografie",
    "stejar", "vultur", "tigru", "tramvai", "planeta", "univers",
    "șarpe", "țestoasă", "păianjen", "zăpadă",  "ciupercă"
];



 // Alege un cuvant aleatoriu din array pe baza generarii unui index aleatoriu
 const randomIndex = Math.floor(Math.random() * words.length); 
 const randomWord = words[randomIndex];  

 let progressArray = []; //am luat un array gol initial in care tin progresul cuvantului 

btnStart.addEventListener('click',()=> {
    //cand se da click pe start elementele urmatoare devin vizibile

    btnStart.style.display='none';
    btnRestart.style.display='block'
    btnCheck.style.display='block'
    inputEl.style.display='block'
    inputEl.removeAttribute('disabled');
    labelEl.style.display='block'

    //afiseaza "_ " in functie de lugimea cuvantului 
    progressArray = Array.from(randomWord, () => "_"); // transform stringul randomword intr-un array de caractere folosind from(), iar fiecare cuvant din array este inlocuit de "_"
    // afiseaza progresul initial
      //eu acum am un array cu "_" dar trebuie sa il afiseze sub forma de string, de aceea folosesc join(" ") (acesta tranforma arrayul in string cu spatii intre caractere)
    wordsContainerEl.innerHTML = progressArray.join(" ");
    console.log(randomWord) ;
    inputEl.focus(); 

   


})

btnCheck.addEventListener('click',()=> {

    let letter = inputEl.value.toLowerCase(); // am luat litera introduse in input si le convertesc in litere mici
    let found=false; // tin stateul daca o litera a fost gasita

 //verificare daca nu exista nicio litera introdusa => afisare mesaj alerta
    if (!letter || letter.length !== 1) {
        alert("Te rog introdu o literă!");
        inputEl.value="";
        inputEl.focus();
        return;
    }
 

  
    //trebuie verificata fiecare litera din randomWord => folosesc metoda split() care imi da un array cu literele din cuvant
randomWord.split("").forEach((element, index) => {
      // daca litera din randomWord este aceeasi cu litera introdusa de la tastatura
         if(element === letter )
    {
        progressArray[index]=letter; // se inlocuieste "_" cu litera gasita la pozitia corecta din progressArray
        found=true; // litera a fost gasita 
    }
   

    });

    wordsContainerEl.innerHTML =progressArray.join(" "); // se actualizeaza stringul

    if (!found) {
        alert("Litera nu se afla in cuvânt!");
    }

      // Dacă utilizatorul a ghicit tot cuvântul, arată un mesaj de felicitare
      if (!progressArray.includes("_")) {
        alert("Felicitări! Ai ghicit cuvântul: " + randomWord);
    } 
    inputEl.value = ""; // 🔹 Curăță input-ul
    inputEl.focus(); 


    

})

btnRestart.addEventListener('click',()=> {

    location.reload();
})