export function valida(input){
    const tipoDeInput = input.dataset.type
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }
    console.log(input.parentElement)
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}
const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];
const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacio"
    },
    email: {
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Minimo 8 caracteres y un numero"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18"
    }

};

    

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput,input){
    let mensaje = "";
    tipoDeErrores.forEach( error =>{
        if(input.validity[tipoDeInput, error]){
            console.log(error)
            console.log(mensajesDeError[tipoDeInput][error])
            mensaje = mensajesDeError [tipoDeInput][error]
        }
    })
    return mensaje;
};

function validarNacimiento(input){
    const fechaCliente = new Date(input.value)
    mayorDeEdad(fechaCliente)
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18"
    }
    input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear()+ 18,
     fecha.getUTCMonth(),
     fecha.getUTCDate())
    return diferenciaFechas <= fechaActual;
}