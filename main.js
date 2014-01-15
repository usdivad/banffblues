//Init engine and bar list
var eng = new Engine();
var bars = [];
//b.playBeat(x);
//x.playChord([68,70,72,74,76,78]);

//Blues chords
var bluesChords = [];

bluesChords.push(	[36, 40, 43, 47], //Cmaj7
					[36, 40, 43, 47], //Cmaj7

					[47, 50, 53, 57], //Bm7b5
					[40, 44, 47, 50], //E7

					[45, 48, 52, 55], //Am7
					[38, 42, 45, 48], //D7

					[43, 47, 50, 53], //Gm7
					[36, 40, 43, 46], //C7

					[41, 45, 48, 51], //F7
					[41, 45, 48, 51], //F7

					[41, 44, 48, 51], //Fm7
					[46, 50, 53, 56], //Bb7

					[40, 43, 47, 50], //Em7
					[45, 49, 52, 55], //A7

					[39, 42, 46, 49], //Ebm7
					[44, 48, 51, 54], //Ab7

					[38, 41, 45, 48], //Dm7
					[38, 41, 45, 48], //Dm7

					[43, 47, 50, 53], //G7
					[43, 47, 50, 53], //G7

					[36, 40, 43, 47], //Cmaj7
					[45, 49, 52, 55], //A7

					[38, 41, 45, 48], //Dm7
					[43, 47, 50, 53] //G7
				);

/*
bluesChords.push(	[36, 40, 43, 47], //Cmaj7

					[40, 44, 47, 50], //E7

					[38, 42, 45, 48], //D7

					[36, 40, 43, 46], //C7

					[41, 45, 48, 51], //F7

					[46, 50, 53, 56], //Bb7

					[45, 49, 52, 55], //A7

					[44, 48, 51, 54], //Ab7

					[38, 41, 45, 48], //Dm7

					[43, 47, 50, 53], //G7

					[45, 49, 52, 55], //A7

					[43, 47, 50, 53] //G7
				);
*/


//initial bar creations (old)
/*
for (var i=0; i<bluesChords.length; i++) {
	var b = new Bar();
	b.chord = bluesChords[i];
	//console.log(bluesChords[i]);
	bars.push(b);
}

eng.barList = bars;
*/

//Scraping input from index.html
var TOTAL_BARS = 12; //cheating a little since there are actually twice as many (24) here
var numInput = [];
var denInput = [];

//automate this....!
/*var numInput = [];
numInput.push(
	$("#b1n").val(),
	);
*/

//Control for playButton (static for now)
$("#playButton").click(function(){submit();});

//Submit function
function submit() {
	
	//automated version! delirium gatess
	//prevent parallel arrays?
	for (var i=0;i<=TOTAL_BARS; i++) {
		//get input numerator/denominator
		var numQuery = "#b" + i + "n";
		var denQuery = "#b" + i + "d";
		numInput.push($(numQuery).val());
		denInput.push($(denQuery).val());
		console.log(numQuery+", "+denQuery);

		//use input with predet bluesChords to create bars
		//only iterates for two chords, hence i+1
		for (var j=i; j<i+1; j++) {
			var b = new Bar();
			b.chord = bluesChords[i];

			/*** trouble is here ***/
			b.num = parseInt(numInput[i]);
			b.den = parseInt(denInput[i]);

			//console.log(bluesChords[i]);
			bars.push(b);
		}
	}
	eng.barList = bars;
	eng.bpm = parseInt($("#bpm").val());

	//^^ put above all in submit()

	console.log("sub");
}


//READY SET GO!
$(document).ready(function() {
	submit();
	eng.start();
})

