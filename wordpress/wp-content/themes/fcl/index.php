<!DOCTYPE html>

<?php

	$cdn = "/";
	$meta_title_default = "TVGla :: Idea Driven. People Focused.";
	$meta_title = $meta_title_default;
	$meta_desc_default = "TVGla is a digital marketing agency hell-bent on changing the landscape of our industry by setting trends, not following them. Our strategy is to engage your audience with the right message, in the right medium, at the right moment. From the desktop to the handheld, if it’s digital, we own it.";
	$meta_desc = $meta_desc_default;
	$site_url = "http://" . $_SERVER[HTTP_HOST];
	$meta_url = "http://" . $_SERVER[HTTP_HOST] . $_SERVER['REQUEST_URI'];
	$meta_img_default = $site_url . '/images/f7_avatar.jpg';
	$meta_img = $meta_img_default;
	$segments = explode('/', trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/')); 
	$template_uri = get_template_directory_uri();

	$data_args = array( //added because of .htaccess AUTH on site. REMOVE before launch
		'headers' => array('Authorization' => 'Basic ' . base64_encode( 'tvgla' . ':' . 'd1m1try' )),
		'body'        => true
	);

	$menu_items = wp_get_nav_menu_items( 'Site Nav' );

	$page_id = $segments[0];
	if($page_id == "") $page_id = "home";
	$page_settings = wp_remote_get($site_url . '/api/tvgladata/page_settings/?val='.$page_id, $data_args);

	$page_settings = json_decode($page_settings['body'], true);	

	

	if($segments[0] == "work") {
		if($segments[1] != "") {
			$work_data  = wp_remote_get($site_url . '/api/tvgladata/work', $data_args);
			$work_data = json_decode($work_data['body'], true);	
			$work_data = $work_data['data'];

			foreach ( $work_data as $w ) {
				//echo $w['id'] . '<br/>';
				if($w['id'] == $segments[1]) {
					$work_data = $w;
				}

			}

		} else {
			$work_data = $page_settings['featured_work'];
			$client_data = $page_settings['featured_clients'];
		}	
	}
	

	if($segments[0] == "news") {

		$news_data  = wp_remote_get($site_url . '/api/tvgladata/news', $data_args);
		$news_data = json_decode($news_data['body'], true);	
		$news_data = $news_data['data'];

		if($segments[1] == "") {
			$awards_data  = wp_remote_get($site_url . '/api/tvgladata/awards', $data_args);
			$awards_data = json_decode($awards_data['body'], true);	
			$awards_data = $awards_data['data'];
		} else {
				
		}
	}
	
?>

<html>
<head>

<title><?php echo $meta_title; ?></title>
<meta name="description" content="<?php echo $meta_desc; ?>"> 
<meta http-equiv="content-type" content="text/html;charset=UTF-8">
<meta property="og:title" content="<?php echo $meta_title; ?>" />
<meta property="og:description" content="<?php echo $meta_desc; ?>" />
<meta property="og:url" content="<?php echo $meta_url; ?>"/>
<meta property="og:image" content="<?php echo $meta_img; ?>" />

<link rel="icon" type="image/ico" href="favicon.ico">

<meta name="viewport" content="width=device-width, user-scalable=no">

<link href='http://fonts.googleapis.com/css?family=Raleway:400,700' rel='stylesheet' type='text/css'>
<link rel="stylesheet" type="text/css" media="all" href="<?php echo $template_uri; ?>/css/site.css" />

<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.0/TweenMax.min.js"></script>

</head>
<body>

	<div id="site_holder">
		<div id="site_container">
			<div id="site_nav">
				<a href="<?php echo $site_url;?>"><div id="site_logo"><img src="<?php echo $template_uri; ?>/images/site_logo.png"></div></a>
				<div id="nav_btns">
				<?php
					foreach ( (array) $menu_items as $key => $menu_item ) {
					    $title = $menu_item->title;
					    $url = $menu_item->url;
					    $attr_title = $menu_item->attr_title;
					    $btn_class = "nav_btn";
					    if($attr_title == $segments[0]) $btn_class = "active_btn";
					    echo '<a href="' . $url . '"><div class="' . $btn_class . '">' . $title . '</div></a>';
					}
				?>
				</div>
				<div id="menu_btn">
					<div id="menu_btn_holder">
						<div id="menu_closed">
							<img src="<?php echo get_template_directory_uri(); ?>/images/menu_closed.png">
						</div><!-- menu_closed -->
						<div id="menu_open">
							<img src="<?php echo get_template_directory_uri(); ?>/images/menu_open.png">
						</div><!-- menu_open -->
					</div><!-- menu_btn_holder -->	
				</div><!-- menu_btn -->
			</div>

			<div id="page_content">
				

				<?php

					if($segments[0] == "") {
						include('includes/home.php');
					}

					if($segments[0] == "about") {
						include('includes/about.php');
					}

					if($segments[0] == "work") {
						include('includes/work.php');
					}

					if($segments[0] == "news") {
						include('includes/news.php');
					}

					if($segments[0] == "careers") {
						include('includes/careers.php');
					}

					if($segments[0] == "contact") {
						include('includes/contact.php');
					}
					
				?>
			</div><!-- page_content -->

			<div id="footer">
				<div id="phone">
					<div class="icon">
						<img src="<?php echo $template_uri; ?>/images/phone_icon.png">
					</div>
					310-823-1800
				</div><!-- phone -->

				<div id="address">
					<div class="icon">
						<img src="<?php echo $template_uri; ?>/images/location_icon.png">
					</div>
					5340 Alla Road Suite 100 Los Angeles, California 90066
					<div id="social">
						<div id="social_holder">
							<a href="https://twitter.com/tvgla" target="_blank">
								<div id="twitter_social_btn" class="social_btn">
								</div>
							</a>

							<a href="https://instagram.com/tvgla/" target="_blank">
								<div id="instagram_social_btn" class="social_btn">
								</div>
							</a>

							<a href="https://www.facebook.com/tvgla" target="_blank">
								<div id="facebook_social_btn" class="social_btn">
								</div>
							</a>

							<a href="https://www.linkedin.com/company/tvgla" target="_blank">
								<div id="linkedin_social_btn" class="social_btn">
								</div>
							</a>
						</div><!-- social -->
					</div><!-- social -->

					
				</div><!-- address -->

				<div id="careers">
					<div class="icon">
						<img src="<?php echo $template_uri; ?>/images/users_icon.png">
					</div>
					<a href="/careers"><div id="were_hiring" class="red_btn">WE'RE HIRING</div></a>
				</div><!-- careers -->

				<div id="copyright"> @2014 TVGla</div>
			</div><!-- footer -->

	</div><!-- site_container -->
</div><!-- site holder -->

<script src="<?php  echo get_template_directory_uri(); ?>/js/site.js"></script>
<script src="<?php  echo get_template_directory_uri(); ?>/js/common.js"></script>
<script src="<?php  echo get_template_directory_uri(); ?>/js/footer.js"></script>
<script src="<?php  echo get_template_directory_uri(); ?>/js/nav.js"></script>
<script>
site.cdn = "<?php echo $template_uri; ?>";
<?php 
if($segments[0] == "home" || $segments[0] == "work") {
	$work_data = json_encode($work_data, true);
	echo "site.work_data = ". $work_data . ";\n"; 
}

if($segments[0] == "news") {
	$news_data = json_encode($news_data, true);
	echo "site.news_data = ". $news_data . ";\n"; 
	$news_types = json_encode($news_types, true);
	echo "site.news_types = ". $news_types . ";\n"; 
}


$js_segments = json_encode($segments);
echo "site.segments = ". $js_segments . ";\n"; 
?>
</script>
<?php

	if($segments[0] == "") {
		echo '<script src="' . get_template_directory_uri() . '/js/home.js"></script>';
	}

	if($segments[0] == "about") {

	}

	if($segments[0] == "work") {
		echo '<script src="' . get_template_directory_uri() . '/js/work.js"></script>';
	}

	if($segments[0] == "news") {
		echo '<script src="' . get_template_directory_uri() . '/js/news.js"></script>';
	}

	if($segments[0] == "careers") {

	}

	if($segments[0] == "contact") {

	}
	
?>

</body>
</html>