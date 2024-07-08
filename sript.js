let numero = parseFloat(prompt("ingresar un numero para su tabla de multiplicar: "));
for (let i = 1; i <= 10; i++) {
    let resultado = numero * i
    console.log(numero + " X " + i + " = " + resultado);
}

const numeros = [1, 2, 3, 4 , 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
let suma = 0
for (let i = 0; i < numeros.length; i++) {
    suma += numeros[i];
    
}
console.log("La suma de los numeros es: " + suma);


let library = [
    { title: "Cien años de soledad", author: "Gabriel García Márquez", year: 1967 },
    { title: "1984", author: "George Orwell", year: 1949 },
    { title: "Don Quijote de la Mancha", author: "Miguel de Cervantes", year: 1605 },
    { title: "La Odisea", author: "Homero", year: -800 }  // Estimated year of composition
];
let opcion = prompt("Si desea buscar un libro por autor ingresar el numero 1, si deseas buscar el libro por el año ingresar el numero 2 y si deseas mirar todas las propiedades de los libros en la biblioteca ingresar el numero 3: ");
if (opcion === "1") {
    let autor = prompt("Ingresar nombre de un autor: ");
    for (let i = 0; i < library.length; i++) {
    if (autor === library[i].author) {
    console.log("Libro disponible: " + " Titulo " + library[i].title  + " Autor " + library[i].author + " Año " + library[i].year)
  }
 }

} else if(opcion === "2") {
    let año = parseInt(prompt("Ingresar año: "));
    for (let i = 0; i < library.length; i++) {
    if (año === library[i].year) {
    console.log("Libro disponible: " + " Titulo: " + library[i].title  + " Autor: " + library[i].author + " Año: " + library[i].year)
  }
 }
}else if(opcion === "3") {
    for (let i = 0; i < library.length; i++) {
    console.log("Libro disponible: " + " Titulo: " + library[i].title  + " Autor: " + library[i].author + " Año: " + library[i].year)
  }
}