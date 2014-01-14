function Bar() {
	var b = this;
	b.chord = "Am7";
	//var timesig = _timesig;
	b.num = 10;
	b.den = 8;
	b.isPlaying = false;
	b.currentBeat = 0; //start at 0 so < not <=

	b.hoot = function() {
		console.log("hoot");
	}
}