(function () {
  'use strict';

  function initSmoothScroll() {
    if (typeof SmoothScroll === 'undefined') {
      console.error(
        'SmoothScroll is not defined. The smooth-scroll library failed to load; ' +
          'anchor navigation will fall back to the browser default.'
      );
      return;
    }

    try {
      new SmoothScroll('a[href*="#section-"]');
    } catch (err) {
      console.error('Failed to initialise SmoothScroll:', err);
    }
  }

  function initNewsletterForm() {
    var form = document.getElementById('newsletter-form');
    if (!form) {
      console.error('Newsletter form (#newsletter-form) was not found in the DOM.');
      return;
    }

    var status = document.getElementById('newsletter-status');

    function report(message, isError) {
      if (status) {
        status.textContent = message;
        status.classList.toggle('text-danger', !!isError);
        status.classList.toggle('text-success', !isError);
      }
      if (isError) {
        console.error(message);
      }
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = document.getElementById('input-name');
      var email = document.getElementById('input-email');
      var terms = document.getElementById('input-terms');

      if (!name || !email || !terms) {
        report('Newsletter form is missing required fields; cannot submit.', true);
        return;
      }

      if (!name.value.trim()) {
        report('Please enter your name.', true);
        name.focus();
        return;
      }

      if (!email.value.trim() || !email.checkValidity()) {
        report('Please enter a valid email address.', true);
        email.focus();
        return;
      }

      if (!terms.checked) {
        report('Please accept the terms and conditions before signing up.', true);
        terms.focus();
        return;
      }

      report('Thanks for signing up! We will be in touch.', false);
      form.reset();
    });
  }

  function init() {
    initSmoothScroll();
    initNewsletterForm();
  }

  if (typeof jQuery !== 'undefined') {
    jQuery(init);
  } else {
    console.error(
      'jQuery is not defined; falling back to DOMContentLoaded for initialisation.'
    );
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }
})();
