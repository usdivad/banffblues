<html>
	<head>
		<title="banff blues"></title>
		<div id="header"><h1>banff blues</h1>
		<div id="nm">~ David Su <span id="ej">( concept originally from EJ Strickland"s "Spontaneous Composition on Form" )</span></div></div>
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	<body>
	<div id="content">
		<div id="sheet">
			<div id="meta">
				Quarter note = <input type="number" id="bpm" value="132"> BPM
			</div>

			<!--the chord chart-->
			<div id="chords">
				<br>


				<?php
					$numList = array(5,1,7,3,1,7,6,5,1,3,2,5);
					$denList = array(16,2,16,8,16,4,8,16,2,4,16,2);
					$chordList = array(
						"Cmaj7", "Bm7b5/E7", "Am7/D7", "Gm7/C7",
						"F7", "Fm7/Bb7", "Em7/A7", "Ebm7/Ab7", 
						"Dm7", "G7", "Cmaj7/A7", "Dm7/G7");
					$number_rows = 3;
					$bars_per_row = 4;

					//create rows
					for ($i=0; $i<$number_rows; $i++) {
						echo '<div id="row'.$i.'" class="row">'
						//create bar divs
						for ($j=0; $j<$bars_per_row; $j++) {
							$n = 4*$i + $j;
							echo '<div id="bar'.$n.'" class="bar">';
							echo '<input type="number" id="b'.$n.'n" class="num" value="'.$numList[$n].'"><br>';
							echo '<input type="number" id="b'.$n.'d" class="den" value="'.$denList[$n].'">';
							echo($chordList[$n]);
						} //end bar creation
						echo '</div>';
					} //end row creation
 
				?>	
			</div> <!--end chords-->
		</div> <!--end sheet-->	
		<div id="playButton">PLAY</div>
	</div> <!--end content-->

		<script type="text/javascript" src="./lib/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="./lib/timbre-13.8.03.min.js"></script>
		<script type="text/javascript" src="playback.js"></script>
		<script type="text/javascript" src="bar.js"></script>
		<script type="text/javascript" src="main.js"></script>
	</body>
</html>