/*
dependencies:
- timbre.js
*/



/*
	Audio engine
*/
function Engine() {
	var t = this;

	//IVs for bars
	t.barList = [];
	t.barList.push(new Bar());
	t.currentBar = barList[0];

	//IVs for synthesis
	t.osc = T("tri");
	t.env = T("adsr", {a:1, d:200, s:0.25, r:500});
	t.oe = T("OscGen", {osc:t.osc, env:t.env, mul:1}).play();

	//IVs for timing
	t.bpm = 120; 
	t.timer = T("interval", {interval:t.bpm}, function() {

	});

	//Plays a chord given as array of MIDI pitches (only one articulation so far)
	t.playChord = function(noteList) {
		var velocity = 25;
		for (var i=0; i<noteList.length; i++) {
			var note = noteList[i];
			t.oe.noteOn(note, velocity);
			//get the ind noteOff to work
			/*setTimeout(function(note) {
				t.oe.noteOff(note);
			}, 500);*/
		}
		setTimeout(function() {
			t.oe.allNoteOff();
		}, 1000); //1000ms
	}
}


//Denominator to milliseconds converter (e.g. denominator of 8 at 100 bpm is an interval of 300ms)
function denToMs(den, bpm) {
	var q_ms = (60/bpm)*1000;
	return q_ms*(4/den);
}