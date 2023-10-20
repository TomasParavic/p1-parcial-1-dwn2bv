'use strict';

// Clase Disco
class NuevoDisco {
    constructor(nombreDisco = `Nombre Disco`, autorDisco = `Nombre Autor`, codigoDisco = `Código Disco`, pistas = []) {
        this.nombre = nombreDisco;
        this.autor = autorDisco;
        this.codigo = codigoDisco;
        this.pistas = pistas;
    }

    // Calcula la duración total de las pistas
    get duracionTotal() {
        let duracionTotal = 0;
        for (const pista of this.pistas) {
            duracionTotal += pista.duracion;
        }
        return duracionTotal;
    }

    // Calcula el promedio de duración de las pistas
    get promDisco() {
        if (this.pistas.length > 0) {
            return this.duracionTotal / this.pistas.length;
        }
        return 0;
    }

    // Obtiene la pista con la mayor duración
    get pistaMaxima() {
        let maxDuracion = this.pistas[0].duracion;
        let maxPista = this.pistas[0];

        for (const pista of this.pistas) {
            if (pista.duracion > maxDuracion) {
                maxDuracion = pista.duracion;
                maxPista = pista;
            }
        }
        return maxPista;
    }
}

// Clase Pista
class Pista {
    constructor(nombrePista = `Nombre Pista`, duracionPista = `Duración Pista`) {
        this.nombre = nombrePista;
        this.duracion = duracionPista;
    }
}

// Arreglo de discos y contador
let discos = [];
let cuantosDiscos = 0;

// Función para cargar discos
const cargarDiscos = () => {
    let nombreDisco = pedirString("Ingrese nombre del disco que desea guardar.");
    let autorDisco = pedirString(`Ingrese nombre del autor del disco: ${nombreDisco}.`);
    let codigoDisco = pedirCodigo(`Ingrese un código numérico para referenciar a: ${nombreDisco} de ${autorDisco}, (entre 1 y 999).`);

    let pistas = [];

    do {
        let nombrePista = pedirString("Ingrese el nombre de la pista que desea guardar");
        let duracionPista = pedirDuracion(`Ingrese la duración de ${nombrePista} en segundos. (entre 1 y 7200)`);

        let pista = new Pista(nombrePista, duracionPista);
        pistas.push(pista);
    } while (confirm("¿Desea ingresar otra pista?"));

    let nuevoDisco = new NuevoDisco(nombreDisco, autorDisco, codigoDisco, pistas);
    discos.push(nuevoDisco);

    cuantosDiscos++;
    document.getElementById('cantidad-discos').textContent = `La cantidad ingresada es: ${cuantosDiscos}`;
};

// Función para mostrar discos
const mostrarDiscos = () => {
    let html = '';

    for (const nuevoDisco of discos) {
        let duracionTotalDisco = nuevoDisco.duracionTotal;
        let promXDisco = nuevoDisco.promDisco;
        let pistaMaximaDisco = nuevoDisco.pistaMaxima;

        html += `
            <div class=contenedor-discos>
                <p>#${nuevoDisco.codigo}</p>
                <div class=disco-artista>
                    <p>${nuevoDisco.nombre}</p>
                    <p>artista: ${nuevoDisco.autor}</p>
                </div>
                <ul>
                    <li><p>Pistas:</p>
                    <ol>`;

        for (const pista of nuevoDisco.pistas) {
            html += `
                        <li>${pista.nombre} - ${pista.duracion > 180 ? `<span class="red">${pista.duracion} segundos</span>` : `<span class="green">${pista.duracion} segundos</span>`}</li>`;
        }
        html += `
                    </ol>
                    </li>
                    <li>La duración total del disco es: ${duracionTotalDisco} segundos</li>
                    <li>El promedio de duración del disco es: ${promXDisco} segundos</li>
                    <li>La pista con mayor duración es ${pistaMaximaDisco.nombre} con: ${pistaMaximaDisco.duracion} segundos</li>
                </ul>
            </div>`;
    }

    document.getElementById('info').innerHTML = html;
};

