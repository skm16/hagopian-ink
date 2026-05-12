<?php 
if( is_blog() || is_search() ) {
    get_header();
} else {
    get_header( "single-work" );
}
    get_template_part('loops/loop', 'blog');
get_footer();
