document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: "",
    asunto: "",
    mensaje: "",
  };

  //Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const inputCopia = document.querySelector("#copia");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector("#spinner");

  //Asignar eventos
  inputEmail.addEventListener("blur", validar);
  inputAsunto.addEventListener("blur", validar);
  inputMensaje.addEventListener("blur", validar);
  inputCopia.addEventListener("change", validarCC);
  formulario.addEventListener("submit", enviarEmail);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();

    resetFormulario();
  });

  function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.add("flex");
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");

      //Reiniciar el objeto
      resetFormulario();

      //Crear una alerta
      const alertaExito = document.createElement("P");
      alertaExito.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase",
      );
      alertaExito.textContent = "Mensaje enviado correctamente";
      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 3000);
  }

  function validar(e) {
    if (e.target.value.trim() === "") {
      mostrarAlerta(
        `El Campo ${e.target.id} es obligatorio`,
        e.target.parentElement,
      );
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }
    // Valida el email y muestra una alerta si no es válido.
    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta("El email no es valido", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    //Asignar valores
    email[e.target.name] = e.target.value.trim().toLowerCase();

    //Comprobar el objeto email
    comprobarEmail();
  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    // Generar alerta en HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

    // Inyectar el error en el formulario
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    //Comprueba si la Alerta existe
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  // Validar el Email
  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  function comprobarEmail() {
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
  }

  // Validar el CC
  function validarCC(e) {

    if(e.target.value.trim() === ""){
      limpiarAlerta(e.target.parentElement);
      email[e.target.name] = ""; // Elimina el campo del objeto si está vacío
      delete email[e.target.name];
      comprobarEmail();
      return;
    } 

    if (!validarEmail(e.target.value)) {
      mostrarAlerta("CC no es valido", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    } 

    // Limpiar alerta y asignar valor válido
    limpiarAlerta(e.target.parentElement);
    email[e.target.name] = e.target.value.trim().toLowerCase();
    comprobarEmail();
  }


  function resetFormulario() {
    //Reiniciar el objeto
    email.email = "";
    email.asunto = "";
    email.copia = "";
    email.mensaje = "";

    formulario.reset();
    comprobarEmail();
  }
});
