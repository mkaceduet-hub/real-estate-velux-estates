(function ($) {
  'use strict';

  $(function () {
    var $body = $('body');
    var $menu = $('#siteMenu');

    $('#menuToggle').on('click', function () {
      $menu.toggleClass('nav-open');
    });

    $menu.find('a').on('click', function () {
      $menu.removeClass('nav-open');
    });

    $(window).on('scroll', function () {
      $body.toggleClass('has-scrolled', window.scrollY > 32);
    }).trigger('scroll');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(function (element) {
      observer.observe(element);
    });

    $('.filter-row button').on('click', function () {
      var filter = $(this).data('filter');
      $('.filter-row button').removeClass('filter-active');
      $(this).addClass('filter-active');
      $('.project-card').each(function () {
        var show = filter === 'all' || $(this).data('category') === filter;
        $(this).toggle(show);
      });
    });

    var $modal = $('#detailModal');
    var $modalImage = $('#modalImage');

    function openModal(data) {
      $('#modalTitle').text(data.title || 'Velora Estates');
      $('#modalLocation').text(data.location || 'Private collection');
      $('#modalDescription').text(data.description || 'A more considered way to live.');
      $modalImage.css('background-image', 'url("' + data.image + '")');
      $modal.attr('aria-hidden', 'false').addClass('is-open');
      $body.addClass('modal-open');
    }

    function closeModal() {
      $modal.attr('aria-hidden', 'true').removeClass('is-open');
      $body.removeClass('modal-open');
    }

    $('.project-card, .service-row, .article-card, .amenity-tile, .team-card').on('click', function (event) {
      if ($(event.target).closest('a, button').length && !$(event.target).hasClass('round-action') && !$(event.target).closest('.service-row, .article-card').length) return;
      openModal($(this).data());
    });

    $('.project-card, .service-row, .article-card, .amenity-tile, .team-card').on('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal($(this).data());
      }
    });

    $('#modalClose').on('click', closeModal);
    $modal.on('click', function (event) {
      if (event.target === this) closeModal();
    });
    $(document).on('keydown', function (event) {
      if (event.key === 'Escape') closeModal();
    });
    $('#modalCta').on('click', closeModal);

    $('#inquiryForm').on('submit', function (event) {
      event.preventDefault();
      $('#formSuccess').addClass('show');
      this.reset();
    });

    $('#propertySearchForm').on('submit', function (event) {
      event.preventDefault();
      var values = $(this).serializeArray().map(function (item) { return item.value; }).filter(function (value) { return value && !/^Any /.test(value); });
      $('#searchResult').text(values.length ? 'Curating residences for: ' + values.join(' · ') + '.' : 'Showing our most considered addresses.');
      document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
    });

    function animateCounter(element) {
      var $element = $(element);
      if ($element.data('counted')) return;
      $element.data('counted', true);
      var target = Number($element.data('count'));
      var suffix = $element.data('suffix') || '';
      $({ value: 0 }).animate({ value: target }, { duration: 1400, easing: 'swing', step: function () { $element.text(Math.floor(this.value) + suffix); }, complete: function () { $element.text(target + suffix); } });
    }
    var counterObserver = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) $(entry.target).find('[data-count]').each(function () { animateCounter(this); }); }); }, { threshold: 0.45 });
    document.querySelectorAll('.counter-grid').forEach(function (element) { counterObserver.observe(element); });

    var slideIndex = 0;
    var $slides = $('.testimonial-slide');
    function showSlide(index) { slideIndex = (index + $slides.length) % $slides.length; $slides.removeClass('active').eq(slideIndex).addClass('active'); $('#testimonialIndex').text('0' + (slideIndex + 1) + ' / 0' + $slides.length); }
    $('#testimonialNext').on('click', function () { showSlide(slideIndex + 1); });
    $('#testimonialPrev').on('click', function () { showSlide(slideIndex - 1); });
    setInterval(function () { if ($slides.length) showSlide(slideIndex + 1); }, 6500);

    $('#videoPlay').on('click', function () { $('#videoModal').addClass('is-open').attr('aria-hidden', 'false'); $('body').addClass('modal-open'); });
    $('#videoClose, #videoModal').on('click', function (event) { if (event.target === this || event.currentTarget.id === 'videoClose') { $('#videoModal').removeClass('is-open').attr('aria-hidden', 'true'); $('body').removeClass('modal-open'); } });

    var heroIndex = 0;
    var $heroSlides = $('.hero-slide');
    var heroLocations = ['Gulshan · Dhaka', 'Banani · Dhaka', "Cox's Bazar · Bangladesh", 'Baridhara · Dhaka'];
    function showHero(index) { heroIndex = (index + $heroSlides.length) % $heroSlides.length; $heroSlides.removeClass('active').eq(heroIndex).addClass('active'); $('#heroIndex').text('0' + (heroIndex + 1) + ' / 04'); $('#heroLocation').text(heroLocations[heroIndex]); $('#heroDots button').removeClass('active').eq(heroIndex).addClass('active'); }
    $('#heroNext').on('click', function () { showHero(heroIndex + 1); });
    $('#heroPrev').on('click', function () { showHero(heroIndex - 1); });
    $('#heroDots button').on('click', function () { showHero(Number($(this).data('slide'))); });
    setInterval(function () { if ($heroSlides.length) showHero(heroIndex + 1); }, 7000);
  });
})(window.jQuery);
