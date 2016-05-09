<div id="contact">
	<div id="contact_title" class="section_title blue_title">
		contact°	
	</div><!-- about_title -->
	<div id="contact_info">
		<?php 
		
		$count = 0;
		foreach ( $contact_data as $c ) {
			if($count<1) {
				echo'<div id="contact_left"><p>';
				echo $c['title'] . '<br/>';
				echo $c['address'] . '</p>';
				echo '<p><a href="' . $c['map'] . '" target="_blank"> Map it</a></p><p>';

				foreach ( $c['phone'] as $p ) {

					echo '' .$p['contact_phone_type'] . ' <a href="tel:' . $p['contact_phone_number'] . '">' . $p['contact_phone_number'] . '</a><br/>' ;
				}
				echo'</p></div><!-- contact_left -->';
				echo'<div id="contact_right">';


				foreach ( $c['contacts'] as $cs ) {
					echo '<p>' . $cs['contacts_name'] . ' - <a href="mailto:'. $cs['contacts_email'] . '" target="_top"> Email</a><br/>' ;
					echo $cs['contacts_title'] . '</p>';
				}
				

				echo'</div><!-- contact_right -->';
			}
			
			$count++;
		}
		?>
	</div><!-- about_title -->
</div><!-- about -->




