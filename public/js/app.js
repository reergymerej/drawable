define(['jquery'], function ($) {
  'use strict';

  var $canvas = $('canvas');
  var canvas = $canvas.get(0);
  var context = canvas.getContext('2d');

  // palette
  (function () {
    var colors = ['black','grey','white','red','orange','yellow','green','blue','purple',];
    var palette = $('.palette');
    colors.forEach(function (color) {
      var li = $('<li/>');
      li.data('color', color);
      li.css('backgroundColor', color);
      palette.append(li);
    });

    palette.delegate('li', 'click', function () {
      var color = $(this).data('color');
      context.strokeStyle = color;
    });
  })();

  var images = [];

  var save = function () {
    var dataUrl = canvas.toDataURL();
    images.push(dataUrl);
  };

  var clear = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  $('#undo').on('click', function () {
    var dataUrl = images.pop();
    dataUrl = images.pop();
    if (dataUrl) {
      var image = new Image();
      image.src = dataUrl;
      image.onload = function () {
        clear();
        context.drawImage(image, 0, 0);
      };
    } else {
      clear();
    }
  });

  // pen style
  context.lineCap = 'round';
  // context.lineJoin = 'round';
  // context.lineJoin = 'bevel';
  context.lineWidth = 5;

  $canvas.on('mousedown', function (e) {
    // start drawing
    context.beginPath();
    context.moveTo(e.offsetX, e.offsetY);

    $canvas.on('mousemove', function (e) {
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
    });
  }).on('mouseup', function () {
    $canvas.off('mousemove');
    save();
  });

  return {};
});
