<?php
if( is_blog() ) {
    get_header();
} else {
    get_header( "single-work" );
}
    
    get_template_part('loops/loop', 'post');
get_footer();
