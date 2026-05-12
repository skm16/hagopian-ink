<?php

add_action( 'after_setup_theme', 'register_image_size' );
function register_image_size() {
    add_image_size( 'thumbnail-blog', 408, 577, true ); // (cropped)
    add_image_size( 'thumbnail-work', 293, 414, true ); // (cropped)
    add_image_size( 'thumbnail-team', 364, 364, true ); // (cropped)
}
