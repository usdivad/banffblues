/*
	Audio engine
	- Dependencies: timbre.js
*/
function Engine() {
	var t = this;

	//IVs for bars
	t.barList = [];
	/*t.barList.push(new Bar());
		t.barList.push(new Bar());*/

	t.currentBarIndex = 0;

	//IVs for synthesis
	/*
	t.osc = T("konami"); //or pulse an octave up?
	t.env = T("adsr", {a:1, d:200, s:0.25, r:500});
	t.oe = T("OscGen", {osc:t.osc, env:t.env, mul:1}).play();
	t.met = T("fnoise", {freq:512, mul:0}).play();
	*/
	t.osc, t.env, t.oe, t.met;
	t.chordsSame = false;

	//IVs for timing
	t.bpm = 120;
	//t.ms = bpmToMs(t.bpm); 
	t.denMs = denToMs(16, t.bpm);
	t.intervalNeedsReset = true;
	t.timeoutVal = 100; //100ms
	t.beatCount = 0;

	t.timer = T("interval", {interval:t.denMs}, function() {

		//Creation: synth
		if (typeof t.oe == "undefined") {
			t.osc = T("konami"); //or pulse an octave up?
			t.env = T("adsr", {a:1, d:200, s:0.25, r:500});
			t.oe = T("OscGen", {osc:t.osc, env:t.env, mul:1}).play();
			t.met = T("fnoise", {freq:512, mul:0}).play();
		}

		var b = t.barList[t.currentBarIndex];

		//playBeat() + det new bars
		//first check whether bar is done. if it is done:
		if (b.done()) {

			//then check whether we have more bars
			if (t.currentBarIndex < t.barList.length-1) {
				t.currentBarIndex++;
				console.log("add to become "+t.currentBarIndex);

				//t.timer.interval.value = denToMs(b.den, t.bpm); //needs to go before
				//console.log(b.den+", "+t.bpm+" ->"+t.timer.interval.value);

				if (t.intervalNeedsReset) {
					t.intervalNeedsReset = false;
				}

				//viz (1 beat early)
				//highlight(t.currentBarIndex, "on");

			}
			else { //no more bars = no more tears
				//stop entirely
				/*t.stop();*/

				//loop (but needs done reset)

				/*for (var r=0; r<barList.length; r++) {
					t.barList[r].currentBeat = 0;
				}*/

				
				t.currentBarIndex = 0;
				t.intervalNeedsReset = true;
				//t.playBeat(t.barList[t.currentBarIndex]);
				console.log("back to the beginning");
				
			}

			t.playBeat(b); //current bar, not the next one

			//reset comes after
			b.currentBeat = 0; //reset!
			console.log("zero");


		}
		else { //if the bar's not done
			//console.log("poop");
			if (b.currentBeat == 0) {
				t.intervalNeedsReset = true;
				
				//viz for the prev bar off + chord check
				if (t.currentBarIndex == 0) {
					//viz
					var tail = t.barList.length-1;
					highlight(tail, "off");
				}
				else {

					//check if we're double-triggering a chord
					var currentChord = b.chord;
					var prevChord = t.barList[t.currentBarIndex-1].chord;

					if (currentChord.length != prevChord.length) {
						t.chordsSame = false;
					}
					else {
						t.chordsSame = true;
						for (var i=0; i<currentChord.length; i++) {
							if (currentChord[i] != prevChord[i]) {
								t.chordsSame = false;
							}
						}
					}
				}
					//viz
					highlight(t.currentBarIndex-1, "off");
				}


			t.playBeat(b);

			//viz
			highlight(t.currentBarIndex, "on");
		}


		//CSS work

		console.log()
		console.log("x");
	});


	//Start the timer
	t.start = function() {
		t.beatCount = 0;
		t.timer.start();
	}

	//Stop the timer
	t.stop = function() {
		t.timer.stop();
		console.log("stop!");
		
		//viz
		highlight(t.currentBarIndex, "off");
	}

	//What to do with each beat of the metro
	//b is a bar
	t.playBeat = function(b) {

		//b.isPlaying = true;
		console.log("playBeat");
		//playChord AND update timer interval (should separate)
		if (b.currentBeat == 0) { //downbeat

			//viz?
			beep("downbeat");

			if (t.intervalNeedsReset) {
				//update timer interval
				t.timer.stop();
				t.denMs = denToMs(b.den, t.bpm);
				t.timer.interval.value = t.denMs;
				t.timer.start();
				//t.timer = new T("interval", {interval:t.denMs}, t.intervalFunction);
				console.log("den"+b.den+", bpm"+t.bpm+" -> interval"+t.timer.interval.value);
				t.intervalNeedsReset = false;

				//play chord (but not if same)
				if (t.chordsSame) {
					t.playMetro("downbeat");
					t.chordsSame = false; //reset
				}
				else {
					t.playChord(b.chord);
				}
				//muted because downbeat gets a little loud
				//t.playMetro("downbeat");
			}

		}
		else { //upbeat

			//Currently set to "1 at the end", so e.g. 7 becomes 2+2+2+1 rather than 1+2+2+2
			if (b.currentBeat%2 != 0) {
				t.playMetro("upbeat");

				//viz
				beep("upbeat");
			}
		}
		console.log(b.currentBeat);
		b.currentBeat++;
		//t.beatCount++;
	}

	//Plays a chord given as array of MIDI pitches (only one articulation so far)
	t.playChord = function(noteList) {
		console.log("playChord");
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

		setTimeout(function() {
			//viz
			beep("off");
		}, t.timeoutVal);
	}

	//Plays metronome beats
	t.playMetro = function(beat) {
		console.log("playMetro");
		if (beat === "downbeat") {
			t.met.freq = 3000; //in hz
		}
		else if (beat === "upbeat") {
			t.met.freq = 1000; 
		}

		t.met.mul = 0.1;

		setTimeout(function() {
			t.met.mul = 0;

			//viz
			beep("off");
		}, t.timeoutVal); //100ms

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