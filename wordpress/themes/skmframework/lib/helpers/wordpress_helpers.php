<?php 
// wp_title support
add_action( 'after_setup_theme', 'skmframework_title_tag' );
function skmframework_title_tag() {
    add_theme_support( 'title-tag' );
}
function skmframework_wp_title_for_home( $title ) {
  if ( empty( $title ) && ( is_home() || is_front_page() ) ) {
    $title = __( 'Home', 'skmframework' ) . ' | ' . get_bloginfo( 'description' );
  }
  return $title;
}
add_filter( 'wp_title', 'skmframework_wp_title_for_home' );

// add post the_post_thumbnail
add_theme_support( 'post-thumbnails' );

// skm if has pagination
function skmframework_show_posts_nav() {
 global $wp_query;
 return ($wp_query->max_num_pages > 1);
}

// add google analytics
add_action('wp_footer', 'skmframework_add_googleanalytics');
function skmframework_add_googleanalytics() { ?>

<?php }

// skm remove wp version number
function skmframework_remove_version() {
  return '';
}
add_filter('the_generator', 'skmframework_remove_version');


// html 5 support
add_theme_support( 'html5', array(
 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
) );


// allow svg upload
function cc_mime_types($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

/**
* Disable the emoji's
*/
function skm_disable_emojis() {
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
    remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
    remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
    remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
    add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
    add_filter( 'wp_resource_hints', 'disable_emojis_remove_dns_prefetch', 10, 2 );
}
add_action( 'init', 'skm_disable_emojis' );

/**
* Filter function used to remove the tinymce emoji plugin.
*
* @param array $plugins
* @return array Difference betwen the two arrays
*/
function disable_emojis_tinymce( $plugins ) {
    if ( is_array( $plugins ) ) {
        return array_diff( $plugins, array( 'wpemoji' ) );
    } else {
        return array();
    }
}

/**
* Remove emoji CDN hostname from DNS prefetching hints.
*
* @param array $urls URLs to print for resource hints.
* @param string $relation_type The relation type the URLs are printed for.
* @return array Difference betwen the two arrays.
*/
function disable_emojis_remove_dns_prefetch( $urls, $relation_type ) {
    if ( 'dns-prefetch' == $relation_type ) {
        /** This filter is documented in wp-includes/formatting.php */
        $emoji_svg_url = apply_filters( 'emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/' );
        $urls = array_diff( $urls, array( $emoji_svg_url ) );
    }
    return $urls;
}

// Find the image id from a URL
function url_get_image_id($image_url) {
    global $wpdb;
    $attachment = $wpdb->get_col($wpdb->prepare("SELECT ID FROM $wpdb->posts WHERE guid='%s';", $image_url ));
    return $attachment[0];
}

// determine whether post has a featured image, 
// if not, find the first image inside the post content, 
// $size passes the thumbnail size, $url determines whether to return a URL or a full image tag
function checkImageType($size, $type) {
   global $post;
   $content = $post->post_content;
   $first_img = '';
   ob_start();
   ob_end_clean();
   $output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $content, $matches);
   $first_img = $matches[1][0];
   /*If there's a featured image, show it*/
   if (get_the_post_thumbnail($post_id) != '' ) {
       if($type=='url') {
           the_post_thumbnail_url($size);
       } else {
           the_post_thumbnail($size);
       }
   } else {
       /*No featured image, so we get the first image inside the post content*/
       if ($first_img) {
           //let's get the correct image dimensions
           $image_id = url_get_image_id($first_img);
           $image_thumb = wp_get_attachment_image_src($image_id, $size);
           // if we've found an image ID, correctly display it
           if($image_thumb) {
               if($type=='url') {
                   echo $image_thumb[0];
               } else {
                   echo '<img src="'.$image_thumb[0].'" alt="'.get_the_title().'"/>';
               }
           } else {
               //if no image (i.e. from an external source), echo the original URL
               if($type=='url') {
                   echo $first_img;
               } else {
                   echo '<img src="'.$first_img.'" alt="'.get_the_title().'"/>';
               }

           }
       }
   }
}

// These slow down sites and are rather unecessary
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_styles', 'print_emoji_styles');