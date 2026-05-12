<?php
/* ----------------------------------------
  -- ENQUEUE YOUR GOOGLE FONTS HERE
  -- defaults to Roboto
----------------------------------------- */
function skmframework_google_fonts() {
    wp_enqueue_style( 'google-fonts', '//fonts.googleapis.com/css?family=Roboto:300,400,500,700,900' );
    wp_enqueue_style( 'google-fonts-fira-sans', '//fonts.googleapis.com/css?family=Fira+Sans:300' );
    wp_enqueue_style( 'font-awesome.min', "//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" );
//    wp_enqueue_style( 'playfair-display-css', "//fonts.googleapis.com/css?family=Playfair+Display" );
}
add_action( 'wp_enqueue_scripts', 'skmframework_google_fonts' );