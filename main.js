var eng = new Engine();
var bars = [];
//b.playBeat(x);
//x.playChord([68,70,72,74,76,78]);

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

for (var i=0; i<bluesChords.length; i++) {
	var b = new Bar();
	b.chord = bluesChords[i];
	//console.log(bluesChords[i]);
	bars.push(b);
}

eng.barList = bars;



$("#playButton").click(function(){submit();});
//control from index.html
function submit() {
	var bpm = $("#bpm").val();
	console.log("sub");
}
