var ajax = new XMLHttpRequest()
ajax.open('GET', './assets/images/sprite.svg', true)
ajax.send()
ajax.onload = function (e) {
  var div = document.createElement('div')
  div.innerHTML = ajax.responseText
  div.style.display = 'none'
  document.body.insertBefore(div, document.body.childNodes[0])
}
