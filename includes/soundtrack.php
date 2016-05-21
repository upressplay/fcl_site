<div id="soundtrack">
	<div id="soundtrack_title" class="section_title black_title">
		- Soundtrack -
	</div><!-- soundtrack_title -->
	<div id="soundtrack_holder">
		<?php 
		
		foreach ( $soundtrack_data as $s ) {
			echo '<div id="'.$s['id'].'" class="soundtrack inactive">';
				echo '<div class="soundtrack_img">';
					echo '<img src="'.$s['img']['sizes']['soundtrack-thumb'].'">';
				echo '</div><!-- soundtrack_img -->';
				echo '<div class="soundtrack_info">';
					echo '<div class="soundtrack_title">';
						echo $s['title'];
					echo '</div><!-- soundtrack_title -->';
					
					echo '<div class="soundtrack_artist">';
						echo $s['artist'];
					echo '</div><!-- soundtrack_artist -->';
					
				echo '</div><!-- soundtrack_info -->';
				echo '<a href="'.$s['link'].'" target="_blank">';
					echo '<div class="soundtrack_link fa fa-external-link"></div>';
				echo '</a>';
				echo '<div btnid="'.$s['id'].'" id="'.$s['id'].'_play_btn" class="soundtrack_play fa fa-play-circle"></div>';
			echo '</div><!-- soundtrack -->';
		}
		?>
	</div><!-- soundtrack_holder -->
</div><!-- soundtrack -->




