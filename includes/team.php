<div id="castcrew">
	<div id="team_title" class="section_title white_title">
		- Cast & Crew -
	</div><!-- services_title -->
	<div id="team_container">
		<div id="team_arrow_l">
			<img src="/images/arrow_l.png">
		</div><!-- team_arrow_l -->

		<div id="team_content">
			<div id="team_holder">

			<?php 
				$team_count = 0;
				foreach ( $team_data as $t ) {

					if($team_count <3) {
						echo '<a href="/team/'.$t['id'].'" entry_id="'.$t['id'].'">';
						echo '<div class="team_entry" id="'.$t['id'].'">';

						echo '<div class="team_img">';
						echo '<img src="'.$t['img'].'">';
						echo '</div><!-- team_img -->';

						echo '<div class="team_info">';
						echo '<div class="team_title">';
						echo $t['title'];
						echo '</div><!-- team_title -->';
						echo '<div class="team_desc">';
						echo $t['position'];
						echo '</div><!-- team_desc -->';
						echo '<div class="team_read_more">';
						echo 'read more°';
						echo '</div><!-- team_read_more -->';
						echo '</div><!-- team_info -->';

						echo '</div><!-- team_entry -->';
						echo '</a>';	
					}
				
					$team_count++;

				}
			?>
			
			</div><!-- team_holder -->
		</div><!-- team_content -->
		<div id="team_arrow_r">
			<img src="/images/arrow_r.png">
		</div><!-- team_arrow_r -->
	</div>
</div><!-- team -->