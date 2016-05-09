<div id="services">
	<div id="services_title" class="section_title blue_title">
		services°	
	</div><!-- services_title -->
	<div id="services_holder">
		<?php 
		
		$count = 0;
		foreach ( $services_data as $s ) {
			echo '<div id="service_'.$count.'" class="service">';
				echo '<div class="service_initial">';
						echo '<div class="circle_blue services_circle">';
							echo '<div class="circle_content">';
								echo '<div class="circle_txt">';
									echo '<div class="'.$s['icon'].'" aria-hidden="true"></div>';
								echo '</div><!-- circle_txt -->';
							echo '</div><!-- circle_content -->';
						echo '</div><!-- services_circle -->';
						echo '<div class="service_info">';
							echo '<div class="service_title">';
								echo $s['title'] . '°';
							echo '</div><!-- service_title -->';
							echo '<div class="service_desc">';
								echo $s['desc'];
							echo '</div><!-- service_desc -->';
						echo '</div><!-- service_info -->';
						echo '<div btnid="'.$count.'" class="service_btn">';
							echo '<div class="fa fa-chevron-circle-right"></div>';
						echo '</div><!-- service_btn -->';
					echo '</div><!-- service_initial -->';

					echo '<div class="service_expand">';
						echo '<div class="circle_black services_circle">';
							echo '<div class="circle_content">';
								echo '<div class="circle_txt">';
									echo '<div class="'.$s['icon'].'" aria-hidden="true"></div>';
								echo '</div><!-- circle_txt -->';
							echo '</div><!-- circle_content -->';
						echo '</div><!-- services_circle -->';
						echo '<div class="service_info">';
							echo '<div class="service_desc expand">';
								echo $s['expand'];
							echo '</div><!-- service_desc -->';
						echo '</div><!-- service_info -->';
						echo '<div btnid="'.$count.'" class="service_btn expand">';
							echo '<div class="fa fa-chevron-circle-left"></div>';
						echo '</div><!-- service_btn -->';

					echo '</div><!-- service_expand -->';
				echo '</div><!-- service_'.$count.' -->';
		
			$count++;
		}
			?>
		

		

	</div><!-- services_holder -->
</div><!-- services -->




