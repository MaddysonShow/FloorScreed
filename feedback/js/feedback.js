function inArray(needle, haystack) {
  var length = haystack.length;
  for (var i = 0; i < length; i++) {
      if (typeof haystack[i] == 'object') {
          if (arrayCompare(haystack[i], needle)) return true;
      } else {
          if (haystack[i] == needle) return true;
      }
  }
  return false;
}
window.isset = function(v) {
  if (typeof(v) == 'object' && v == 'undefined') {
      return false;
  } else if (arguments.length === 0) {
      return false;
  } else {
      var buff = arguments[0];
      for (var i = 0; i < arguments.length; i++) {
          if (typeof(buff) === 'undefined' || buff === null) return false;
          buff = buff[arguments[i + 1]];
      }
  }
  return true;
}

function myconf() {
  var cf = $.Deferred();
  $.ajax({
      type: 'POST',
      url: 'feedback/',
      dataType: 'json',
      data: 'act=cfg',
      success: function(answer) {
          cf.resolve(answer.configs);
      }
  });
  return cf;
}

var mcf = myconf();

mcf.done(function(conf) {
  $(document).ready(function() {
      (function() {
          var fb = $('.feedback');
          if (fb.length > 0) {
              fb.each(function() {
                  var form = $(this).closest('form'),
                      name = form.attr('name');
                  //console.log(form);
                  if (isset(conf[name]) && isset(conf[name].cfg.antispamjs)) {
                      $(form).prepend('<input type="text" name="' + conf[name].cfg.antispamjs + '" value="tesby" style="display:none;">');
                  }
              });
          }
      })();

      $("form .feedback").click(function() {
          var form = $(this).closest('form'),
              name = form.attr('name'),
              obj = {};
          obj.form = form;
          obj.act = name;
          obj.data = $(form).serialize();

          feedback(obj);

          return false;
      });
  });

  function feedback(vars) {
      var bt = $(vars.form).find('.feedback');
      var btc = bt.clone();
      var bvc = bt.val();
      var cfg = conf[vars.act].cfg;

      $.ajax({
          type: 'POST',
          url: 'feedback/',
          cache: false,
          dataType: 'json',
          data: 'act=' + vars.act + '&' + vars.data,
          beforeSend: function() {
              $(bt).prop("disabled", true);
              $(bt).addClass('loading');
          },
          success: function(answer) {
              // console.log(cfg);
              if (isset(cfg.notify) && !/none/i.test(cfg.notify)) {

                  if (/textbox/i.test(cfg.notify)) {
                      if (isset(answer.errors)) {
                          $.each(answer.errors, function(k, val) {
                            UIkit.notification('<h4 class="uk-margin-small-bottom">Ошибка!</h4>' + val, { status: 'danger', pos: 'top-right', timeout: 6000});
                          });
                      }

                  }
                  if (/color/i.test(cfg.notify)) {
                      $(vars.form).find('input[type=text]:visible, textarea:visible, select:visible').css({'border': '1px solid #e3593b'}, 300);
                      if (isset(answer.errors)) {
                          $.each(answer.errors, function(k, val) {
                              var reg = /[a-z]/i;
                              if (reg.test(k)) {
                                  var e = $(vars.form).find('[name=' + k + ']');
                                  if (e.length == 1) {
                                      $(e).css({
                                          'border': '1px solid #FF532E'
                                      }, 100);
                                  }
                              }
                          });
                      }
                      if (isset(answer.infos)) {
                        UIkit.notification.closeAll();
                        $.each(answer.infos, function(k, val) {
                          UIkit.notification('<h4 class="uk-margin-small-bottom">Готово!</h4><span>Форма успешно отправлена</span>', { status: 'success', pos: 'top-right', timeout: 5000});
                        });

                        if ($('.uk-modal.uk-open').length)
                            UIkit.modal('.uk-modal.uk-open').hide();
                            UIkit.modal('#modal-success').show();

                        setInterval(function(){
                            UIkit.modal('#modal-success').hide();
                        }, 8000);
                      }

                  }
              }
              $(bt).prop("disabled", false);
              $(bt).removeClass('loading');
              //$(bt).val(bvc);

              if (isset(answer.ok) && answer.ok == 1) {
                  $(vars.form)[0].reset();
              }
          }
      });

  }

  $(document).on('mouseenter mouseover', '.feedback', function() {
      var form = $(this).closest('form'),
          name = form.attr('name');
      if (isset(conf[name]) && isset(conf[name].cfg.antispamjs)) {
          $('input[name=' + conf[name].cfg.antispamjs + ']').val('');
      }
  });
});