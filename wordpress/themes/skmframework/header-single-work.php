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
    <main>
