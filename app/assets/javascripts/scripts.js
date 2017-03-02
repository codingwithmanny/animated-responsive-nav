/**
 * [toggleClass description]
 * @param  {[type]} el        [description]
 * @param  {[type]} className [description]
 * @return {[type]}           [description]
 */
function toggleClass(el, className) {
  if (el.classList) {
    el.classList.toggle(className);
  } else {
    var classes = el.className.split(' ');
    var existingIndex = classes.indexOf(className);

    if (existingIndex >= 0)
      classes.splice(existingIndex, 1);
    else
      classes.push(className);

    el.className = classes.join(' ');
  }
}

/**
 * When the document window is loaded
 * @return void
 */
window.onload = function()
{
  /* Mobile button
  ------------------------------ */
  var mobileMenuButton = document.getElementById('expand');
  var mobileMenu = document.getElementById('nav').children[0];

  mobileMenuButton.onclick = function(e)
  {
    e.preventDefault();
    toggleClass(mobileMenuButton, 'open');
    toggleClass(mobileMenu, 'open');
  };
}

/**
 * when the document window is being resized
 * @return void
 */
window.onresize = function()
{
  //insert code
}
