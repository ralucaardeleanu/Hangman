const containerEl = document.querySelector(".container");
const btnStart = document.querySelector(".start");
const btnRestart = document.querySelector(".restart");
const btnCheck = document.querySelector(".check");
const wordsContainerEl = document.querySelector(".words-container");
const hintEl = document.querySelector(".hint");
const inputEl = document.querySelector("input");
const labelEl = document.querySelector("label");

const words = [
    "mare", "casa", "luna", "masa", "vaca", "soare", "nor",
    "castel", "cartof", "pisica", "cuvant", "minge", "lacrima", "padure",
    "astronaut", "elefant", "computer", "programare", "crocodil", "fotografie",
    "stejar", "vultur", "tigru", "tramvai", "planeta", "univers",
    "sarpe", "testoasa", "paianjen", "zapada", "ciuperca"
];

const wordHints = new Map([
    ["mare", "Intindere vasta de apa."],
    ["casa", "Locul unde traiesti."],
    ["luna", "Satelitul natural al Pamantului."],
    ["masa", "Mobila pe care mananci sau lucrezi."],
    ["vaca", "Animal care da lapte."],
    ["soare", "Steaua care lumineaza ziua."],
    ["nor", "Se afla pe cer si aduce ploaia."],
    ["castel", "Cladire mare, unde traiau regii."],
    ["cartof", "Leguma folosita pentru piure sau prajit."],
    ["pisica", "Animal de companie care toarce."],
    ["cuvant", "Unitatea de baza a limbajului."],
    ["minge", "Obiect rotund folosit in sporturi."],
    ["lacrima", "Apare cand plangi."],
    ["padure", "Loc cu multi copaci."],
    ["astronaut", "Persoana care merge in spatiu."],
    ["elefant", "Cel mai mare animal terestru."],
    ["computer", "Dispozitiv electronic folosit pentru munca si jocuri."],
    ["programare", "Scrierea codului pentru aplicatii si jocuri."],
    ["crocodil", "Reptila mare cu dinti ascutiti."],
    ["fotografie", "Imagine capturata cu un aparat special."],
    ["stejar", "Copac puternic si longeviv."],
    ["vultur", "Pasare rapitoare care zboara la mare inaltime."],
    ["tigru", "Felina mare cu dungi."],
    ["tramvai", "Mijloc de transport care merge pe sine in oras."],
    ["planeta", "Corp ceresc care orbiteaza o stea."],
    ["univers", "Tot ceea ce exista, inclusiv stelele si galaxiile."],
    ["sarpe", "Reptila alungita, fara picioare."],
    ["testoasa", "Animal cu carapace."],
    ["paianjen", "Are opt picioare si tese panze."],
    ["zapada", "Alba si rece, cade iarna."],
    ["ciuperca", "Creste in padure, unele sunt comestibile."]
]);
let answerCounter = 0;
let progressArray = []; //am luat un array gol initial in care tin progresul cuvantului
let randomWord = ""; 
let availableWords = [...words]; //creez o copie a arrayului pentru a elimina cuvintele folosite deja

function nextWord() {
  if (answerCounter >= words.length) {
    hintEl.innerHTML="Felicitări! Ai terminat toate cuvintele!";
    btnCheck.style.display = "none";
    inputEl.style.display = "none";
    labelEl.style.display = "none";
    wordsContainerEl.style.display="none";

    return;
  }
// Alege un cuvant aleatoriu din array pe baza generarii unui index aleatoriu
const randomIndex = Math.floor(Math.random() * availableWords.length);
randomWord = availableWords[randomIndex];

  // Elimina cuvantul ales din availableWords pentru a nu mai fi selectat din nou
  availableWords.splice(randomIndex, 1);

  //afiseaza "_ " in functie de lugimea cuvantului
  progressArray = Array.from(randomWord, () => "_"); // transform stringul randomword intr-un array de caractere folosind from(), iar fiecare cuvant din array este inlocuit de "_"
  // afiseaza progresul initial
  //eu acum am un array cu "_" dar trebuie sa il afiseze sub forma de string, de aceea folosesc join(" ") (acesta tranforma arrayul in string cu spatii intre caractere)
  wordsContainerEl.innerHTML = progressArray.join(" ");
  console.log(randomWord);
  inputEl.focus();

  hintEl.innerHTML = `Hint: ${wordHints.get(randomWord) || "Fără hint!"}`;
  console.log(`🔹 Cuvânt ales: ${randomWord} | Cuvinte rămase: ${availableWords.length}`);

 
}

btnStart.addEventListener("click", () => {
  //cand se da click pe start elementele urmatoare devin vizibile
  btnStart.style.display = "none";
  btnRestart.style.display = "block";
  btnCheck.style.display = "block";
  hintEl.style.display = "block";
  inputEl.style.display = "block";
  inputEl.removeAttribute("disabled");
  labelEl.style.display = "block";

  nextWord();
});

btnCheck.addEventListener("click", () => {

  let letter = inputEl.value.toLowerCase(); // am luat litera introduse in input si le convertesc in litere mici
  let found = false; // tin stateul daca o litera a fost gasita

  //verificare daca nu exista nicio litera introdusa => afisare mesaj alerta
  if (!letter || letter.length !== 1) {
    alert("Te rog introdu o literă!");
    inputEl.value = "";
    inputEl.focus();
    return;
  }

  //trebuie verificata fiecare litera din randomWord => folosesc metoda split() care imi da un array cu literele din cuvant
  randomWord.split("").forEach((element, index) => {
    // daca litera din randomWord este aceeasi cu litera introdusa de la tastatura
    if (element === letter) {
      progressArray[index] = letter; // se inlocuieste "_" cu litera gasita la pozitia corecta din progressArray
      found = true; // litera a fost gasita
    }
  });

  wordsContainerEl.innerHTML = progressArray.join(" "); // se actualizeaza stringul

  if (!found) {
    alert("Litera nu se afla in cuvânt!");
  }

  // Dacă utilizatorul a ghicit tot cuvântul, arată un mesaj de felicitare
  if (!progressArray.includes("_")) {
    alert("Felicitări! Ai ghicit cuvântul: " + randomWord);
    answerCounter++;
    setTimeout(nextWord, 1000);
    console.log(answerCounter);
  }
  inputEl.value = ""; //  curata input-ul
  inputEl.focus();

  console.log(`Următorul cuvânt: ${randomWord}`);
});

btnRestart.addEventListener("click", () => {
  answerCounter = 0;
  nextWord();
});
