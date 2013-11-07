jquery.canvas.image.resizer
===========================

jQuery Plugins for Resize Image with &lt;canvas>

## Options

* width: Maxinum width by pixels
* height: Maxinum height by pixels
* success: function of success, first parameter is resized image object

## Example

```
// Replace <input> with resized image.

<input id='uploader' type='file' accept='images/*' />

<script>
  $("#uploader").canvasResizer({
    width: 800,
    height: 600,
    success: function (image) {
      $(this).replaceWith(image);
    }
  });
</script>
```

## Improvement

* Check for Canvas Support
