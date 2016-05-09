<div id="candidates">
	<div id="candidates_title" class="section_title black_title">
		candidates°	
	</div><!-- team_title -->
	<div id="candidates_content">

		<?php 
		
		$count = 0;
		foreach ( $candidates_data as $c ) {
			if($count<1) {
				echo '<div class="candidates_head">';
					echo $c['title'];
				echo '</div><!-- candidates_head -->';

				echo '<div class="candidates_desc">';
					echo $c['desc'];
				echo '</div><!-- candidates_desc -->';

				echo '<div class="signature">';
					echo '<img src="' . $c['signature'] . '">';
				echo '</div><!-- signature -->';

				echo '<div class="candidates_photo_content">';
					echo '<div class="candidates_photo">';
						echo '<img src="' . $c['photo'] . '">';
					echo '</div><!-- candidates_photo -->';
					echo '<div class="candidates_photo_title">';
						echo $c['name'] . '<br/>' . $c['position'];
					echo '</div><!-- candidates_photo_title -->';
				echo '</div><!-- candidates_photo_content -->';
			}
			
			$count++;
		}
		?>

		

	</div><!-- candidates_content -->
</div><!-- candidates -->




