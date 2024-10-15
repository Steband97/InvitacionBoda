document.addEventListener('DOMContentLoaded', function() {
    const confirmButton = document.getElementById('confirm-button');
  
    if (localStorage.getItem('confirmed')) {
      confirmButton.style.display = 'none';
    }
  
    document.getElementById('modal-form').addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('name-input').value;
      const attendance = document.querySelector('input[name="attendance"]:checked').value;
  
      // Configura tus variables para EmailJS
      const templateParams = {
        user_name: name,
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
  });
  