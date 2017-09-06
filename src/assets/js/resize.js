/*resize.js*/ 
! function(a) {
 function b() {
   var b = g.getBoundingClientRect().width;
   a.rem = (b / 7.5 > 100 ? 100 : (b / 7.5 < 40 ? 40 : b / 7.5)), 
   g.style.fontSize = a.rem + "px"
     var realitySize = parseInt(window.getComputedStyle(g).fontSize)
     if (a.rem != realitySize) {
         a.rem = a.rem * a.rem / realitySize
         g.style.fontSize = a.rem + 'px'
     }
 }
 var g = a.document.documentElement,
   e;
 a.addEventListener("resize", function() {
   clearTimeout(e), e = setTimeout(b, 300)
 }, !1), 
 a.addEventListener("pageshow", function(a) {
   a.persisted && (clearTimeout(e), e = setTimeout(b, 300))
 }, !1), b()
}(window);

