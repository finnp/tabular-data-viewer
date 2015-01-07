var on = require('add-event-listener')
var drop = require('drag-and-drop-files')
var filereader = require('filereader-stream')
var htmltable = require('htmltable')
var detect = require('detect-data-stream')
var got = require('got')
var pump = require('pumpify')

var $ = document.querySelector.bind(document)

var $body = $('body')
var $menu = $('#menu')
var $hidden = $('#hidden-file')
var $file = $('#file')
var $url = $('#url')
var $table = $('#table')
var $error = $('#error')

var onfile = function(file) {
  showTable(filereader(file))
}

var showTable = function (stream) {
  $error.innerText = ''
  $menu.className = 'collapse'

  pump(stream, detect(), htmltable($table))
    .on('error', function (err) {
      $menu.className = ''
      $table.innerText = ''
      $error.innerText = err.message
    })
}

drop($body, function(files) {
  onfile(files[0])
})

on($hidden, 'change', function() {
  onfile($hidden.files[0])
})

on($url, 'keydown', function(e) {
  if (e.keyCode === 13) {
    showTable(got($url.value.trim()))
  }
})

on($file, 'click', function() {
  $hidden.click()
})
