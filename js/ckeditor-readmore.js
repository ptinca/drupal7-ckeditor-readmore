/**
 * @file
 * CKEditor Read more functionality.
 */

(function ($) {
  'use strict';
  Drupal.behaviors.ckeditorReadmore = {
    attach: function (context, settings) {
      var $ckeditorReadmore = $('.ckeditor-readmore');

      if ($ckeditorReadmore.length > 0) {
        $ckeditorReadmore
          .once()
          .wrap('<div class="ckeditor-readmore-wrapper"></div>')
          .parent()
          .prepend('<button class="ckeditor-readmore-btn">Read more</button>');

        $('body').once('ckeditorReadmoreToggleEvent').on('click', '.ckeditor-readmore-btn', function (ev) {
          $(this).next().slideToggle();
        })
      }
    }
  };
})(jQuery);
