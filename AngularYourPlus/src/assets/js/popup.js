// JavaScript para el formulario popup
document.addEventListener('DOMContentLoaded', function () {
    const showPopupButton = document.getElementById('showPopupButton');
    const closePopupButton = document.getElementById('closePopupButton');
    const popup = document.getElementById('popup');

    showPopupButton.addEventListener('click', function () {
        popup.style.display = 'block';
    });

    closePopupButton.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });
});

// JavaScript para el formulario popup de registraer
document.addEventListener('DOMContentLoaded', function () {
  const showPopupButton1 = document.getElementById('showPopupButton1');
  const closePopupButton1 = document.getElementById('closePopupButton1');
  const popup1 = document.getElementById('popup1');

  showPopupButton1.addEventListener('click', function () {
      popup1.style.display = 'block';
  });

  closePopupButton1.addEventListener('click', function () {
      popup1.style.display = 'none';
  });

  window.addEventListener('click', function (event1) {
      if (event1.target == popup1) {
          popup1.style.display = 'none';
      }
  });
});


