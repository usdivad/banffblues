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
					$number_rows = 3;
					$number_bars = 12;

					//create rows
					for ($i=0; $i<$number_rows; $i++) {
						echo '<div id="row'.$i.'" class="row">'
						//create bar divs
						for ($j=$i; $j<number_bars; $j++) {
							echo '<div id="bar'.$j.'" class="bar">';
							echo '<input type="number" id="b'.$j.'n" class="num" value="'.$numList[$j].'">';
							echo '<input type="number" id="b'.$j.'d" class="den" value="'.$denList[$j].'">';
						} //end bar creation
						echo '</div>';
					} //end row creation
 
				?>
				<!--first four bars-->
				<div id="row1" class="row">
					<div id="bar1" class="bar">
					<input type="number" id="b1n" class="num" value="5"><br>
					<input type="number" id="b1d" class="den" value="16">
					Cmaj7
					</div>
					<div id="bar2" class="bar">
					<input type="number" id="b2n" class="num" value="1"><br>
					<input type="number" id="b2d" class="den" value="2">
					Bm7b5/E7
					</div>
					<div id="bar3" class="bar">
					<input type="number" id="b3n" class="num" value="7"><br>
					<input type="number" id="b3d" class="den" value="16">
					Am7/D7
					</div>
					<div id="bar4" class="bar">
					<input type="number" id="b4n" class="num" value="3"><br>
					<input type="number" id="b4d" class="den" value="8">
					Gm7/C7
					</div>
				</div>
				<!--next four bars-->
				<div id="row2" class="row">
					<div id="bar5" class="bar">
					<input type="number" id="b5n" class="num" value="1"><br>
					<input type="number" id="b5d" class="den" value="16">
					F7
					</div>
					<div id="bar6" class="bar">
					<input type="number" id="b6n" class="num" value="7"><br>
					<input type="number" id="b6d" class="den" value="4">
					Fm7/Bb7
					</div>
					<div id="bar7" class="bar">
					<input type="number" id="b7n" class="num" value="6"><br>
					<input type="number" id="b7d" class="den" value="8">
					Em7/A7
					</div>
					<div id="bar8" class="bar">
					<input type="number" id="b8n" class="num" value="5"><br>
					<input type="number" id="b8d" class="den" value="16">
					Ebm7/Ab7
					</div>
				</div>
				<!--last four bars-->
				<div id="row3" class="row">
					<div id="bar9" class="bar">
					<input type="number" id="b9n" class="num" value="1"><br>
					<input type="number" id="b9d" class="den" value="2">
					Dm7
					</div>
					<div id="bar10" class="bar">
					<input type="number" id="b10n" class="num" value="3"><br>
					<input type="number" id="b10d" class="den" value="4">
					G7
					</div>
					<div id="bar11" class="bar">
					<input type="number" id="b11n" class="num" value="2"><br>
					<input type="number" id="b11d" class="den" value="16">
					Cmaj7/A7
					</div>
					<div id="bar12" class="bar">
					<input type="number" id="b12n" class="num" value="5"><br>
					<input type="number" id="b12d" class="den" value="2">
					Dm7/G7
					</div>
				</div>		
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