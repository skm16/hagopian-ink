<?php
/**
 * Enqueue scripts and styles. Add as needed.
 */
function skmframework_scripts() {
    wp_enqueue_style( 'app-min-css', get_template_directory_uri() . '/assets/public/css/app.min.css' );
    wp_enqueue_style( 'aos-css', get_template_directory_uri() . '/assets/public/css/aos.css' );
    wp_enqueue_style( 'owl.carousel.min-css', get_template_directory_uri() . '/assets/public/css/owl.carousel.min.css' );
    wp_enqueue_style( 'owl.theme.default.min-css', get_template_directory_uri() . '/assets/public/css/owl.theme.default.min.css' );
    wp_enqueue_style( 'jquery.bxslider-css', get_template_directory_uri() . '/assets/public/css/jquery.bxslider.css' );
    wp_enqueue_script( 'jquery', get_template_directory_uri() . '/assets/js/vendor/jquery/jquery.min.js', array(), '3.1.1', true );
    /* -- UNCOMMENT WHEN READY FOR PRODUCTION
    wp_enqueue_script( 'main-theme-min-js', get_template_directory_uri() . '/assets/public/js/compiled.min.js', array(), '1.0.0', true );*/
    /* -- COMMENT OUT WHEN READY FOR PRODUCTION --*/
    wp_enqueue_script( 'main-theme-js', get_template_directory_uri() . '/assets/js/compiled/compiled.js', array(), '1.0.0', true );
    wp_enqueue_script( 'aos-js', get_template_directory_uri() . '/assets/public/js/aos.js' );
    wp_enqueue_script( 'owl.carousel.min-js', get_template_directory_uri() . '/assets/public/js/owl.carousel.min.js' );
    wp_enqueue_script( 'theme-js', get_template_directory_uri() . '/assets/public/js/theme.js', array( 'jquery.paroller.min-js', "isotope.pkgd.min-js" ) );
    wp_enqueue_script( 'jquery.touchSwipe.min-js', get_template_directory_uri() . '/assets/public/js/jquery.touchSwipe.min.js', array( 'jquery' ) );
    wp_enqueue_script( 'jquery.paroller.min-js', get_template_directory_uri() . '/assets/public/js/jquery.paroller.min.js' );
    wp_enqueue_script( 'jquery.bxslider-js', get_template_directory_uri() . '/assets/public/js/jquery.bxslider.js' );
    wp_enqueue_script( 'isotope.pkgd.min-js', get_template_directory_uri() . '/assets/public/js/isotope.pkgd.min.js', array("jquery") );
}
add_action( 'wp_enqueue_scripts', 'skmframework_scripts' );

add_filter( 'acf/the_field/allow_unsafe_html', function( $allowed, $selector ) {
    if ( $selector === "header_scripts" ) {
        return true;
    }
    return $allowed;
}, 10, 2);