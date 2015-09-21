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

  var getMouseCoords = function (e) {
    return {
      x: e.offsetX,
      y: e.offsetY,
    };
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
  var width = 10;
  context.lineWidth = width;

  $canvas.on('mousedown', function (e) {
    var lastMoveCoords;
    var coords = getMouseCoords(e);
    // start drawing
    context.beginPath();
    context.moveTo(coords.x, coords.y);

    $canvas.on('mousemove', function (e) {
      var coords = getMouseCoords(e);

      // vary line width based on distance
      if (lastMoveCoords) {
        var distX = coords.x - lastMoveCoords.x;
        var distY = coords.y - lastMoveCoords.y;
        var dist = Math.sqrt(distX * distX + distY * distY);

        context.lineWidth = Math.max(width - dist, 1);
      }

      context.lineTo(coords.x, coords.y);
      context.stroke();
      lastMoveCoords = coords;
    });
  }).on('mouseup', function () {
    $canvas.off('mousemove');
    save();
  });

  return {};
});
