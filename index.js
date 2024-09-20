const pizzas = [
  {
    id: 1,
    nombre: "Pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "Pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "Pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "Pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "Pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

// Funciones///////////////////////////////////////////////////////////////////////

function renderLastPizza(){
  let objUltimaPizza = localStorage.getItem("ultimaPizza");
  if (objUltimaPizza) {
    console.log(objUltimaPizza);
    objUltimaPizza = JSON.parse(objUltimaPizza);
    console.log(objUltimaPizza);

    // Se crea el elemento div que contendra los elementos que componen la card y se le agrega la clase 'card'//
    const card = document.createElement("div");
    card.classList.add("card");

    // Se crea la imagen de la card////////////////////////////////////////////
    const imgCard = document.createElement("img");
    imgCard.src = objUltimaPizza.imagen;
    imgCard.classList.add("card__img");

    // Se crea el título de la card////////////////////////////////////////////
    const tittleCard = document.createElement("h2");
    tittleCard.innerText = objUltimaPizza.nombre;
    tittleCard.classList.add("card__tittle");

    // Se crea el contenido de la card/////////////////////////////////////////
    const ulCard = document.createElement("ul");
    ulCard.classList.add("card__ul");

    const liIngredientes = document.createElement("li");
    liIngredientes.innerText = objUltimaPizza.ingredientes.join(", ");

    const liPrecio = document.createElement("li");
    liPrecio.innerText = `$${objUltimaPizza.precio}`;

    // Se anexan los elementos

    card.appendChild(imgCard);
    card.appendChild(tittleCard);
    card.appendChild(liIngredientes);
    card.appendChild(liPrecio);

    const main = document.querySelector(".main__container");
    main.appendChild(card);
  }
}

// Función que "limpia" el div main__container//////////////////////////
function divCleaner(){
  const main = document.querySelector('.main__container')
  main.innerHTML = ''
};

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// Llamada de la funcion que renderiza la ultima pizza solicitada y almacenada en el local storage///////////
renderLastPizza()

// Evitar recarga de la web y poner el formulario a la escucha del evento submit /////////////////////////////////////////////////////////////////
const form = document.getElementById(`formulario`);
form.addEventListener(`submit`, (event) => {
  event.preventDefault();
  
  // Llamada de la funcion divCleaner///////////////////////////////////
  divCleaner();

  // Captura el valor del input del formulario al momento del evento submit/////
  const inputNoNum = document.getElementById(`inputForm`).value

  // Verifica que el input no este vacio, en caso de que este vacio renderiza un mensaje de error en el main////////////////////////////////////////
  if (inputNoNum === "") {
    divCleaner()
    const inputVacio = document.createElement('p')
    inputVacio.innerText = 'Debes ingresar un número'
    inputVacio.classList.add('main__errorTextVacio')

    const main = document.querySelector('.main__container')
    main.appendChild(inputVacio)

  }else{
 
    // Convierte el input String del formulario en un tipo Number///////////////////
    const inputNum = Number(inputNoNum)

    // Funcion para comprobar si el numero ingresado es válido
    const validarInput = pizzas.some((pizza => {
      return pizza.id === inputNum}))

    // Si el número es válido entonces renderizo la card correspondiente//////////
    if (validarInput === true) {
      const pizzaARenderizar = pizzas.find((pizza => {
        return pizza.id === inputNum}))

      // Guarda la ultima pizza renderizada en el Local Storage///////////////////
      localStorage.setItem("ultimaPizza", JSON.stringify(pizzaARenderizar));
      
      // Se crea el elemento div que contendra los elementos que componen la card y se le agrega la clase 'card'//
      const card = document.createElement('div')
      card.classList.add('card')

      // Se crea la imagen de la card////////////////////////////////////////////
      const imgCard = document.createElement('img')
      imgCard.src = pizzaARenderizar.imagen
      imgCard.classList.add('card__img')

      // Se crea el título de la card////////////////////////////////////////////
      const tittleCard = document.createElement('h2')
      tittleCard.innerText = pizzaARenderizar.nombre
      tittleCard.classList.add('card__tittle')

      // Se crea el contenido de la card/////////////////////////////////////////
      const ulCard = document.createElement('ul')
      ulCard.classList.add('card__ul')
      
      const liIngredientes = document.createElement('li')
      liIngredientes.innerText = pizzaARenderizar.ingredientes.join(", ")

      const liPrecio = document.createElement('li')
      liPrecio.innerText = `$${pizzaARenderizar.precio}`

      // Se anexan los elementos

      card.appendChild(imgCard)
      card.appendChild(tittleCard)
      card.appendChild(liIngredientes)
      card.appendChild(liPrecio)

      const main = document.querySelector(".main__container");
      main.appendChild(card)
    } else {

      // Renderiza un mensaje en el main explicando que el número ingresado no es valido/////////
      const inputInvalido = document.createElement('p')
      inputInvalido.innerText = 'El número de pizza ingresado no existe en el menú'
      inputInvalido.classList.add('main__errorTextInvalido')

      const main = document.querySelector(".main__container");
      main.appendChild(inputInvalido)
    }
  }  
})
    
    