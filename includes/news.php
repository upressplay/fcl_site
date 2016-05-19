<div id="news">
	<div id="news_title" class="section_title black_title">
		- News -
	</div><!-- services_title -->
	<div id="news_container">
		<div id="news_arrow_l">
			<img src="/images/arrow_l.png">
		</div><!-- news_arrow_l -->

		<div id="news_content">
			<div id="news_holder">

			<?php 
				$news_count = 0;
				foreach ( $news_data as $n ) {

					if($news_count <3) {
						if($n['ext_link'] != "") {
							echo '<a href="'.$n['ext_link'].'" target="_blank">';
						} else {
							echo '<a href="/news/'.$n['id'].'" entry_id="'.$n['id'].'">';
						}
						
						echo '<div class="news_entry" id="'.$n['id'].'">';

						echo '<div class="news_img">';
						echo '<img src="'.$n['img'].'">';
						echo '</div><!-- news_img -->';

						echo '<div class="news_info">';
						echo '<div class="news_title">';
						echo $n['title'];
						echo '</div><!-- news_title -->';
						echo '<div class="news_desc">';
						echo $n['short_desc'];
						echo '</div><!-- news_desc -->';

						echo '<div class="news_read_more">';
						echo 'read more°';
						echo '</div><!-- news_read_more -->';
						echo '</div><!-- news_info -->';

						echo '</div><!-- news_entry -->';
						echo '</a>';	
					}
				
					$news_count++;

				}
			?>
			
			</div><!-- news_holder -->
		</div><!-- news_content -->
		<div id="news_arrow_r">
			<img src="/images/arrow_r.png">
		</div><!-- news_arrow_r -->
	</div>
</div><!-- news -->