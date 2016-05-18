<?php
class json_api_sitedata_controller {
/**put your functions here to return data e.g.  Do the WP queries and then return on the info you want in a loop*/


	public function header () {

		query_posts( array ( 'post_type' => 'header' ) );

		$data = array();

		while ( have_posts() ) : the_post();

			$post = get_post(get_the_ID());

			$entry = array(
				'id' => $post->post_name,
				'title' => get_the_title(),
				'img' => get_field('header_img'),
				'loaded' => false
				);
			$data[] = $entry;
		endwhile;

		return array(
			'status' => 'ok',
			'data' => $data
		);
	}

	public function about () {

		query_posts( array ( 'post_type' => 'about' ) );

		$data = array();

		while ( have_posts() ) : the_post();

			$post = get_post(get_the_ID());

			$entry = array(
				'id' => $post->post_name,
				'title' => get_the_title(),
				'desc' => get_field('about_desc'),
				'img' => get_field('about_img'),
				);
			$data[] = $entry;
		endwhile;

		return array(
			'status' => 'ok',
			'data' => $data
		);
	}

	public function team () {

		query_posts( array ( 'post_type' => 'team' ) );

		$data = array();

		while ( have_posts() ) : the_post();

			$post = get_post(get_the_ID());

			$entry = array(
				'id' => $post->post_name,
				'title' => get_the_title(),
				'bio' => get_field('team_bio'),
				'position' => get_field('team_position'),
				'img' => get_field('team_img'),
				);
			$data[] = $entry;
		endwhile;

		return array(
			'status' => 'ok',
			'data' => $data
		);
	}

	public function videos () {

		query_posts( array ( 'post_type' => 'videos' ) );

		$data = array();

		while ( have_posts() ) : the_post();

			$post = get_post(get_the_ID());

			$entry = array(
				'id' => $post->post_name,
				'title' => get_the_title(),
				'img' => get_field('video_img'),
				'desc' => get_field('video_desc'),
				'type' => get_field('video_type'),
				'video_id' => get_field('video_id'),
				);
			$data[] = $entry;
		endwhile;

		return array(
			'status' => 'ok',
			'data' => $data
		);


	}


	public function news () {

		query_posts( array ( 'post_type' => 'news' ) );

		$data = array();

		while ( have_posts() ) : the_post();

			$post = get_post(get_the_ID());

			$entry = array(
				'id' => $post->post_name,
				'title' => get_the_title(),
				'img' => get_field('news_img'),
				'news_header' => get_field('news_header'),
				'desc' => get_field('news_desc'),
				'short_desc' => get_field('news_short_desc'),
				'ext_link' => get_field('news_ext_link'),
				);
			$data[] = $entry;
		endwhile;

		return array(
			'status' => 'ok',
			'data' => $data
		);


	}

	

	public function gallery () {

		query_posts( array ( 'post_type' => 'gallery' ) );

		$data = array();

		while ( have_posts() ) : the_post();

			$post = get_post(get_the_ID());

			$entry = array(
				'id' => $post->post_name,
				'title' => get_the_title(),
				'desc' => get_field('gallery_desc'),
				'img' => get_field('gallery_img'),
				);
			$data[] = $entry;
		endwhile;

		return array(
			'status' => 'ok',
			'data' => $data
		);

	}

	public function soundtrack () {

		query_posts( array ( 'post_type' => 'soundtrack' ) );

		$data = array();

		while ( have_posts() ) : the_post();

			$post = get_post(get_the_ID());

			$entry = array(
				'id' => $post->post_name,
				'title' => get_the_title(),
				'artist' => get_field('soundtrack_artist'),
				'link' => get_field('soundtrack_link'),
				'img' => get_field('soundtrack_img'),
				'mp3' => get_field('soundtrack_mp3'),
				'ogg' => get_field('soundtrack_ogg'),
				'playing' => false,
				'loaded' => false,
				);
			$data[] = $entry;
		endwhile;

		return array(
			'status' => 'ok',
			'data' => $data
		);

	}

}

?>