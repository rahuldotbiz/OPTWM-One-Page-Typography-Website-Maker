$(document).ready(function() {

  // intro
  $('.intro').on('click', function(e) {
    if( !$(e.target).hasClass('link') ) {

      $(this).removeClass('intro--visible');
      $('body').removeClass('body--noscroll');
      $('.intro-logo').removeClass('intro-logo--animated');
      $('.intro-fadein').removeClass('intro-fadein--animated');
      $('.intro-slideshow').removeClass('intro-slideshow-fadein--animated');

      $('.editcontent-button-intro').addClass('editcontent-button-intro--highlight');
    }
  });

  // intro slideshow
  $(function(){
    $('.intro-slideshow div').infiniteslide({
        'speed': 100,
        'direction': 'up', //up/down/left/right
        'pauseonhover': false,
        'responsive': true,
        'clone': 1
    });
  });


  // prevent copying styles when copy and pasting text
  $('.text').on('paste', function(e) {
      // cancel paste
      e.preventDefault();
      // get text representation of clipboard
      var text = (e.originalEvent || e).clipboardData.getData('text/plain');
      text = text.replace(/\n/g, " ");
      // insert text manually
      document.execCommand("insertHTML", false, text);
  });


  var standardtext = "Here's a new paragraph.";

  // add paragraph
  $('.editcontent-button-addp').on('click', function() {

    if(!$(this).hasClass('editcontent-button--disabled')) {
      $('.active').removeClass('active');
      $('.text').append('<p contenteditable="true" class="text-p active">'+standardtext+'</p>');
      $('.text p.active').focus();

      // correct data-numbers
      $('.text p').each(function() {
        var index = $(this).index();
        $(this).attr('data-number', index);
      });

    }

    // limit to 20 paragraphs
    if($('.text p').length >= 20) {
      $('.editcontent-button-addp').addClass('editcontent-button--disabled');
    }
  });

  // remove paragraph
  $('.editcontent-button-removep').on('click', function() {
    if(!($(this).hasClass('editcontent-button--disabled'))) {
      $(this).addClass('editcontent-button--disabled');

      if($('.active').text() == standardtext) {
        $('.active').fadeTo(100, 1, function(){
          $(this).slideUp(150, function() {
            $(this).remove();

            // correct data-numbers
            $('.text p').each(function() {
              var index = $(this).index();
              $(this).attr('data-number', index);
            });

            // reenable addp button if there are less than 20 elements
            if($('.text p').length < 20) {
              $('.editcontent-button-addp').removeClass('editcontent-button--disabled');
            }

          });
        });
      }

      else {
        $('.text p.active').addClass('readyToRemove');
        $('.dialog-remove').addClass('dialog--visible');
        $('.layer').addClass('layer--visible');

        $('.settings').removeClass('settings--visible');
        $('.editcontent-button--active').removeClass('editcontent-button--active');
      }

    }
  });

  $('.dialog-remove-ok').on('click', function() {
    $('.readyToRemove').fadeTo(100, 1, function(){
      $(this).slideUp(150, function() {
        $(this).remove();

        // correct data-numbers
        $('.text p').each(function() {
          var index = $(this).index();
          $(this).attr('data-number', index);
        });

        // reenable addp button if there are less than 20 elements
        if($('.text p').length < 20) {
          $('.editcontent-button-addp').removeClass('editcontent-button--disabled');
        }

      });

    });
    $('.dialog-remove').removeClass('dialog--visible');
    $('.layer').removeClass('layer--visible');
  });

  $('.dialog-remove-cancel').on('click', function() {
    $('.readyToRemove').removeClass('readyToRemove');
    $('.dialog-remove').removeClass('dialog--visible');
    $('.layer').removeClass('layer--visible');
  });

  // switch active paragraph + toggle remove button
  $('.text').on('focus', '*[contenteditable="true"]', function() {
    $('.active').removeClass('active');
    $(this).addClass('active');

    if($(this).hasClass('text-p')) {
      $('.editcontent-button-removep').removeClass('editcontent-button--disabled');
    }
    else {
      $('.editcontent-button-removep').addClass('editcontent-button--disabled');
    }
  });

  $('*').on('focus', function() {
    if( (!$(this).hasClass('text-p')) && (!$(this).hasClass('editcontent-button-removep'))) {
      $('.editcontent-button-removep').addClass('editcontent-button--disabled');
    }
  });

  // $('.settings *').on('focus', function() {
  //   $('.editcontent-button-removep').addClass('editcontent-button--disabled');
  // });

  // $('.text').on('focusout', 'p[contenteditable="true"]', function() {
    // setTimeout(function() {
    //   $('.editcontent-button-removep').addClass('editcontent-button--disabled');
    // }, 200);
  // });



  // $('.text').on('focus', '*[contenteditable="true"]', function() {
  //     $('.active').removeClass('active');
  //     $(this).addClass('active');
  //
  //     if( $('p.active').is(':focus')) {
  //       $('.editcontent-button-removep').removeClass('editcontent-button--disabled');
  //     }
  //
  //     // else {
  //     //   $('.editcontent-button-removep').addClass('editcontent-button--disabled');
  //     // }
  // });

  // $('.text').on('focusout', 'p.active', function() {
  //   setTimeout(function() {
  //     if(! ($('p.active').is(':focus')) ) {
  //       $('.editcontent-button-removep').addClass('editcontent-button--disabled');
  //     }
  //     else {
  //       $('.editcontent-button-removep').removeClass('editcontent-button--disabled');
  //     }
  //   }, 200);
  // });

  // NOTFALLLÃ–SUNG, NICHT IDEAL
  // $('.text').on('focus', 'p[contenteditable="true"]', function() {
  //   setTimeout(function() {
  //     $('.editcontent-button-removep').removeClass('editcontent-button--disabled');
  //   }, 300);
  // });

  // block enter button
  $('.text').on('keydown', function(e) {
      if(e.keyCode == 13){
        e.preventDefault();
      }
  });

  // link
  $('.text').on('keyup mouseup', '*[contenteditable="true"]', function() {
    if((window.getSelection().toString() != '') && (window.getSelection().toString() != ' ')) {
      $('.editcontent-button-adda').removeClass('editcontent-button--disabled');
    }
    else {
      $('.editcontent-button-adda').addClass('editcontent-button--disabled');
    }
  });

  $('.editcontent-button-adda').on('click', function() {
    if(!($(this).hasClass('editcontent-button--disabled'))) {
      userSelection = window.getSelection();

      var linkReplacementContent = $('.linkReplacement').html();
      $('.linkReplacement').replaceWith(linkReplacementContent);

      if((userSelection.toString() != '') && (userSelection.toString() != ' ')) {
        $('.active:contains('+userSelection+')').html(function(_, html) {
         return html.split(userSelection).join('<span class=linkReplacement>'+userSelection+'</span>');
        });

        $('.linkReplacement').not(':first').each(function() {
          var text = $(this).html();
          $(this).replaceWith(text);
        });

        $('.dialog-link').addClass('dialog--visible');
        $('.layer').addClass('layer--visible');
        $('.settings').removeClass('settings--visible');
        $('.editcontent-button--active').removeClass('editcontent-button--active');

        var oldlinktext = $('.linkReplacement').html();
        $('.dialog-link-text').val(oldlinktext);
      }

      else {
        $('.editcontent-button-adda').addClass('editcontent-button--disabled');
        $('.active').focus();
      }
    }
  });

  $('.dialog-link-add').on('click', function() {
    var linkurl = $('.dialog-link-url').val();
    var linktext = $('.dialog-link-text').val();

    if($('.dialog-link-newwindow').prop('checked')) {
      var linktarget = ' target="_blank"';
    }
    else {
      var linktarget = ' ';
    }

    $('.linkReplacement').replaceWith('<a'+linktarget+'href="'+linkurl+'">'+linktext+'</a>');

    $('.dialog-link').removeClass('dialog--visible');
    $('.layer').removeClass('layer--visible');

    $('.text a > a').unwrap();
  });

  $('.dialog-link-cancel').on('click', function() {
    $('.dialog-link').removeClass('dialog--visible');
    $('.layer').removeClass('layer--visible');

    var text = $('.linkReplacement').html();
    $('.linkReplacement').replaceWith(text);
  });

  // layer click -> cancel
  $('.layer').on('click', function() {
    $('.dialog').removeClass('dialog--visible');
    $('.linkReplacement').removeClass('');

    var text = $('.linkReplacement').html();
    $('.linkReplacement').replaceWith(text);

    $('.readyToRemove').removeClass('readyToRemove');

    $(this).removeClass('layer--visible');
  });


  // disable inactive buttons
  $('.editcontent-button--disabled').on('click', function(event) {
    event.preventDefault();
  });


  // settings
  $('.editcontent-button-togglesettings').on('click', function() {
    $('.settings').toggleClass('settings--visible');
    $(this).toggleClass('editcontent-button--active');
    $('.layer').removeClass('layer--visible');
    $('.editcontent-button-removep').addClass('editcontent-button--disabled');
  });


  // show intro
  $('.editcontent-button-intro').on('click', function() {
    $('.intro').addClass('intro--visible');
    $('body').addClass('body--noscroll');
    $('.intro-logo').addClass('intro-logo--animated');
    $('.intro-fadein').addClass('intro-fadein--animated');
    $('.intro-slideshow').addClass('intro-slideshow-fadein--animated');
    $(this).removeClass('editcontent-button-intro--highlight');
    $('.editcontent-button-removep').addClass('editcontent-button--disabled');
  });

  // auto-create content form
  function contentform() {

    $('.form-content-h1').val('');
    var text = $('.text h1').html();
    $('.form-content-h1').val(text);

    $('.form-content-p').val('');

    $('.text p').each(function() {

      // correct data-numbers
      var index = $(this).index();
      $(this).attr('data-number', index);

      // compare numbers and add/remove paragraphs to form
      var number = $(this).attr('data-number');
      var text = $(this).html();

      $('.form-content').find('[name="form-content-p['+number+']"]').val(text);

    });
  }

  $('.text').on('keyup touch input paste', '*[contenteditable="true"]', function() {
    setTimeout(function() {
      contentform();
    }, 400);
  });

  $('.editcontent-button-removep, .editcontent-button-addp').on('click', function() {
    setTimeout(function() {
      contentform();
    }, 400);
  });

  $('.dialog-btn').on('click', function() {
    setTimeout(function() {
      contentform();
    }, 400);
  });

  // change appearance
  var textColorPicker = new iro.ColorPicker("#textcolorpicker", {
    width: 320,
    color: "#000"
  });

  textColorPicker.on(["color:init", "color:change"], function(color){
    $('.form-appearance-textcolor').val(color.hexString);
    $('.text').css('color', color.hexString);
  });

  $('.form-appearance-textcolor').on('change', function() {
    var textcolor = $(this).val();
    $('.text').css('color', textcolor);
    $('.settings-togglecolorpicker-text').css('background', textcolor);
  });

  $('.settings-togglecolorpicker-text').on('click', function() {
    $('#textcolorpicker').toggleClass('form-colorpicker--visible');
    $('.form-colorpicker-close').toggle();
  });

  $('.form-colorpicker-close').on('click', function() {
    $('.form-colorpicker').removeClass('form-colorpicker--visible');
    $(this).hide();

    var textcolor = $('.form-appearance-textcolor').val();
    $('.settings-togglecolorpicker-text').css('background', textcolor);

    var bgcolor = $('.form-appearance-bgcolor').val();
    $('.settings-togglecolorpicker-bg').css('background', bgcolor);
  });

  $('.form-appearance-bgcolor').on('change', function() {
    var bgcolor = $(this).val();
    $('body').css('background', bgcolor);
    $('.settings-togglecolorpicker-bg').css('background', bgcolor);

    // optical fixes
    if((bgcolor == '#000000') || (bgcolor == '#000') || (bgcolor == 'black') || (bgcolor == '#111111') || (bgcolor == '#111') || (bgcolor == '#101010') || (bgcolor == '#010101')) {
      $('.text').addClass('text--blackbg').removeClass('text--redbg').removeClass('text--yellowbg');
      // alert("black");
    }
    else if((bgcolor == '#ff0000') || (bgcolor == 'red')) {
      $('.text').addClass('text--redbg').removeClass('text--blackbg').removeClass('text--yellowbg');
      // alert("red");
    }
    else if((bgcolor == '#ffff00') || (bgcolor == 'yellow')) {
      $('.text').addClass('text--yellowbg').removeClass('text--blackbg').removeClass('text--redbg');
      // alert("yellow");
    }
    else {
      $('.text').removeClass('text--blackbg').removeClass('text--redbg').removeClass('text--redbg');
    };

  });

  var bgColorPicker = new iro.ColorPicker("#bgcolorpicker", {
    width: 320,
    color: "#fff"
  });

  bgColorPicker.on(["color:init", "color:change"], function(color){
    $('.form-appearance-bgcolor').val(color.hexString);
    $('body').css('background', color.hexString);

    // optical fixes
    if((color.hexString == '#000000') || (color.hexString == '#000') || (color.hexString == 'black') || (color.hexString == '#111111') || (color.hexString == '#111') || (color.hexString == '#101010') || (color.hexString == '#010101')) {
      $('.text').addClass('text--blackbg').removeClass('text--redbg').removeClass('text--yellowbg');
      // alert("black");
    }
    else if((color.hexString == '#ff0000') || (color.hexString == 'red')) {
      $('.text').addClass('text--redbg').removeClass('text--blackbg').removeClass('text--yellowbg');
      // alert("red");
    }
    else if((color.hexString == '#ffff00') || (color.hexString == 'yellow')) {
      $('.text').addClass('text--yellowbg').removeClass('text--blackbg').removeClass('text--redbg');
      // alert("yellow");
    }
    else {
      $('.text').removeClass('text--blackbg').removeClass('text--redbg').removeClass('text--redbg');
    };

  });

  $('.settings-togglecolorpicker-bg').on('click', function() {
    $('#bgcolorpicker').toggleClass('form-colorpicker--visible');
    $('.form-colorpicker-close').toggle();
  });

  // change font
  $('.form-appearance-font').on('click', function(e) {
    e.preventDefault();
  });

  $('.form-appearance-font').on('change', function() {
    if($(this).val() == 'sans') {
      $('.text').css('font-family', 'sans-serif');
      $('.googlefont').attr('href', '#');
      $('.form-appearance-italic').removeAttr('disabled').parent().removeClass('form--disabled');
      $('.form-appearance-bold').removeAttr('disabled').parent().removeClass('form--disabled');
    }

    else if($(this).val() == 'serif') {
      $('.text').css('font-family', 'serif');
      $('.googlefont').attr('href', '#');
      $('.form-appearance-italic').removeAttr('disabled').parent().removeClass('form--disabled');
      $('.form-appearance-bold').removeAttr('disabled').parent().removeClass('form--disabled');
    }

    else if($(this).val() == 'monospace') {
      $('.text').css('font-family', 'monospace');
      $('.googlefont').attr('href', '#');
      $('.form-appearance-italic').removeAttr('disabled').parent().removeClass('form--disabled');
      $('.form-appearance-bold').removeAttr('disabled').parent().removeClass('form--disabled');
    }

    else if($(this).val() == 'system-ui') {
      $('.text').css('font-family', 'system-ui');
      $('.googlefont').attr('href', '#');
      $('.form-appearance-italic').removeAttr('disabled').parent().removeClass('form--disabled');
      $('.form-appearance-bold').removeAttr('disabled').parent().removeClass('form--disabled');
    }

    else if($(this).val() == 'worksans') {
      $('.text').css('font-family', '"Work Sans", sans-serif');
      $('.googlefont').attr('href', 'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');
      $('.form-appearance-italic').removeAttr('disabled').parent().removeClass('form--disabled');
      $('.form-appearance-bold').removeAttr('disabled').parent().removeClass('form--disabled');
    }

    else if($(this).val() == 'plexsans') {
      $('.text').css('font-family', '"IBM Plex Sans", sans-serif');
      $('.googlefont').attr('href', 'https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,400i,700,700i');
      $('.form-appearance-italic').removeAttr('disabled').parent().removeClass('form--disabled');
      $('.form-appearance-bold').removeAttr('disabled').parent().removeClass('form--disabled');
    }

    else if($(this).val() == 'plexmono') {
      $('.text').css('font-family', '"IBM Plex Mono", sans-serif');
      $('.googlefont').attr('href', 'https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,400i,700,700i');
      $('.form-appearance-italic').removeAttr('disabled').parent().removeClass('form--disabled');
      $('.form-appearance-bold').removeAttr('disabled').parent().removeClass('form--disabled');
    }

    else if($(this).val() == 'plexserif') {
      $('.text').css('font-family', '"IBM Plex Serif", serif');
      $('.googlefont').attr('href', 'https://fonts.googleapis.com/css?family=IBM+Plex+Serif:400,400i,700,700i');
      $('.form-appearance-italic').removeAttr('disabled').parent().removeClass('form--disabled');
      $('.form-appearance-bold').removeAttr('disabled').parent().removeClass('form--disabled');
    }

    else if($(this).val() == 'plexsanscondensed') {
      $('.text').css('font-family', '"IBM Plex Sans Condensed", sans-serif');
      $('.googlefont').attr('href', 'https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:400,400i,700,700i');
      $('.form-appearance-italic').removeAttr('disabled').parent().removeClass('form--disabled');
      $('.form-appearance-bold').removeAttr('disabled').parent().removeClass('form--disabled');
    }

    else if($(this).val() == 'montserrat') {
      $('.text').css('font-family', '"Montserrat", sans-serif');
      $('.googlefont').attr('href', 'https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i')
      $('.form-appearance-italic').removeAttr('disabled').parent().removeClass('form--disabled');
      $('.form-appearance-bold').removeAttr('disabled').parent().removeClass('form--disabled');
    }

    else if($(this).val() == 'spacemono') {
      $('.text').css('font-family', '"Space Mono", monospace');
      $('.googlefont').attr('href', 'https://fonts.googleapis.com/css?family=Space+Mono:400,400i,700,700i');
      $('.form-appearance-italic').removeAttr('disabled').parent().removeClass('form--disabled');
      $('.form-appearance-bold').removeAttr('disabled').parent().removeClass('form--disabled');
    }

    else if($(this).val() == 'ebgaramond') {
      $('.text').css('font-family', '"EB Garamond", serif');
      $('.googlefont').attr('href', 'https://fonts.googleapis.com/css?family=EB+Garamond:400,400i,700,700i');
      $('.form-appearance-italic').removeAttr('disabled').parent().removeClass('form--disabled');
      $('.form-appearance-bold').removeAttr('disabled').parent().removeClass('form--disabled');
    }

    else if($(this).val() == 'playfairdisplay') {
      $('.text').css('font-family', '"Playfair Display", serif');
      $('.googlefont').attr('href', 'https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i&display=swap');
      $('.form-appearance-italic').removeAttr('disabled').parent().removeClass('form--disabled');
      $('.form-appearance-bold').removeAttr('disabled').parent().removeClass('form--disabled');
    }

    else if($(this).val() == 'poppins') {
      $('.text').css('font-family', '"Poppins", sans-serif');
      $('.googlefont').attr('href', 'https://fonts.googleapis.com/css?family=Poppins:400,400i,700,700i&display=swap');
      $('.form-appearance-italic').removeAttr('disabled').parent().removeClass('form--disabled');
      $('.form-appearance-bold').removeAttr('disabled').parent().removeClass('form--disabled');
    }

    else if($(this).val() == 'domine') {
      $('.text').css('font-family', '"Domine", serif');
      $('.googlefont').attr('href', 'https://fonts.googleapis.com/css?family=Domine:400,700&display=swap');
      $('.form-appearance-italic').prop('checked',false).attr('disabled', 'true').parent().addClass('form--disabled');
      $('.form-appearance-bold').removeAttr('disabled').parent().removeClass('form--disabled');
    }

    else if($(this).val() == 'livvic') {
      $('.text').css('font-family', '"Livvic", serif');
      $('.googlefont').attr('href', 'https://fonts.googleapis.com/css?family=Livvic:400,400i,700,700i&display=swap');
      $('.form-appearance-italic').removeAttr('disabled').parent().removeClass('form--disabled');
      $('.form-appearance-bold').removeAttr('disabled').parent().removeClass('form--disabled');
    }

    else if($(this).val() == 'vidaloka') {
      $('.text').css('font-family', '"Vidaloka", serif');
      $('.googlefont').attr('href', 'https://fonts.googleapis.com/css?family=Vidaloka&display=swap');
      $('.form-appearance-italic').prop('checked',false).attr('disabled', 'true').parent().addClass('form--disabled');
      $('.form-appearance-bold').prop('checked',false).attr('disabled', 'true').parent().addClass('form--disabled');
    }

    else if($(this).val() == 'karla') {
      $('.text').css('font-family', '"Karla", serif');
      $('.googlefont').attr('href', 'https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;0,700;1,400;1,700&display=swap');
      $('.form-appearance-italic').removeAttr('disabled').parent().removeClass('form--disabled');
      $('.form-appearance-bold').removeAttr('disabled').parent().removeClass('form--disabled');
    }

    else if($(this).val() == 'arimo') {
      $('.text').css('font-family', '"Arimo", sans-serif');
      $('.googlefont').attr('href', 'https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400;0,700;1,400;1,700&display=swap');
      $('.form-appearance-italic').removeAttr('disabled').parent().removeClass('form--disabled');
      $('.form-appearance-bold').removeAttr('disabled').parent().removeClass('form--disabled');
    }

    else if($(this).val() == 'chivo') {
      $('.text').css('font-family', '"Chivo", sans-serif');
      $('.googlefont').attr('href', 'https://fonts.googleapis.com/css2?family=Chivo:ital,wght@0,400;0,700;1,400;1,700&display=swap');
      $('.form-appearance-italic').removeAttr('disabled').parent().removeClass('form--disabled');
      $('.form-appearance-bold').removeAttr('disabled').parent().removeClass('form--disabled');
    }

    else if($(this).val() == 'ovo') {
      $('.text').css('font-family', '"Ovo", serif');
      $('.googlefont').attr('href', 'https://fonts.googleapis.com/css2?family=Ovo&display=swap');
      $('.form-appearance-italic').prop('checked',false).attr('disabled', 'true').parent().addClass('form--disabled');
      $('.form-appearance-bold').prop('checked',false).attr('disabled', 'true').parent().addClass('form--disabled');
    }

    if($('.form-appearance-italic').prop('checked')) {
      $('.text').css('font-style', 'italic');
    }
    else {
      $('.text').css('font-style', 'normal');
    }
    if($('.form-appearance-bold').prop('checked')) {
      $('.text').css('font-weight', 'bold');
      $('.text').css('font-variation-settings', '"wght" 700');
    }
    else {
      $('.text').css('font-weight', 'normal');
      $('.text').css('font-variation-settings', '"wght" 400');
    }
  });

  // bold/regular
  $('.form-appearance-bold').on('change', function() {
    if($(this).prop('checked')) {
      $('.text').css('font-weight', 'bold');
      $('.text').css('font-variation-settings', '"wght" 700');
    }
    else {
      $('.text').css('font-weight', 'normal');
      $('.text').css('font-variation-settings', '"wght" 400');
    }
  });

  // italic
  $('.form-appearance-italic').on('change', function() {
    if($(this).prop('checked')) {
      $('.text').css('font-style', 'italic');
    }
    else {
      $('.text').css('font-style', 'normal');
    }
  });

  // font size
  $('.form-appearance-fontsize').on('change', function() {
    var fontsize = $('.form-appearance-fontsize').val();
    $('.text').css({
      'font-size' :  + fontsize + 'vw',
      'line-height' : fontsize + 'vw'
    });

    $('.text h1, .text p').css({
      'padding-top' : fontsize*40/100 + 'vw',
      'padding-bottom' : fontsize*60/100 + 'vw'
    });

    $('.watermark').css('font-size', fontsize/2 + 'vw');
  });

  // save settings
  $('.form').sisyphus({timeout: 1});

  // restore settings
  $('.form-appearance-title, .form-appearance-textcolor, .form-appearance-bgcolor, .form-appearance-font, .form-appearance-italic, .form-appearance-bold, .form-appearance-fontsize').trigger('change');

  // restore content
  var restconth1 = $('.form-content-h1').val();
  $('.text h1').html(restconth1);

  $('.text p').remove();
  $('.watermark').remove();

  var number = 0;
  var delay = 1;
  $('.form-content-p').each(function() {

    if (!$(this).val()) {
    }

    else if ($(this).val() == 'built with ♥') {
    }

    else {
      number++;
      delay++;
      var text = $(this).val();
      $('.text').append('<p class="text-p" contenteditable="true" data-number="'+number+'" style="animation-delay: '+delay/10+'s">'+text+'</p>');
    }

  });

    // append watermark in editor
    function appendWatermark() {
      $('.watermark').remove();
      var fontsize = $('.form-appearance-fontsize').val();
      $('.text').append('<p class="watermark" style="font-size: '+fontsize/2+'vw; line-height: '+fontsize/2+'vw;">built with ♥</p>');
    }

    appendWatermark();

    $('.editcontent-button-addp').on('click', function() {
      appendWatermark();
    });

});