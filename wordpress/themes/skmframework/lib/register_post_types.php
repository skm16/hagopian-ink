<?php
/* ----------------------------------------
  -- ADD YOUR CUSTOM POST TYPES HERE
----------------------------------------- */
function register_custom_post_type() {
    $args = array(
        'public'             => true,
        'label'              => __( 'Team' ),
        'supports'           => array('title','editor', 'thumbnail', 'excerpt'),
        'public'             => false,
        'show_in_menu'       => true,
        'show_ui'            => true,
        'menu_icon'          => 'dashicons-groups'
    );
    register_post_type( 'team', $args );
    
    
    $args = array(
        'public'                => true,
        'label'                 => __( 'Testimonials' ),
        'supports'              => array('title', 'thumbnail', 'excerpt'),
        'public'                => false,
        'show_in_menu'          => true,
        'show_ui'               => true,
        'menu_icon'             => 'dashicons-welcome-write-blog'
    );
    register_post_type( 'testimonials', $args );
    
    
    $args = array(
        'public'    => true,
        'label'     => __( 'Our Work' ),
        'supports'  => array('title','editor', 'thumbnail', 'excerpt'),
        'public'    => true,
        'menu_icon' => 'dashicons-hammer'
    );
    register_post_type( 'works', $args );
}
add_action( 'init', 'register_custom_post_type' );