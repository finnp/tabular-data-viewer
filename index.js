var on = require('add-event-listener')
var drop = require('drag-and-drop-files')
var filereader = require('filereader-stream')
var htmltable = require('htmltable')
var detect = require('detect-data-stream')

var $ = document.querySelector.bind(document)

var $body = $('body')
var $menu = $('#menu')
var $hidden = $('#hidden-file')
var $file = $('#file')
var $url = $('#url')
var $table = $('#table')

var onfile = function(file) {
  $menu.style.display = 'none'

  filereader(file)
    .pipe(detect())
    .pipe(htmltable($table))

}

drop($body, function(files) {
  onfile(files[0])
})

on($hidden, 'change', function() {
  onfile($hidden.files[0])
})

on($file, 'click', function() {
  $hidden.click()
})

if (location.hash.split('#').pop()) play(location.hash.split('#').pop())