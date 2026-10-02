/*---------------------------------*/
/*--|funcionalidad_ayuda_escolar|--*/
/*---------------------------------*/
const listaPreguntas = document.getElementById("listaPreguntas");
const contador = document.getElementById("contador");
const campoPregunta = document.getElementById("pregunta");
const campoRespuesta = document.getElementById("respuesta");
const botonGuardar = document.getElementById("guardar");
const botonLimpiar = document.getElementById("limpiar");
const botonEliminarTodo = document.getElementById("eliminarTodo");
const mensaje = document.getElementById("mensaje");
/*-------------------------------*/
/*--|datos_guardados_iniciales|--*/
/*-------------------------------*/
const datosIniciales = [
    {
        id: 1,
        pregunta: "¿Cómo organizar mejor mi tiempo de estudio?",
        respuesta: "Puedes crear un horario, establecer prioridades y dedicar un tiempo específico para cada materia."
    },
    {
        id: 2,
        pregunta: "¿Qué debo hacer antes de un examen?",
        respuesta: "Repasa tus apuntes, estudia los temas principales y realiza ejercicios para comprobar lo aprendido."
    },
    {
        id: 3,
        pregunta: "¿Cómo puedo mejorar mis calificaciones?",
        respuesta: "Mantén una rutina de estudio, entrega tus actividades a tiempo y pregunta al profesor cuando tengas dudas."
    }
];
/*-------------------------------------------------*/
/*--|obtener_y_guardar_datos_usando_localstorage|--*/
/*-------------------------------------------------*/
function obtenerDatos() {
    const datosGuardados = localStorage.getItem("ayuda_escolar");
    if (datosGuardados) {
        return JSON.parse(datosGuardados);
    }
    return datosIniciales;
}
function guardarDatos(datos) {
    localStorage.setItem("ayuda_escolar", JSON.stringify(datos));
}
/*---------------------------*/
/*--|mostrar_las_preguntas|--*/
/*---------------------------*/
function mostrarPreguntas() {
    const preguntas = obtenerDatos();
    listaPreguntas.innerHTML = "";
    preguntas.forEach((item) => {
        const contenedor = document.createElement("article");
        contenedor.className = "pregunta_item";
        contenedor.innerHTML = `
            <button class="pregunta_cabecera"><span><i class="fa-solid fa-circle-question icono_pregunta"></i>${item.pregunta}</span><i class="fa-solid fa-chevron-down icono_flecha"></i></button>
            <div class="respuesta">
                <p>${item.respuesta}</p>
            </div>
            <button class="boton eliminar_pregunta"><i class="fa-solid fa-trash"></i>Eliminar</button>
        `;
        listaPreguntas.appendChild(contenedor);
        agregarEventosPregunta(contenedor, item.id);
    });
    actualizarContador(preguntas);
}
/*-------------------------------------*/
/*--|eventos_de_preguntas_a_un_click|--*/
/*-------------------------------------*/
function agregarEventosPregunta(contenedor, id) {
    const botonPregunta = contenedor.querySelector(".pregunta_cabecera");
    const botonEliminar = contenedor.querySelector(".eliminar_pregunta");
    botonPregunta.addEventListener("click", () => {
        contenedor.classList.toggle("activa");
    });
    botonEliminar.addEventListener("click", () => {
        eliminarPregunta(id);
    });
}
function actualizarContador(preguntas) {
    contador.textContent = preguntas.length;
}
/*-----------------------*/
/*--|crear_la_pregunta|--*/
/*-----------------------*/
function crearPregunta() {
    const pregunta = campoPregunta.value.trim();
    const respuesta = campoRespuesta.value.trim();
    if (pregunta === "" || respuesta === "") {
        mensaje.textContent = "Completa la pregunta y la respuesta.";
        return;
    }
    const preguntas = obtenerDatos();
    const nuevaPregunta = {
        id: Date.now(),
        pregunta: pregunta,
        respuesta: respuesta
    };
    preguntas.push(nuevaPregunta);
    guardarDatos(preguntas);
    mostrarPreguntas();
    limpiarFormulario();
    mensaje.textContent = "Pregunta guardada correctamente.";
}
/*--------------------------*/
/*--|eliminar_la_pregunta|--*/
/*--------------------------*/
function eliminarPregunta(id) {
    const preguntas = obtenerDatos();
    const nuevasPreguntas = preguntas.filter((item) => {
        return item.id !== id;
    });
    guardarDatos(nuevasPreguntas);
    mostrarPreguntas();
}
/*---------------------------*/
/*--|limpiar_el_formulario|--*/
/*---------------------------*/
function limpiarFormulario() {
    campoPregunta.value = "";
    campoRespuesta.value = "";
    campoPregunta.focus();
}
/*------------------------------------------*/
/*--|eliminalos_todos_usando_localstorage|--*/
/*------------------------------------------*/
function eliminarTodas() {
    const confirmar = confirm("¿Deseas eliminar todas las preguntas?");
    if (confirmar) {
        localStorage.removeItem("ayuda_escolar");
        mostrarPreguntas();
        mensaje.textContent = "Todas las preguntas fueron eliminadas.";
    }
}
/*------------------------------------*/
/*--|eventos_del_teclado_a_un_click|--*/
/*------------------------------------*/
botonGuardar.addEventListener("click", crearPregunta);
botonLimpiar.addEventListener("click", () => {
    limpiarFormulario();
    mensaje.textContent = "";
});
botonEliminarTodo.addEventListener("click", eliminarTodas);
campoPregunta.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        campoRespuesta.focus();
    }
});
mostrarPreguntas();