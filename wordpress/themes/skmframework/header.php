<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php if (has_site_icon()): ?>
    <link rel="icon" type="image/x-icon" href="<?php echo site_icon_url(); ?>" />
    <?php endif; ?>
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <div class='mobile-menu-fixed-block'>
        <?php
            echo "<div><a href='".get_option( 'home' )."'><img src='".get_field( 'logo_menu', 'options' )."'></a></div>";
            echo "<div class='mobile-menu-button'><img src='".get_template_directory_uri()."/assets/public/img/mobile-menu.svg'></div>";
        ?>
    </div>
    
    <div class="top-header">
        <div class='logo-in-mobile-menu'>
            <?php
                echo "<div class='logo'><a href='".get_option( 'home' )."'><img src='".get_field( 'logo_menu', 'options' )."'></a></div>";
                echo "<div class='mobile-menu-button close-mobile-menu'><img src='".get_template_directory_uri()."/assets/public/img/close-menu.svg'></div>";
            ?>
        </div>

        <div class="menu">
            <?php
                echo the_custom_logo();
            ?>
            <div class="container">
                <?php
                    wp_nav_menu( "header_mane" );
                ?>
            </div>

        </div>                
        <?php                   
            if( !empty( get_field( 'social_nt', 'options' ) ) ) {
                echo "<span class='social-link-in-footer'>";

                foreach ( get_field( 'social_nt', 'options' ) as $key => $link ) {
                    if( $link['link']['url'] && $link['icon'] ) {
                        echo "<a href='".$link['link']['url']."' ".( ( !empty( $link['link']['target'] ) ) ? ' target="_blank" ' : '' )." rel='nofollow'> <img src='".$link['icon']."'> </a>";
                    }
                }
                echo "</span>";
            }
       ?>
    </div>
    
    <div class='stub-block'></div>
        
    <header id="masthead" class="masthead_<?php  echo ( get_field( "header_background_image" ) ? "is_image" : 'is_not_image') ?>">
        <?php
            if( is_blog() || is_search() ) {
                
                if( get_field( "header_background_image", get_option( "page_for_posts" ) )  || get_field( "video_webm", get_option( "page_for_posts" ) ) || get_field( "video_mp4", get_option( "page_for_posts" ) ) ) {
                ?>
                    <video autoplay="" data-automation="VideoPlayer_video_video" loop="" muted="" playsinline="" poster="<?php echo get_field( "header_background_image", get_option( "page_for_posts" ) ); ?>">
                        <?php
                            if( get_field( "video_webm", get_option( "page_for_posts" ) ) ) {
                                echo '<source src="'.get_field( "video_webm", get_option( "page_for_posts" ) ).'" type="video/webm">';
                            }
                            if( get_field( "video_mp4", get_option( "page_for_posts" ) ) ) {
                                echo '<source src="'.get_field( "video_mp4", get_option( "page_for_posts" ) ).'" type="video/mp4">';
                            }
                        ?>
                    </video>
                <?php
                }
                
            } else {

                if( get_field( "header_background_image" )  || get_field( "video_webm" ) || get_field( "video_mp4" ) ) {
        ?>
                <video autoplay="" data-automation="VideoPlayer_video_video" loop="" muted="" playsinline="" poster="<?php echo get_field( "header_background_image" ); ?>">
                    <?php
                        if( get_field( "video_webm" ) ) {
                            echo '<source src="'.get_field( "video_webm" ).'" type="video/webm">';
                        }
                        if( get_field( "video_mp4" ) ) {
                            echo '<source src="'.get_field( "video_mp4" ).'" type="video/mp4">';
                        }
                    ?>
                </video>
            <?php
                }
            }
            
            if( is_blog() || is_search() ) {
                    echo "<div class='container text-center'>";
                    
                    if( get_field( "header_subtitle", get_option( "page_for_posts" ) ) ) {
                        echo "<div class='header_subtitle'>".get_field( "header_subtitle", get_option( "page_for_posts" ) )."</div>";
                    }

                    if( get_field( "header_title", get_option( "page_for_posts" ) ) ) {
                        echo "<div class='header_title'>".get_field( "header_title", get_option( "page_for_posts" ) )."</div>";
                    } else {
                        echo "<div class='header_title'>".get_the_title()."</div>";
                    }

                    if( get_field( "header_link", get_option( "page_for_posts" ) ) ) {
                        echo "<div class='header_link'>";
                        echo "<a href='".get_field( "header_link", get_option( "page_for_posts" ) )['url']."' ".( ( !empty( get_field( "header_link", get_option( "page_for_posts" ) )['target'] ) ) ? ' target="_blank" ' : '' ).">".get_field( "header_link", get_option( "page_for_posts" ) )['title']."</a>";
                        echo "</div>";
                    }
                    
                    echo "</div>";

            } else {
                if( get_field( "header_title" ) || get_field( "header_subtitle" ) ) {
                    echo "<div class='container text-center'>";

                    if( !is_front_page() ) {
                        echo "<h2>".get_the_title()."</h2>";
                    }

                    if( get_field( "header_title" ) ) {
                        if(get_field('title_mobile')):
                            echo "<div class='header_title hidden-xs'>".get_field( "header_title" )."</div>";
                            echo "<div class='header_title hidden-sm hidden-md hidden-lg'>".get_field( "title_mobile" )."</div>";
                        else:
                            echo "<div class='header_title'>".get_field( "header_title" )."</div>";
                        endif;
                    }

                    if( get_field( "header_subtitle" ) ) {
                        echo "<div class='header_subtitle'>".get_field( "header_subtitle" )."</div>";
                    }

                    if( get_field( "header_link" ) ) {
                        echo "<div class='header_link'>";
                        echo "<a href='".get_field( "header_link" )['url']."' ".( ( !empty( get_field( "header_link" )['target'] ) ) ? ' target="_blank" ' : '' ).">".get_field( "header_link" )['title']."</a>";
                        echo "</div>";
                    }

                    echo "</div>";
                }
            }
        ?>

        <?php // if( is_front_page() ) {

        echo "<script>
                function swipe_header( id ) {
                        var swipe = jQuery(id).next();
                        if ( jQuery( swipe ).length != 0 ) {
                                jQuery('html, body').animate({ scrollTop: jQuery(swipe).offset().top }, 500);
                        }
                }
        </script>";
        echo '<div class="text-center">';
        echo '</div>';
        echo '<span id="swipe-block" onclick="swipe_header(\'#masthead\')">'
        . '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="9" viewBox="0 0 15 9"><defs><path id="lxifa" d="M715 686l5.8 5.49 5.63-5.49"/></defs><g><g transform="translate(-713 -684)"><use fill="#fff" fill-opacity="0" stroke="#000" stroke-linecap="square" stroke-miterlimit="50" stroke-width="2" xlink:href="#lxifa"/></g></g></svg>'
                . '</span>';
//        }
        ?>
        
    </header>
    
    <main>
