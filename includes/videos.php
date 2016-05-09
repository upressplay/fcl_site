
<div id="videos">
<div id="videos_title" class="section_title white_title">
	- Videos -	
</div><!-- videos_title -->
	<?php 
		
		$count = 0;
		foreach ( $videos_data as $v ) {

			echo '<a href="/videos/'. $v['id'] . '" entry_id="'. $v['id'] . '">';
			echo '<div id="'. $v['id'] .'" class="videos_btn">';
				echo '<div class="videos_thumb">';
				echo '</div>';
				echo '<div class="video_title">';
					echo $v['title'];
				echo '</div><!-- video_title -->';
			echo '</div><!-- videos_btn -->';
			echo '</a>';
			
			$count++;
		}
		?>
		<div id="load_more_videos">
			<div id="load_more_videos_btn">
				- Load More - 
			</div><!-- load_more_videos -->
		</div><!-- load_more -->
</div><!-- videos -->




