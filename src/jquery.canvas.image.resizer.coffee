(($)->
  $.fn.canvasResizer = (options)->
    
    # Default Settings
    _defaultOptions =
      width: 640
      height: 480
      success: (image)->
        image
  
    _options = $.extend _defaultOptions, options
    
    # File Change Listener
    onChange = (e)->
      files = @files
      if files.length
        @image = new Image
        @image.onload = =>
          makeCanvas.call @
        @image.src = URL.createObjectURL(files[0])
    
    # Canvas Creator
    makeCanvas = ->
      canvas = document.createElement('canvas')
      h = @image.height
      w = @image.width
      if w > _options.width or h > _options.height
        byWidth = w / _options.width
        byHeight = h / _options.height
        byWidthPercentage = h / byWidth
        byHeightPercentage = w / byHeight
        
        if byWidthPercentage <= _options.height and byHeightPercentage <= _options.width
          ratio = if byHeight >= byWidth then byWidth else byHeight
        else if byWidthPercentage <= _options.height
          ratio = byWidth
        else
          ratio = byHeight
        targetWidth = Math.floor w / ratio
        targetHeight = Math.floor h / ratio
      else
        targetWidth = w
        targetHeight = h
      
      canvas.setAttribute('width', targetWidth)
      canvas.setAttribute('height', targetHeight)
      ctx = canvas.getContext('2d')
      ctx.drawImage @image, 0, 0, targetWidth, targetHeight
      @image.onload = =>
        _options.success.call @, @image
      @image.src = canvas.toDataURL()
      
    @each ->
      return false if @nodeName isnt "INPUT" or @attributes.getNamedItem('type').value.toLowerCase() isnt 'file'
      $(@).on 'change', onChange
)(jQuery)