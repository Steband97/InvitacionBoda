document.addEventListener('DOMContentLoaded', function() {
  const confirmButton = document.getElementById('confirm-button');

  if (localStorage.getItem('confirmed')) {
    confirmButton.style.display = 'none';
  }

  document.getElementById('modal-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name-input').value;
    const message = document.getElementById('message-input').value;
    const attendance = document.querySelector('input[name="attendance"]:checked').value;

    // Configura tus variables para EmailJS
    const templateParams = {
      user_name: name,
      user_message: message, // Añade el mensaje
      user_attendance: attendance
    };

    // Enviar el correo electrónico usando EmailJS
    emailjs.send('service_l78bsuf', 'template_91koe6d', templateParams)
      .then(function(response) {
        if (attendance === 'Sí') {
          Swal.fire('¡Gracias, ' + name + '!', 'Nos alegra saber que asistirás a nuestra boda.', 'success').then(() => {
            const modalElement = document.getElementById('Modal-Asistencia');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
            confirmButton.style.display = 'none';
            localStorage.setItem('confirmed', true);
          });
        } else {
          Swal.fire('¡Gracias, ' + name + '!', 'Lamentamos que no puedas asistir. ¡Te echaremos de menos!', 'error').then(() => {
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

  // Limitar el mensaje a 50 palabras
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
