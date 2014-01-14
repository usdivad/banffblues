function den_to_ms(den, bpm) {
	var q_ms = (60/bpm)*1000;
	return q_ms*(4/den);
}