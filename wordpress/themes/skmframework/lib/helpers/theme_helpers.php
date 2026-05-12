<?php 

function my_limit_archives( $args ) {
    $args['limit'] = 6;
    return $args;
}
add_filter( 'widget_archives_args', 'my_limit_archives' );

$page_details = get_pages( array(
 'post_type' => 'page',
 'meta_key' => '_wp_page_template',
 'hierarchical' => 0,
 'meta_value' => 'templates/template-work.php'
));

if( $page_details[0]->ID ) {
    define("PAGE_ID_WORK", $page_details[0]->ID);
}

// skm archive link title
function skmframework_archive_page_title() {
  $queried_object = get_queried_object();
  if(is_home()):
    $archive_page_title = 'Blog';
  elseif(is_category()):
    $archive_page_title = $queried_object->name;
  elseif(is_date()):
    $monthnum = get_query_var('monthnum');
    $monthname = $GLOBALS['wp_locale']->get_month($monthnum);
    $archive_page_title = 'Published in '. $monthname.' '.get_query_var('year');
  elseif(is_tag()):
    $archive_page_title = 'Tagged in <span class="text-capitalize">'.$queried_object->name.'</span>';
  elseif(is_author()):
    $archive_page_title = '<span>Articles by '.get_the_author().'</span>';
  elseif(is_404()):
    $archive_page_title = '404 - Page not found.';
  endif;
  return $archive_page_title;
}

// skm password form
function skmframework_password_form() {
    global $post;
    $label = 'pwbox-'.( empty( $post->ID ) ? rand() : $post->ID );
    $o = '<form action="' . esc_url( site_url( 'wp-login.php?action=postpass', 'login_post' ) ) . '" method="post">
    ' . __( "To view this protected post, enter the password below:" ) . '
    <br/><label for="' . $label . '">' . __( "Password:" ) . ' </label><br/><input name="post_password" id="' . $label . '" type="password" size="20" maxlength="20" /><input type="submit" name="Submit" value="' . esc_attr__( "Submit" ) . '" />
    </form>
    ';
    return $o;
}
add_filter( 'the_password_form', 'skmframework_password_form' );

// add theme editor styles
function skmframework_theme_add_editor_styles() {
    add_editor_style( 'editor-style.css' );
}
add_action( 'admin_init', 'skmframework_theme_add_editor_styles' );

// add automatic-feed-links support
add_theme_support( 'automatic-feed-links' );

// custom theme headers
function skmframework_custom_header_setup() {
    $args = array(
        'default-image'      => '',
        'default-text-color' => '000',
        'width'              => 500,
        'height'             => 250,
        'flex-width'         => true,
        'flex-height'        => true,
    );
    add_theme_support( 'custom-header', $args );
}
add_action( 'after_setup_theme', 'skmframework_custom_header_setup' );

// custom theme background
$args = array(
	'default-color' => 'ffffff',
	'default-image' => '',
);
add_theme_support( 'custom-background', $args );

// custom logo support
function skmframework_custom_logo_setup() {
    $defaults = array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
        'header-text' => array( 'site-title', 'site-description' ),
    );
    add_theme_support( 'custom-logo', $defaults );
}
add_action( 'after_setup_theme', 'skmframework_custom_logo_setup' );

// set content width
if ( ! isset( $content_width ) ) $content_width = 1200;

// comments js
function skmframework_queue_js(){
if ( (!is_admin()) && is_singular() && comments_open() && get_option('thread_comments') )
  wp_enqueue_script( 'comment-reply' );
}
add_action('wp_print_scripts', 'skmframework_queue_js');

// read more link
function skmframework_excerpt_more( $link ) {
	if ( is_admin() ) {
		return $link;
	}

	$link = sprintf( '<p class="link-more"><a href="%1$s" class="more-link">READ MORE</a></p>',
		esc_url( get_permalink( get_the_ID() ) ),
		/* translators: %s: Name of current post */
		sprintf( __( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'skmframework' ), get_the_title( get_the_ID() ) )
	);
	return ' &hellip; ' . $link;
}
add_filter( 'excerpt_more', 'skmframework_excerpt_more' );

add_filter( 'excerpt_length', function($length) {
    return 35;
} );

add_filter( 'the_excerpt', function( $excerpt ) {
  return str_replace( [ '<p>&nbsp; ', '<p>&nbsp;' ], '<p>', $excerpt );
}, 999, 1 );