function Bar() {
	var b = this;
	b.chord = [46,49,53,56]; //"Bb7"
	//var timesig = _timesig;
	b.num = 10;
	b.den = 8;
	b.isPlaying = false;
	b.currentBeat = 0; //start at 0 so < not <=

	b.playBeat = function(eng) {
		b.isPlaying = true;

		if (b.currentBeat == 0) {
			eng.playChord(b.chord);
			eng.playMetro("downbeat");
		}
		else {
			eng.playMetro("upbeat");
		}


		b.currentBeat++;
	}

	//Checks whether bar is done playing through all its beats (as indicated by num)
	b.done = function() {
		if (b.currentBeat < b.num) {
			b.isPlaying = false;
			return false;
		}
		else {
			return true;
		}
	}
}