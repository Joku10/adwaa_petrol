document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var form = document.getElementById('enquiry-form');
  var status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
        status.style.color = '#b3261e';
        status.textContent = 'Form is not connected yet — add your Formspree endpoint in contact.html.';
        return;
      }
      status.style.color = '';
      status.textContent = 'Sending…';
      var data = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          status.style.color = '#1a7f37';
          status.textContent = 'Thank you — your enquiry has been sent. We will be in touch shortly.';
          form.reset();
        } else {
          response.json().then(function (json) {
            status.style.color = '#b3261e';
            status.textContent = (json.errors && json.errors.map(function (e) { return e.message; }).join(', ')) || 'Something went wrong. Please try again or email us directly.';
          }).catch(function () {
            status.style.color = '#b3261e';
            status.textContent = 'Something went wrong. Please try again or email us directly.';
          });
        }
      }).catch(function () {
        status.style.color = '#b3261e';
        status.textContent = 'Network error. Please try again or email us directly.';
      });
    });
  }
});
