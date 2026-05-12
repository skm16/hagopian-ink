<div  class="template-part subscription_form">
    
    <video autoplay="" class="l_o_h" data-automation="VideoPlayer_video_video" loop="" muted="" playsinline="" poster="<?php echo get_sub_field( "subscription_form_background_img" ); ?>">
        <?php
        
            if( get_sub_field( "subscription_form_video_webm" ) ) {
                echo '<source src="'.get_sub_field( "subscription_form_video_webm" ).'" type="video/webm">';
            }
            if( get_sub_field( "subscription_form_video_mp4" ) ) {
                echo '<source src="'.get_sub_field( "subscription_form_video_mp4" ).'" type="video/mp4">';
            }
        ?>
    </video>
        
    <div class="container">
        <?php
            if( !empty( get_sub_field('title') ) ) {
                echo "<div class='subscription_form_title'>".get_sub_field('title')."</div>";
            }
            
            if( !empty( get_sub_field('subtitle') ) ) {
                echo "<div class='subscription_form_subtitle'>".get_sub_field('subtitle')."</div>";
            }

            if( get_sub_field('form') ) {
                echo do_shortcode( get_sub_field('form') );
            }
        ?>
    </div>
</div>