/*
	BAR BAR BAR
*/
function Bar() {
	var b = this;
	b.chord = [46,49,53,56]; //"Bb7"
	//var timesig = _timesig;
	b.num = 5;
	b.den = 16;
	b.isPlaying = false;
	b.currentBeat = 0; //start at 0 so < not <=


	//Checks whether bar is done playing through all its beats (as indicated by num)
	b.done = function() {
		if (b.currentBeat < b.num) {
			return false;
		}
		else {
			//b.currentBeat = 0; //reset!
			//b.isPlaying = false;
			return true;
		}
	}
}