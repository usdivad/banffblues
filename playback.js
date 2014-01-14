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
		t.barList.push(new Bar());

	t.currentBarIndex = 0;

	//IVs for synthesis
	t.osc = T("pulse");
	t.env = T("adsr", {a:1, d:200, s:0.25, r:500});
	t.oe = T("OscGen", {osc:t.osc, env:t.env, mul:1}).play();
	t.met = T("fnoise", {freq:512, mul:0}).play();

	//IVs for timing
	t.ms = 250; 
	t.timer = T("interval", {interval:t.ms}, function() {

		//playBeat() + det new bars
		//first check whether bar is done
		if (t.barList[t.currentBarIndex].done() && t.currentBarIndex >= 0) {
			//then check whether we have more bars
			if (t.currentBarIndex < t.barList.length-1) {
				t.currentBarIndex++;
				console.log("add to become "+t.currentBarIndex);
				t.playBeat(t.barList[t.currentBarIndex]);
			}
			else {
				//stop entirely
				/*
				t.currentBarIndex = -1;
				t.timer.stop();
				console.log("stop!");
				*/

				//loop (but needs done reset)
				/*
				t.currentBarIndex = 0;
				t.playBeat(t.barList[t.currentBarIndex]);
				console.log("back to the beginning");
				*/
			}
		}
		else {
			//console.log("poop");
			t.playBeat(t.barList[t.currentBarIndex]);
		}


		//CSS work

		console.log("x");
	});

	//Start the timer
	t.start = function() {
		t.timer.start();
	}

	//Stop the timer
	t.stop = function() {
		t.timer.stop();
	}

	//What to do with each beat of the metro
	t.playBeat = function(b) {
		b.isPlaying = true;

		if (b.currentBeat == 0) {
			t.playChord(b.chord);
			//muted because downbeat gets a little loud
			//t.playMetro("downbeat");
		}
		else {
			t.playMetro("upbeat");
		}


		b.currentBeat++;
	}

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

	//Plays metronome beats
	t.playMetro = function(beat) {
		if (beat === "downbeat") {
			t.met.freq = 3000; //in hz
		}
		else if (beat === "upbeat") {
			t.met.freq = 1000; 
		}

		t.met.mul = 0.1;

		setTimeout(function() {
			t.met.mul = 0;
		}, 100); //100ms

	}

}


//Denominator to milliseconds converter (e.g. denominator of 8 at 100 bpm is an interval of 300ms)
function denToMs(den, bpm) {
	var q_ms = (60/bpm)*1000;
	return q_ms*(4/den);
}

//Midi Down Octave for Blossomer (http://usdivad.com/blossomer) output
function mdo(notes) {
	var list = notes.split("q");
	list.pop();
	var newList = list;
	for (var i=0; i<list.length; i++) {
		newList[i] = list[i] - 12;
	}
	return newList;
}