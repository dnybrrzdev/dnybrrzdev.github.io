// Seleccionamos el contenedor donde se agregará la terminal dinámica
const terminalBody = document.querySelector('.body');

// Definimos los comandos disponibles y sus respuestas
const comandosDisponibles = {
  whoami: "hola, Daniel Barraza por aca!, DeV/web novato enfocado en aprender e implementar, interfaces limpias y buen SEO.",
  'ls proyectos': "- Calculadora Web\n- Buscaminas JS\n- Conversor de onzas",
  'contacto --help': "📧 Email: dnybrrzdev@gmail.com\n🔗 GitHub: github.com/dnybrrzdev\n🌐 Web: dnybrrzdev.github.io",
  ayuda: "Comandos disponibles:\n- whoami\n- ls proyectos\n- contacto --help\n- clear\n- ayuda",
  clear: "clear", // se maneja aparte
};

// Creamos el efecto de escritura letra por letra
function escribirLinea(texto, destino, delay = 30, callback = null) {
  let i = 0;
  const intervalo = setInterval(() => {
    if (i < texto.length) {
      destino.textContent += texto.charAt(i);
      i++;
    } else {
      clearInterval(intervalo);
      if (callback) callback(); // Ejecuta el callback una vez termina
    }
  }, delay);
}

// Simula el ingreso de un comando por parte del usuario
function simularComando(comando, respuesta) {
  const prompt = document.createElement('p');
  prompt.innerHTML = `<span class="prompt">eL_DeV@portafolio</span>:~$ ${comando}`;
  terminalBody.appendChild(prompt);

  const output = document.createElement('p');

  if (comando === "clear") {
    // Si el comando es clear, limpia la terminal
    terminalBody.innerHTML = '';
    return;
  }

  terminalBody.appendChild(output);
  escribirLinea(respuesta, output);
}

// Escucha el teclado para ingresar comandos reales
document.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const input = document.querySelector("#terminal-input");
    const comando = input.value.trim();
    input.value = "";

    if (!comando) return;

    if (comando in comandosDisponibles) {
      const respuesta = comandosDisponibles[comando];
      simularComando(comando, respuesta);
    } else {
      simularComando(comando, `'${comando}': comando no encontrado. Usa 'ayuda' para ver opciones.`);
    }
  }
});

// Agrega el input de comandos al cargar la página
function inicializarTerminal() {
  const inputContainer = document.createElement('p');
  inputContainer.innerHTML = `
    <span class="prompt">eL_DeV@portafolio</span>:~$ 
    <input id="terminal-input" type="text" autofocus autocomplete="off" spellcheck="false" />
  `;
  terminalBody.appendChild(inputContainer);
  document.getElementById("terminal-input").focus();
}

// Autoejecuta algunos comandos al cargar para dar introducción
function introducirInicio() {
  simularComando("whoami", comandosDisponibles["whoami"]);
  setTimeout(() => {
    simularComando("ls proyectos", comandosDisponibles["ls proyectos"]);
    setTimeout(() => {
      simularComando("contacto --help", comandosDisponibles["contacto --help"]);
      setTimeout(() => {
        simularComando("ayuda", comandosDisponibles["ayuda"]);
        inicializarTerminal();
      }, 2000);
    }, 2000);
  }, 2000);
}

// Ejecutamos la introducción animada al cargar
window.onload = introducirInicio;


