document.addEventListener('DOMContentLoaded', function() {
  const confirmButton = document.getElementById('confirm-button');

  // if (localStorage.getItem('confirmed')) {
  //   confirmButton.style.display = 'none';
  // }

  const guestList = {
    'steban delgado': 1,  // Juan puede llevar a 1 persona adicional (él + 1)
    'luz tapia': 3, // Maria puede llevar a 3 personas adicionales (ella + 3)
    'carlos escobar': 2, // Carlos puede llevar a 2 personas adicionales (él + 2)
    // Asegúrate de que todos los nombres en tu lista estén en minúsculas y sin espacios extra
  };

  document.getElementById('modal-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nameInput = document.getElementById('name-input').value;
    const normalizedInputName = normalizeName(nameInput); // Normaliza el nombre ingresado
    const message = document.getElementById('message-input').value;
    const attendance = document.querySelector('input[name="attendance"]:checked').value;

    // Obtener los cupos asignados con el nombre normalizado
    const guestCupo = guestList[normalizedInputName] || 0; // Si el invitado no está en la lista, asume 0 adicional

    // Mostrar la animación de "Enviando confirmación..."
    Swal.fire({
      title: 'Enviando confirmación...',
      text: 'Por favor, espera mientras procesamos tu asistencia.',
      confirmButtonColor: '#3085d6',
      showCancelButton: false,
      showLoaderOnConfirm: true,
      customClass: {
        title: 'custom-title',
        htmlContainer: 'custom-text',
        popup: 'custom-popup'
      },
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Configura tus variables para EmailJS
    const templateParams = {
      user_name: nameInput,
      user_message: message,
      user_attendance: attendance,
      user_cupo: guestCupo
    };

    // Enviar el correo electrónico usando EmailJS
    emailjs.send('service_l78bsuf', 'template_91koe6d', templateParams)
      .then(function(response) {
        Swal.close(); // Cerrar la animación de "Enviando confirmación..."
        if (attendance === 'Sí') {
          Swal.fire({
            title: '¡Gracias, ' + nameInput + '!',
            text: 'Nos alegra saber que asistirás a nuestra boda. Puedes llevar a ' + guestCupo + ' persona(s) adicional(es).',
            icon: 'success',
            color: '#155724',
            confirmButtonText: '¡Genial!',
            confirmButtonColor: '#28a745',
            customClass: {
              title: 'custom-title',
              htmlContainer: 'custom-text',
              popup: 'custom-popup'
            }
          }).then(() => {
            const modalElement = document.getElementById('Modal-Asistencia');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
            confirmButton.style.display = 'none';
            localStorage.setItem('confirmed', true);
          });
        } else {
          Swal.fire({
            title: '¡Gracias, ' + nameInput + '!',
            text: 'Lamentamos que no puedas asistir. ¡Te echaremos de menos!',
            icon: 'error',
            color: '#a94442',
            confirmButtonText: 'Está bien',
            confirmButtonColor: '#d33',
            customClass: {
              title: 'custom-title',
              htmlContainer: 'custom-text',
              popup: 'custom-popup'
            }
          }).then(() => {
            const modalElement = document.getElementById('Modal-Asistencia');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
            confirmButton.style.display = 'none';
            localStorage.setItem('confirmed', true);
          });
        }
      }, function(error) {
        console.log('FAILED...', error);
      });
  });

  // Función para normalizar nombres (elimina espacios extra y convierte a minúsculas)
  function normalizeName(name) {
    return name.trim().toLowerCase();
  }

  // Limitar el mensaje a 30 palabras
  const messageInput = document.getElementById('message-input');
  const wordCountDisplay = document.createElement('small');
  wordCountDisplay.className = 'form-text text-muted';
  messageInput.parentNode.appendChild(wordCountDisplay);
  
  const maxWords = 30;

  function countWords(text) {
    return text.trim().split(/\s+/).filter(function(word) {
      return word.length > 0;
    }).length;
  }

  messageInput.addEventListener('input', function() {
    const words = countWords(messageInput.value);

    if (words > maxWords) {
      const trimmedText = messageInput.value.split(/\s+/).slice(0, maxWords).join(' ');
      messageInput.value = trimmedText;
    }

    wordCountDisplay.textContent = `${countWords(messageInput.value)}/${maxWords} Máximo 30 palabras`;
  });

  // Definir la fecha del evento
  const eventDate = new Date('March 23, 2025 10:00:00').getTime();

  // Actualizar el contador cada 1 segundo
  const countdownInterval = setInterval(function() {

    // Obtener la fecha y hora actuales
    const now = new Date().getTime();

    // Calcular la distancia entre la fecha actual y la fecha del evento
    const distance = eventDate - now;

    // Calcular el tiempo en días, horas, minutos y segundos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualizar los valores en el HTML
    document.getElementById("days").innerHTML = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? '0' + seconds : seconds;

    // Si el contador ha terminado, mostrar un mensaje
    if (distance < 0) {
      clearInterval(countdownInterval);
      document.getElementById("days").innerHTML = "00";
      document.getElementById("hours").innerHTML = "00";
      document.getElementById("minutes").innerHTML = "00";
      document.getElementById("seconds").innerHTML = "00";
    }
  }, 1000);
});


