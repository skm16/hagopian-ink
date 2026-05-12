<div  class="template-part subscription_form">
    
    <video autoplay="" class="l_o_h" data-automation="VideoPlayer_video_video" loop="" muted="" playsinline="" poster="<?php echo get_field( "subscription_form_video_mp4", "options" ); ?>">
        <?php
        
            if( get_field( "subscription_form_video_webm", "options") ) {
                echo '<source src="'.get_field( "subscription_form_video_webm", "options" ).'" type="video/webm">';
            }
            if( get_field( "subscription_form_video_mp4", "options" ) ) {
                echo '<source src="'.get_field( "subscription_form_video_mp4", "options" ).'" type="video/mp4">';
            }
        ?>
    </video>
        
    <div class="container">
        <?php
            if( !empty( get_field('subscription_form_title', 'options') ) ) {
                echo "<div class='subscription_form_title'>".get_field('subscription_form_title', 'options')."</div>";
            }
            
            if( !empty( get_field('subscription_form_subtitle', 'options') ) ) {
                echo "<div class='subscription_form_subtitle'>".get_field( 'subscription_form_subtitle', 'options' )."</div>";
            }

            if( get_field('subscription_form_form', 'options') ) {
                echo do_shortcode( get_field('subscription_form_form', 'options') );
            }
        ?>
    </div>
</div>