</main>

<?php
    if( is_tax( 'work' ) ) {
        ?>
            <script>
                jQuery("html, body").animate({
                    scrollTop: jQuery(".container.taxonomy-list").offset().top
                },"slow");
            </script>
        <?php
    }
?>


<footer id="site-footer">
    <div class="container">

        <div class="container-left">
            <a href="<?php echo home_url(); ?>">
               <?php
                    if( !empty( get_field( 'logo', 'options' ) ) ) {
                        echo "<img src='".get_field( 'logo', 'options' )."'>";
                    }
               ?>
            </a>
        </div>
        <div class="container-right">
           <?php
                if( !empty( get_field( 'menu', 'options' ) ) ) {
                    echo "<span class='menu-in-footer'>";

                    foreach ( get_field( 'menu', 'options' ) as $key => $link ) {
                        echo "<a href='".$link['link']['url']."' ".( ( !empty( $link['link']['target'] ) ) ? ' target="_blank" ' : '' ).">".$link['link']['title']."</a>";
                    }
                    echo "</span>";
                }

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
    </div>
</footer>
<style>
    @media only screen and ( max-width: 782px ) {
        html {
                margin: 0px !important;
        }
    }
</style>

<div id="back-to-top">
    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/public/img/up-arrow.png" alt="go to top" />
</div>

<?php wp_footer(); ?>

</body>
</html>
