document.querySelectorAll('[data-compare]').forEach(function (box) {
  var range = box.querySelector('.compare__range');
  var update = function () { box.style.setProperty('--pos', range.value + '%'); };
  range.addEventListener('input', update);
  update();
});

var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var videos = document.querySelectorAll('video[data-autoplay]');

videos.forEach(function (video) {
  video.addEventListener('click', function () {
    if (video.paused) { video.play(); } else { video.pause(); }
  });
});

// Clips only play while on screen, and never start on their own for people who ask for less motion.
if (!reduceMotion && 'IntersectionObserver' in window) {
  var watcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.play().catch(function () {}); }
      else { entry.target.pause(); }
    });
  }, { threshold: 0.4 });
  videos.forEach(function (video) { watcher.observe(video); });
}