// Función para buscar por código
const buscarCodigo = () => {
    let encuentraDisco = pedirNumParaBuscar(`Ingrese un código numérico para buscar el disco preferido. (entre 1 y 999).`);
    let html = ``;

    discos.forEach((disco) => {
        if (disco.codigo === encuentraDisco) {
            let duracionTotalDisco = disco.duracionTotal;
            let promXDisco = disco.promDisco;
            let pistaMaximaDisco = disco.pistaMaxima;

            html = `
                <div class=contenedor-discos>
                <p>#${disco.codigo}</p>
                <div class=disco-artista>
                    <p>${disco.nombre}</p>
                    <p>artista: ${disco.autor}</p>
                </div>
                <ul>
                    <li><p>Pistas:</p>
                    <ol>`;

            for (const pista of disco.pistas) {
                html += `
                    <li>${pista.nombre} - ${pista.duracion > 180 ? `<span class="red">${pista.duracion} segundos</span>` : `<span class="green">${pista.duracion} segundos</span>`}</li>`;
            }

            html += `</ol>
                </li>
                <li>La duración total del disco es: ${duracionTotalDisco} segundos</li>
                <li>El promedio de duración del disco es: ${promXDisco} segundos</li>
                <li>La pista con mayor duración es ${pistaMaximaDisco.nombre} con: ${pistaMaximaDisco.duracion} segundos</li>
                </ul>
            </div>`;
        }
    });

    document.getElementById('info').innerHTML = html;
};

// Función para validar los strings
function pedirString(pedidoUser) {
    let pedidoString;
    do {
        pedidoString = prompt(pedidoUser);
        if (!(pedidoString) || pedidoString === null || pedidoString === '') {
            alert("El dato ingresado no es valido, por favor intente nuevamente. Ej: Palabra");
        } else if (typeof pedidoString === `number`) {
            pedidoString = String(pedidoString);
        }
    } while (!(pedidoString) || pedidoString === null || pedidoString === '');

    return pedidoString;
}

// Función para validar los códigos
function pedirCodigo(pedidoUser) {
    let pedidoIntNumber;
    do {
        pedidoIntNumber = parseInt(prompt(pedidoUser));
        if (isNaN(pedidoIntNumber) || pedidoIntNumber < 1 || pedidoIntNumber > 999) {
            alert("El dato ingresado no es válido. Por favor, intente nuevamente. (del 1 al 999)");
        } else if (discos.find(disco => disco.codigo === pedidoIntNumber)) {
            alert("El código ingresado ya ha sido utilizado. Por favor, ingrese otro código.");
        }
    } while (isNaN(pedidoIntNumber) || pedidoIntNumber < 1 || pedidoIntNumber > 999 || discos.find(disco => disco.codigo === pedidoIntNumber));

    return pedidoIntNumber;
}

// Función para validar la duración
function pedirDuracion(pedidoUser) {
    let pedidoDuracion;
    do {
        pedidoDuracion = parseInt(prompt(pedidoUser));
        if (isNaN(pedidoDuracion) || pedidoDuracion < 1 || pedidoDuracion > 7200) {
            alert("el dato ingresado no es válido. Por favor, intente nuevamente. Ej: 123");
        }
    } while (isNaN(pedidoDuracion) || pedidoDuracion < 1 || pedidoDuracion > 7200);

    return pedidoDuracion;
}

// Función para buscar por código
function pedirNumParaBuscar(pedidoUser) {
    let cantidadError = 0;
    let maxError = 3;
    let buscarXCodigo;

    do {
        buscarXCodigo = parseInt(prompt(pedidoUser));

        if (isNaN(buscarXCodigo) || buscarXCodigo < 1 || buscarXCodigo > 999) {
            alert("código inválido");
        } else if (!discos.find(disco => disco.codigo === buscarXCodigo)) {
            alert("el código no existe, inténtelo nuevamente");
        }
        cantidadError++;
    } while (isNaN(buscarXCodigo) || buscarXCodigo < 1 || buscarXCodigo > 999 || !discos.find(disco => disco.codigo === buscarXCodigo) && cantidadError < maxError);

    if (cantidadError === maxError) {
        alert("El Disco no existe, ingréselo :)");
    }
    return buscarXCodigo;
}
