
<div id="gallery">
<div id="gallery_title" class="section_title black_title">
	- Gallery -	
</div><!-- gallery_title -->
	<?php 
		
		$count = 0;
		foreach ( $gallery_data as $g ) {

			echo '<a href="/gallery/'. $g['id'] . '" entry_id="'. $g['id'] . '">';
			echo '<div id="'. $g['id'] .'" class="gallery_thumb">';
			echo '</div>';
			echo '</a>';
			
			$count++;
		}
		?>
		<div id="load_more_gallery">
			<div id="load_more_gallery_btn">
				- Load More - 
			</div><!-- load_more_videos -->
		</div><!-- load_more -->
</div><!-- gallery -->




