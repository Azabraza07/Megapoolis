  /* modal */
  const modalCall = $('[data-modal]');
  const modalClose = $('[data-close]');

  modalCall.on('click', function (event) {
      event.preventDefault();

      let $this = $(this),
          modalId = $this.data('modal');

      $(modalId).addClass('show');
      $('body').addClass('no-scroll');
  });

  modalClose.on('click', function (event) {
      event.preventDefault();

      let $this = $(this),
          modalParent = $this.parents('.modal');

      modalParent.removeClass('show');
      $('body').removeClass('no-scroll');
      $('.modal__slider').slick({
          prevArrow: ' <button class="click__arrow prev"><img src="images/icons/arrow-slide.svg" alt=""></button>',
          nextArrow: '<button class="click__arrow next"><img src="images/icons/arrow-slide.svg" alt=""></button>',
      });
  });
  $('.modal__application-btn page__btn').on('click', () => {
      document.querySelector('#modal__thanks').classList.add('show')
      setTimeout(() => {
          document.querySelector('#modal__thanks').classList.remove('show')
      }, 2000)
  })
  $('.modal').on('click', function (event) {
      $(this).removeClass('show');
      $('body').removeClass('no-scroll');
  });

  $('.modal__content').on('click', function (event) {
      event.stopPropagation();
  });

  $('.modal__content').on('input', '.input-words', function () {
      this.value = this.value.replace(/[^a-zа-яё\s]/gi, '');
  });
  $('.consultation__form').on('input', '.input-words', function () {
      this.value = this.value.replace(/[^a-zа-яё\s]/gi, '');
  });
