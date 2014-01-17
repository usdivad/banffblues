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
var TOTAL_BARS = 12; //cheating a little since there are actually twice as many (24) here; offset by trueIndex in highlight()

//divs
var numDivs = [];
var denDivs = [];

//actual values
var numInput = [];
var denInput = [];

//automate this....!
/*var numInput = [];
numInput.push(
	$("#b1n").val(),
	);
*/

//Control for playButton (static for now)
$("#playButton").click(k);

//Submit function
function submit() {
	console.log("submit()");

	//play/pause visual and control

	//pause it
	if (playingAtm) {
		console.log("playingAtm");
		playingAtm = false;
		$("#playButton").html("PLAY");	

		//CTRL
		eng.stop();
		eng.currentBarIndex = 0;
		eng.barList[eng.currentBarIndex].currentBeat = 0;

		//unlocking divs (recycled from the play code)
		for (var i=0;i<TOTAL_BARS; i++) {
			//get input numerator/denominator
			var numQuery = "#b" + i + "n";
			var denQuery = "#b" + i + "d";
			$(numQuery).prop("readonly", false);
			$(denQuery).prop("readonly", false);
		}
		$("#bpm").prop("readonly", false);
	}
	//play it
	else {
		console.log("yo lay");
		playingAtm = true;
		$("#playButton").html("STOP");

		//touch event trigger
		//eng.oe = T("OscGen", {osc:eng.osc, env:eng.env, mul:1}).play();
		//eng.met = T("fnoise", {freq:512, mul:0}).play();

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

			//viz
			$(numQuery).prop("readonly", true);
			$(denQuery).prop("readonly", true);
		} //end forloop

		console.log(twentyFour);
		eng.barList = bars;
		eng.bpm = parseInt($("#bpm").val());
		eng.start();
		$("#bpm").prop("readonly", true);

	}

	console.log("sub");
}

function k() {
	var formants = {
        a:[700, 1200, 2900],
        i:[300, 2700, 2700],
        u:[390, 1200, 2500],
        e:[450, 1750, 2750],
        o:[460,  880, 2800]
      }, freq, synth, f1, f2, f3;

      freq = 174.61412048339844;
      freq = T("+.kr", freq, T("sin.kr", {freq:3, mul:0.8}));

      synth = T("saw", {freq:freq});

      f1 = T("bpf", {freq:T("param", {value: 700}), Q:9}, synth);
      f2 = T("bpf", {freq:T("param", {value:1200}), Q:9}, synth);
      f3 = T("bpf", {freq:T("param", {value:2900}), Q:9}, synth);
      synth = T("+", f1, f2, f3);
      synth = T("bpf", {freq:3200, Q:0.5}, synth);

      T("interval", {interval:250}, function() {
        var f = formants["aiueo"[(Math.random()*5)|0]];
        f1.freq.linTo(f[0], 150);
        f2.freq.linTo(f[1], 150);
        f3.freq.linTo(f[2], 150);
      }).set({buddies:synth}).start();

      console.log("asdf");
}

//Control for timer (for the bar highlighting via)
//not working
eng.timer.on("bang", function(e){
	console.log("bb");
});
eng.timer.on("bang", function(){
	console.log("bb");
});


//VIZ FUNCTIONS

//Highlights the current bar (as given by barIndex)
function highlight(barIndex, setting) {
	//var trueIndex = barIndex%TOTAL_BARS;
	var trueIndex = Math.floor(barIndex/2);
	//console.log("bar = " + barIndex+ "TRUTH = " + trueIndex);
	var divBar = "#bar"+trueIndex;
	if (setting==="on") {
		$(divBar).css("background-color", "rgb(218,0,0)");
	}
	else if (setting==="off") {
		$(divBar).css("background-color", "rgb(250,250,250)");
	}
	//console.log(divBar);
}

//Beeps the metronome
function beep(setting) {

	//downbeat setting not working?
	if (setting === "downbeat") {
		$("#metro").css("background-color", "#0EE000");
		$("#metro").css("opacity", "1");
		//console.log("downbeat");
	}
	else {
		if (setting === "upbeat") {
			$("#metro").css("opacity", "1");
		}
		if (setting === "off") {
			$("#metro").css("opacity", "0");
		}
		$("#metro").css("background-color", "#00BEDD");
	}	
}





//unmuting for ios
/*window.addEventListener('touchstart', function() {

	// create empty buffer
	var buffer = myContext.createBuffer(1, 1, 22050);
	var source = myContext.createBufferSource();
	source.buffer = buffer;

	// connect to output (your speakers)
	source.connect(myContext.destination);

	// play the file
	source.noteOn(0);

}, false);
*/

//}); //end document ready


//READY SET GO!
/*$(document).ready(function() {
	//submit();
	//eng.start();
});
*/



