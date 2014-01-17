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
	/*t.barList.push(new Bar());
		t.barList.push(new Bar());*/

	t.currentBarIndex = 0;

	//IVs for synthesis
	t.osc = T("konami"); //or pulse an octave up?
	t.env = T("adsr", {a:1, d:200, s:0.25, r:500});
	t.oe = T("OscGen", {osc:t.osc, env:t.env, mul:1}).play();
	t.met = T("fnoise", {freq:512, mul:0}).play();

	//IVs for timing
	t.bpm = 120;
	//t.ms = bpmToMs(t.bpm); 
	t.denMs = denToMs(t.bpm);
	t.timer = T("interval", {interval:t.denMs}, function() {

		//playBeat() + det new bars
		//first check whether bar is done
		if (t.barList[t.currentBarIndex].done() && t.currentBarIndex >= 0) {
			//then check whether we have more bars
			if (t.currentBarIndex < t.barList.length-1) {
				t.currentBarIndex++;
				console.log("add to become "+t.currentBarIndex);
				var b = t.barList[t.currentBarIndex];

				//t.timer.interval.value = denToMs(b.den, t.bpm); //needs to go before
				//console.log(b.den+", "+t.bpm+" ->"+t.timer.interval.value);

				t.playBeat(b);
			}
			else {
				//stop entirely
				/*t.stop();*/

				//loop (but needs done reset)
				
				t.currentBarIndex = 0;
				t.playBeat(t.barList[t.currentBarIndex]);
				console.log("back to the beginning");
				
			}
		}
		else {
			//console.log("poop");
			t.playBeat(t.barList[t.currentBarIndex]);
		}


		//CSS work

		console.log()
		console.log("x");
	});

	//Function for timer
	t.intervalFunction = function() {

		//playBeat() + det new bars
		//first check whether bar is done
		if (t.barList[t.currentBarIndex].done() && t.currentBarIndex >= 0) {
			//then check whether we have more bars
			if (t.currentBarIndex < t.barList.length-1) {
				t.currentBarIndex++;
				console.log("add to become "+t.currentBarIndex);
				var b = t.barList[t.currentBarIndex];

				//t.timer.interval.value = denToMs(b.den, t.bpm); //needs to go before
				//console.log(b.den+", "+t.bpm+" ->"+t.timer.interval.value);

				t.playBeat(b);
			}
			else {
				//stop entirely
				/*t.stop();*/

				//loop (but needs done reset)
				
				t.currentBarIndex = 0;
				t.playBeat(t.barList[t.currentBarIndex]);
				console.log("back to the beginning");
				
			}
		}
		else {
			//console.log("poop");
			t.playBeat(t.barList[t.currentBarIndex]);
		}


		//CSS work

		console.log()
		console.log("x");
	}

	//Start the timer
	t.start = function() {
		t.timer.start();
	}

	//Stop the timer
	t.stop = function() {
		t.timer.stop();
		console.log("stop!");
	}

	//What to do with each beat of the metro
	//b is a bar
	t.playBeat = function(b) {
		b.isPlaying = true;

		//playChord AND update timer interval
		if (b.currentBeat == 0) {
			t.timer.stop();
			t.denMs = denToMs(b.den, t.bpm);
			t.timer.interval.value = t.denMs;
			t.timer.start();
			//t.timer = new T("interval", {interval:t.denMs}, t.intervalFunction);
			console.log(b.den+", "+t.bpm+" ->"+t.timer.interval.value);

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

//BPM to milliseconds converter
function bpmToMs(bpm) {
	return (60/bpm)*1000;
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