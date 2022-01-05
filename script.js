const randomNumber = document.querySelector(".container-number p"),
  winnersNumberBtn = document.querySelector(".winners-number-btn"),
  losersNumberBtn = document.querySelector(".losers-number-btn"),
  containerLoader = document.querySelector(".container-loader"),
  containerNumber = document.querySelector(".container-number"),
  inputTotalNumbers = document.querySelector(".total-number"),
  winnersNumbers = document.querySelector(".container-winners-numbers div"),
  losersNumbers = document.querySelector(".container-losing-numbers div"),
  modalClosebtn = document.querySelector(".popup button"),
  titleModal = document.querySelector(".popup h2"),
  contentModal = document.querySelector(".popup p"),
  enterPrizeBtn = document.querySelector(".enter-prize-btn"),
  inputEnterPrize = document.querySelector(".enter-prize"),
  acceptSettingsBtn = document.querySelector(".accept-settings-btn");

let totalNumber;
let randomNum;
let arrayNumbers = [];

//Renderiza los premios
const renderAwards = () => {
  const containerListPrize = document.querySelector(".container-list-prize"),
    listPrize = document.querySelector(".container-list-prize ol"),
    listItem = document.createElement("li");

  containerListPrize.style.display = "flex";
  listItem.textContent = inputEnterPrize.value.toUpperCase();
  listPrize.appendChild(listItem);
  inputEnterPrize.value = "";
};

//activa y desactiva el popup
const toogle = () => {
  let blur = document.querySelector(".blur");
  let popup = document.querySelector(".popup");
  blur.classList.toggle("active");
  popup.classList.toggle("active");
  containerNumber.classList.remove("none");
  containerLoader.classList.add("none");
};

//Guarda la configuración del sorteo y valida la data
const saveSetting = () => {
  const subtitleMain = document.querySelector(".main p");
  let acceptedValues = /^[0-9]+$/;
  totalNumber = inputTotalNumbers.value;

  if (inputTotalNumbers.value > 999) {
    titleModal.textContent = "Excede el maxímo de números soportados";
    contentModal.textContent = "Intente con un valor inferior a 999";
    return toogle();
  }

  if (inputTotalNumbers.value === "") {
    titleModal.textContent = "Debe Ingresar el total de números de la rifa";
    contentModal.textContent = "";
    return toogle();
  }

  if (!totalNumber.match(acceptedValues)) {
    titleModal.textContent = "El valor ingresado no es un número";
    contentModal.textContent = "Ingrese un valor Númerico";
    return toogle();
  }

  subtitleMain.textContent = `Los números sorteados van del 1 al ${totalNumber}`;
};

//Obtiene un numero aleatorio
const getRandomNumber = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

//Obtiene el numero premiado y lo renderiza
const getNumber = (elementTarget) => {
  randomNum = getRandomNumber(1, totalNumber);

  if (isNaN(randomNum) || totalNumber === "") {
    titleModal.textContent = "Debe Ingresar el total de números de la rifa";
    contentModal.textContent = "";
    return toogle();
  }

  if (arrayNumbers.length == totalNumber) {
    titleModal.textContent = "Fin del Sorteo";
    contentModal.textContent = "No quedan números por sortear";
    return toogle();
  }

  if (!arrayNumbers.includes(randomNum)) {
    arrayNumbers.push(randomNum);
    let number = document.createElement("p");
    number.textContent = randomNum;
    containerNumber.classList.add("none");
    containerLoader.classList.remove("none");
    randomNumber.textContent = randomNum;
    setTimeout(() => {
      containerNumber.classList.remove("none");
      containerLoader.classList.add("none");
      if (elementTarget === winnersNumberBtn) {
        winnersNumbers.appendChild(number);
      }
      if (elementTarget === losersNumberBtn) {
        losersNumbers.appendChild(number);
      }
    }, 5000);
  } else {
    //getNumberWinner();
    titleModal.textContent = `El número ${randomNum} está repetido`;
    contentModal.textContent = "Presione cerrar y obtenga un nuevo número.";
    containerNumber.classList.add("none");
    containerLoader.classList.remove("none");
    setTimeout(() => {
      toogle();
    }, 3000);
  }
};

//Delegación de evento click
document.addEventListener("click", (e) => {
  if (e.target === winnersNumberBtn || e.target === losersNumberBtn) {
    getNumber(e.target);
  }

  if (e.target === modalClosebtn) {
    toogle();
  }

  if (e.target === enterPrizeBtn) {
    if (inputEnterPrize.value !== "") {
      renderAwards();
    }
  }

  if (e.target === acceptSettingsBtn) {
    saveSetting();
  }
});

//Delegación de evento keyup
document.addEventListener("keyup", (e) => {
  if (e.target === inputEnterPrize && e.code === "Enter") {
    renderAwards();
  }

  if (e.target === inputTotalNumbers && e.code === "Enter") {
    saveSetting();
  }
});

/* Animation Title */
const text = document.querySelector(".text");
//divide el texto en letras
text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");

//configuración de la animación
anime
  .timeline({
    loop: true,
  })
  //cada .add va agregando diferentes animaciones
  .add({
    targets: ".text span",
    translateY: [-500, 0], //start value, end value. TranslateY hace que las letras salgan hacia arriba.
    scale: [10, 1], //start value, end value
    opacity: [0, 1], //start value, end value
    easing: "easeOutExpo",
    duration: 2000, //1.5 segundos
    delay: anime.stagger(100),
  })

  //Este código es para que la anicación salga por el costado izquierdo
  .add({
    targets: ".text span",
    translateX: [0, -360], // TranslateX hace que las letras salgan hacia el lado izquierdo.
    scale: [1, 1], //start value, end value
    opacity: [1, 0], //start value, end value
    easing: "easeOutExpo",
    duration: 3000, //3 segundos
    delay: anime.stagger(100),
  })

  //aparece nuevamente el texto de derecha a izquierda
  .add({
    targets: ".text span",
    translateX: [470, 0], // TranslateY hace que las letras aparecen de derecha a izquierda.
    scale: [1, 1], //start value, end value
    opacity: [0, 1], //start value, end value
    easing: "easeOutExpo",
    duration: 3000, //3 segundos
    delay: anime.stagger(100),
  })

  .add({
    targets: ".text span",
    translateX: [0, -360], // TranslateX hace que las letras salgan hacia el lado izquierdo.
    scale: [1, 1], //start value, end value
    opacity: [1, 0], //start value, end value
    easing: "easeOutExpo",
    duration: 3000, //3 segundos
    delay: anime.stagger(100),
  });
