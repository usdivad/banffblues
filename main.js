//$(document).ready(function (){

//Init engine and bar list
var eng = new Engine();
var bars = [];
//b.playBeat(x);
//x.playChord([68,70,72,74,76,78]);
var playingAtm = false; //y/n

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
var TOTAL_BARS = 12; //cheating a little since there are actually twice as many (24) here; offset by the % in highlight()
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

	//play/pause visual and control

	//pause it
	if (playingAtm) {
		playingAtm = false;
		$("#playButton").html("PLAY");	

		//CTRL
		eng.stop();
		eng.currentBarIndex = 0;
		eng.barList[eng.currentBarIndex].currentBeat = 0;
	}
	//play it
	else {
		playingAtm = true;
		$("#playButton").html("STOP");

		//CTRL
		//automated version! delirium gatess
		//prevent parallel arrays?
		var twentyFour = 0;

		//reinstatiate/set
		numInput = [];
		denInput = [];
		bars = [];


		for (var i=0;i<TOTAL_BARS; i++) {
			//get input numerator/denominator
			var numQuery = "#b" + i + "n";
			var denQuery = "#b" + i + "d";
			numInput.push($(numQuery).val());
			denInput.push($(denQuery).val());
			console.log(numQuery+", "+denQuery);

			//use input with predet bluesChords to create bars
			//only iterates for two chords, hence i+1
			//j determines chord, i determines rhythm (byproduct of the bar glue cheating)
			for (var j=2*i; j<=(2*i)+1; j++) { //proper incrementation; j starts on 2i
				var b = new Bar();
				b.chord = bluesChords[j];

				/*** trouble is here ***/
				b.num = parseInt(numInput[i]);
				b.den = parseInt(denInput[i]);

				//console.log(bluesChords[i]);
				bars.push(b);
				twentyFour++;
				//console.log(j);
			}
		}
		console.log(twentyFour);
		eng.barList = bars;
		eng.bpm = parseInt($("#bpm").val());
		eng.start();

	}

	console.log("sub");
}

//Control for timer (for the bar highlighting via)
eng.timer.on("bang", function(e){
	console.log("bb");
});
eng.timer.on("bang", function(){
	console.log("bb");
});


//Highlights the current bar (as given by barIndex)
function highlight(barIndex) {
	var trueIndex = barIndex%TOTAL_BARS;
	var divBar = "#bar"+trueIndex;
	$(divBar).css("background-color", "rgb(218,0,0)");
}



//}); //end document ready


//READY SET GO!
/*$(document).ready(function() {
	//submit();
	//eng.start();
});
*/



