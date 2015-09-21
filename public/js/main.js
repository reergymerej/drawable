(function () {
  requirejs.config({
    baseUrl: 'js',
    paths: {
      jquery: 'lib/jquery/dist/jquery.min'
    }
  });

  requirejs(['app'], function () {});
}());
