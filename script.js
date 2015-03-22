/*
This file is part of WebkKit-Speech-Recogntion.
    WebkKit-Speech-Recogntion is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    WebkKit-Speech-Recogntion is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with WebkKit-Speech-Recogntion.  If not, see <http://www.gnu.org/licenses/>.
*/

var first_char = /\S/;
function capitalize(s) {
	return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
	return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}


var final_transcript = ''; 
var language = "th-TH"; //Define your language here


$(document).ready(function(){
	var txtInterim = $("#txtInterim");
	var txtFinal = $("#txtFinal");
	var recognition = new webkitSpeechRecognition();
	
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.lang = language;
	recognition.onresult = function(event) {
		var interim_transcript = '';
		if (typeof(event.results) == 'undefined') {
			recognition.onend = null;
			recognition.stop();
			return;
		}
		for (var i = event.resultIndex; i < event.results.length; ++i) {
			if (event.results[i].isFinal) {
				final_transcript += event.results[i][0].transcript;
			} else {
				interim_transcript += event.results[i][0].transcript;
			}
		}
		txtInterim.val(interim_transcript);
		txtFinal.val(final_transcript);
		if (final_transcript || interim_transcript) {
			//for stop this!
		}
	};

	$('#btnListen').click(function(){
		recognition.start();
	});

	$('#btnStop').click(function(){
		recognition.stop();
	});
});