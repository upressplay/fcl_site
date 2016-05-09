<div id="apply">
	<div id="apply_content">
		<?php 
		
		$count = 0;
		foreach ( $position_data as $p ) {
			
			echo '<div id="position_'. $count . '" class="position">';
				echo '<a href="' . $p['url'] . '">';
					echo '<div id="apply_btn" class="circle_blue">';
						echo '<div class="circle_content">';
							echo '<div class="circle_txt">';
								echo '<div class="fa fa-pencil-square-o apply_icon" aria-hidden="true"></div>';
								echo 'apply°';
							echo '</div><!-- circle_txt -->';
						echo '</div><!-- circle_content -->';
					echo '</div><!-- apply_btn -->';
				echo '</a>';
				echo '<div id="apply_info">';
					echo '<div id="apply_title">';
						echo $p['title'];
						echo ' <span id="apply_location" class="blue_sub">' . $p['location'] . '</span>';
					echo '</div><!-- circle_content -->';
					echo '<div id="apply_desc" class="gray_desc">';
						echo $p['desc'];
					echo '</div><!-- apply_desc -->';
					echo '<div id="pay_range" class="gray_subhead">';
						echo $p['salary'];
					echo '</div><!-- pay_range -->';
				echo '</div><!-- apply_info -->';
				echo '</div><!-- position -->';
			
			$count++;
		}
		?>
		
	</div><!-- apply_content -->
</div><!-- apply -->




