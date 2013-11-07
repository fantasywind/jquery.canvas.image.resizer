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
      var files,
        _this = this;
      files = this.files;
      if (files.length) {
        this.image = new Image;
        this.image.onload = function() {
          return makeCanvas.call(_this);
        };
        return this.image.src = URL.createObjectURL(files[0]);
      }
    };
    makeCanvas = function() {
      var byHeight, byHeightPercentage, byWidth, byWidthPercentage, canvas, ctx, h, ratio, targetHeight, targetWidth, w,
        _this = this;
      canvas = document.createElement('canvas');
      h = this.image.height;
      w = this.image.width;
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
      ctx.drawImage(this.image, 0, 0, targetWidth, targetHeight);
      this.image.onload = function() {
        return _options.success.call(_this, _this.image);
      };
      return this.image.src = canvas.toDataURL();
    };
    return this.each(function() {
      if (this.nodeName !== "INPUT" || this.attributes.getNamedItem('type').value.toLowerCase() !== 'file') {
        return false;
      }
      return $(this).on('change', onChange);
    });
  };
})(jQuery);