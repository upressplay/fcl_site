<!doctype html>
<?php 

	$cdn = "/";

	$segments = explode('/', trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/')); 

	$meta_title_default = "First Comes Like";
	$meta_title = $meta_title_default;

	$site_url = "http://" . $_SERVER['HTTP_HOST'];
	$meta_url = "http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	
	$meta_desc_default = "After they both swipe right, Jeff and Kate start to build a personal relationship through the most impersonal of ways--technology.  From flirty texting to their first Skype date, they find themselves drawn to each other but are scared of actually making the choice to meet in person.  Because in today's dating scene, first comes like and then comes, should we meet?";
	$meta_desc = $meta_desc_default;

	$meta_img_default = $site_url . '/images/fcl.jpg';
	$meta_img = $meta_img_default;

	$header_data  = file_get_contents('http://firstcomeslikemovie.com/wordpress/?json=sitedata/header');
	$header_data = json_decode($header_data, true);	
	$header_data = $header_data['data'];

	$about_data  = file_get_contents('http://firstcomeslikemovie.com/wordpress/?json=sitedata/about');
	$about_data = json_decode($about_data, true);	
	$about_data = $about_data['data'];

	$count = 0;
	foreach ( $about_data as $a ) {
		if($count<1) {
			$meta_desc_default = $a['desc'];
			$meta_img  = $a['img']['sizes']['share'];
		}
		
		$count++;
	}

	$news_data  = file_get_contents('http://firstcomeslikemovie.com/wordpress/?json=sitedata/news');
	$news_data = json_decode($news_data, true);	
	$news_data = $news_data['data'];

	if($segments[0] == "news") {

		$meta_title = $meta_title_default . " : News";
		
		foreach ( $news_data as $n ) {

			if($segments[1] == $n['id']) {
				$meta_title = $meta_title . " : " . $n['title'];
				$meta_desc = substr(strip_tags($n['desc']), 0, 300);
				$meta_img  = $n['img']['sizes']['share'];
			}	
		}
		
	}

	$gallery_data  = file_get_contents('http://firstcomeslikemovie.com/wordpress/?json=sitedata/gallery');
	$gallery_data = json_decode($gallery_data, true);	
	$gallery_data = $gallery_data['data'];

	if($segments[0] == "gallery") {

		$meta_title = $meta_title_default . " : Gallery";
		
		foreach ( $gallery_data as $g ) {

			if($segments[1] == $g['id']) {
				$meta_title = $meta_title . " : " . $g['title'];
				if($g['desc'] != "") $meta_desc = substr(strip_tags($g['desc']), 0, 300);
				$meta_img  = $g['img']['sizes']['share'];
			}	
		}		

	}

	$videos_data  = file_get_contents('http://firstcomeslikemovie.com/wordpress/?json=sitedata/videos');
	$videos_data = json_decode($videos_data, true);	
	$videos_data = $videos_data['data'];

	if($segments[0] == "videos") {

		$meta_title = $meta_title_default . " : Videos";
		
		foreach ( $videos_data as $v ) {

			if($segments[1] == $v['id']) {
				$meta_title = $meta_title . " : " . $v['title'];
				if($v['desc'] != "") $meta_desc = substr(strip_tags($v['desc']), 0, 300);
				$meta_img  = $v['img']['sizes']['share'];
			}	
		}
		
	}

	$team_data  = file_get_contents('http://firstcomeslikemovie.com/wordpress/?json=sitedata/team');
	$team_data = json_decode($team_data, true);	
	$team_data = $team_data['data'];

	if($segments[0] == "castcrew") {

		$meta_title = $meta_title_default . " : Cast & Crew";
		
		foreach ( $team_data as $t ) {

			if($segments[1] == $t['id']) {
				$meta_title = $meta_title . " : " . $t['title'];
				if($t['bio'] != "") $meta_desc = substr(strip_tags($t['bio']), 0, 300);
				$meta_img  = $t['img']['sizes']['share'];
			}	
		}		

	}

	$soundtrack_data  = file_get_contents('http://firstcomeslikemovie.com/wordpress/?json=sitedata/soundtrack');
	$soundtrack_data = json_decode($soundtrack_data, true);	
	$soundtrack_data = $soundtrack_data['data'];

	if($segments[0] == "soundtrack") {

		$meta_title = $meta_title_default . " : Soundtrack";
		
		foreach ( $soundtrack_data as $s ) {

			if($segments[1] == $s['id']) {
				$meta_title = $meta_title . " : " . $s['title'];
				if($s['desc'] != "") $meta_desc = substr(strip_tags($s['desc']), 0, 300);
				$meta_img  = $s['img']['sizes']['share'];
			}	
		}
		
	}

	

?>
<html lang="en">
<head>
  	<meta charset="utf-8">

  	<title><?php echo $meta_title; ?></title>
	<meta name="description" content="<?php echo $meta_desc; ?>"> 
	<meta http-equiv="content-type" content="text/html;charset=UTF-8">

	<meta property="og:title" content="<?php echo $meta_title; ?>" />
	<meta property="og:description" content="<?php echo $meta_desc; ?>"/>
	<meta property="og:url" content="<?php echo $meta_url; ?>"/>
	<meta property="og:image" content="<?php echo $meta_img; ?>"/>
  	
  	<meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@FirstComesLike">
    <meta name="twitter:creator" content="@FirstComesLike">
    
    <meta name="twitter:description" content="<?php echo $meta_desc; ?>">
    <meta name="twitter:image" content="<?php echo $meta_img; ?>">

 	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
 	<link href='https://fonts.googleapis.com/css?family=EB+Garamond' rel='stylesheet' type='text/css'>

	<link rel="stylesheet" href="/css/site.css">
	<link rel="stylesheet" href="/css/nav.css">
	<link rel="stylesheet" href="/css/header.css">
	<link rel="stylesheet" href="/css/about.css">
	<link rel="stylesheet" href="/css/footer.css">
	<link rel="stylesheet" href="/css/instagram.css">
	<link rel="stylesheet" href="/css/news.css">
	<link rel="stylesheet" href="/css/team.css">
	<link rel="stylesheet" href="/css/gallery.css">
	<link rel="stylesheet" href="/css/videos.css">
	<link rel="stylesheet" href="/css/soundtrack.css">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"  href="/favicon/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
	<link rel="manifest" href="/manifest.json">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png">
	<meta name="theme-color" content="#ffffff">

	<link href="/favicon.ico" rel="shortcut icon" type="image/x-icon">

	
</head>

<body>
	<!-- Google Tag Manager -->
	<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-TLLFJ8"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-TLLFJ8');</script>
	<!-- End Google Tag Manager -->

	<?php 
		include 'includes/nav.php';
	?>
	<div id="site_holder">
		
		<div id="site_container">
			<?php 
				include 'includes/header.php';
				include 'includes/about.php';
				include 'includes/videos.php';
				include 'includes/gallery.php';
				include 'includes/team.php';
				include 'includes/news.php';
				include 'includes/soundtrack.php';
				include 'includes/instagram.php';
			?>
			
			<div id="credits">
				<img src="/images/credits.png">
			</div>
		</div><!-- site_container -->

		<?php 
			include 'includes/footer.php';
		?>
	</div><!-- site_holder -->

	
	
	<script src="/js/lib/jquery-2.2.3.min.js"></script>
  	<script src="/js/lib/TweenMax.min.js"></script>
  	<script src="/js/lib/ScrollToPlugin.min.js"></script>
  	
  	<script src="/js/site.js"></script>

  	<script>
	<?php 
		
		$js_segments = json_encode($segments);
		echo "site.segments = ". $js_segments . ";\n"; 

		$header_data = json_encode($header_data);
		echo "site.header_data = ". $header_data . ";\n"; 

		$news_data = json_encode($news_data);
		echo "site.news_data = ". $news_data . ";\n"; 

		$team_data = json_encode($team_data);
		echo "site.team_data = ". $team_data . ";\n"; 

		$gallery_data = json_encode($gallery_data);
		echo "site.gallery_data = ". $gallery_data . ";\n"; 

		$videos_data = json_encode($videos_data);
		echo "site.videos_data = ". $videos_data . ";\n"; 

		$soundtrack_data = json_encode($soundtrack_data);
		echo "site.soundtrack_data = ". $soundtrack_data . ";\n"; 


	?>
	</script>

	<script src="/js/nav.js"></script>
  	<script src="/js/header.js"></script>
  	<script src="/js/news.js"></script>
  	<script src="/js/instagram.js"></script>
  	<script src="/js/team.js"></script>
  	<script src="/js/gallery.js"></script>
  	<script src="/js/videos.js"></script>
  	<script src="/js/audio.js"></script>
</body>
</html>