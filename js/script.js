"use strict";

let example = '   12345678912345678943234242432423423423423423423             ';
console.log( example.length );
// example = Number(example);
console.log( example );


let oneArgument = function( example, callback ){
	if ( typeof example === 'string' ){
		callback( example );
	} else {
		alert('Вами была переданна не строка')	
	}
};

oneArgument( example, function( example ){
	console.log( example.trim().substr(0, 30) + '...' );
});