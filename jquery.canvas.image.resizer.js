// Generated by CoffeeScript 1.6.3
(function() {
  (function($) {
    return $.fn.canvasResizer = function(options) {
      var makeCanvas, onChange, _defaultOptions, _options;
      _defaultOptions = {
        width: 640,
        height: 480,
        success: function(image) {
          return image;
        }
      };
      _options = $.extend(_defaultOptions, options);
      onChange = function(e) {
        var file, files, _i, _len, _results;
        files = this.files;
        if (files.length) {
          _results = [];
          for (_i = 0, _len = files.length; _i < _len; _i++) {
            file = files[_i];
            _results.push((function() {
              var image;
              image = new Image;
              image.onload = function() {
                return makeCanvas.call(image);
              };
              return image.src = URL.createObjectURL(file);
            })());
          }
          return _results;
        }
      };
      makeCanvas = function() {
        var byHeight, byHeightPercentage, byWidth, byWidthPercentage, canvas, ctx, h, ratio, targetHeight, targetWidth, w,
          _this = this;
        canvas = document.createElement('canvas');
        h = this.height;
        w = this.width;
        if (w > _options.width || h > _options.height) {
          byWidth = w / _options.width;
          byHeight = h / _options.height;
          byWidthPercentage = h / byWidth;
          byHeightPercentage = w / byHeight;
          if (byWidthPercentage <= _options.height && byHeightPercentage <= _options.width) {
            ratio = byHeight >= byWidth ? byWidth : byHeight;
          } else if (byWidthPercentage <= _options.height) {
            ratio = byWidth;
          } else {
            ratio = byHeight;
          }
          targetWidth = Math.floor(w / ratio);
          targetHeight = Math.floor(h / ratio);
        } else {
          targetWidth = w;
          targetHeight = h;
        }
        canvas.setAttribute('width', targetWidth);
        canvas.setAttribute('height', targetHeight);
        ctx = canvas.getContext('2d');
        ctx.drawImage(this, 0, 0, targetWidth, targetHeight);
        this.onload = function() {
          return _options.success.call(_this, _this);
        };
        return this.src = canvas.toDataURL();
      };
      return this.each(function() {
        if (this.nodeName !== "INPUT" || this.attributes.getNamedItem('type').value.toLowerCase() !== 'file') {
          return false;
        }
        return $(this).on('change', onChange);
      });
    };
  })(jQuery);

}).call(this);
