<?php
 $rand_id = rand(1, 1000);
?>

<div  class="template-part our_blog" id='slides-<?php echo $rand_id; ?>'>
    <div class="container text-center">
        <?php
            if( !empty( get_sub_field( 'title' ) ) ) {
                echo "<div class='part-title'>".get_sub_field( 'title' )."</div>";
            }
            
            if( !empty( get_sub_field( 'link' ) ) ) {
                $link = get_sub_field( 'link' );
                echo "<a href='".$link['url']."' ".( ( !empty( $link['target'] ) ) ? ' target="_blank" ' : '' )." class='button' >".$link['title']."</a>";
            }
            
            $args = array(
                    'numberposts'      => 3,
                    'offset'           => 0,
                    'category'         => 0,
                    'orderby'          => 'post_date',
                    'order'            => 'DESC',
                    'include'          => '',
                    'exclude'          => '',
                    'meta_key'         => '',
                    'meta_value'       => '',
                    'post_type'        => 'post',
                    'post_status'      => 'draft, publish, future, pending, private',
                    'suppress_filters' => true,
            ); 

            $result = wp_get_recent_posts( $args );
            
            if( $result ) {
                echo "<div class='row posts slides'>";
                
                foreach( $result as $key => $post ){
                    echo "<div class='col-sm-4 slide ".( ( $key == 0) ? "showing" : "" )."'>";
                        echo "<img src='".get_the_post_thumbnail_url( $post['ID'] )."' class='post_thumbnail hidden-sm hidden-md hidden-lg'>";
                        echo '<div class="post-thumb-wrap dynamic-rectangle hidden-xs" style="background-image:url('.get_the_post_thumbnail_url( $post['ID'] ).')"></div>';
                        echo "<div class='post_title'>"."<a href='".get_permalink( $post['ID'] )."' class='post_link'> ".$post['post_title']."</a></div>";
                        echo "<a href='".get_permalink( $post['ID'] )."' class='post_link'> "
                                ."<span class='title_post_link'>Read more</span>"
                        . "</a>";
                    echo "</div>";
                    
                }
                

                echo "</div>";
            }
        ?>
        
            
    <div class='slides-button'>
        <?php
            for( $i = 1; $i <= count( $result ); $i++ ) {
                echo "<span class='button ".( ( $i == 1 ) ? "current" : "" )."'></span>";
            }
        ?>
    </div>
    </div>
</div>

<script>
    var timerId = setInterval(function() {
        var current_button = jQuery( "#slides-"+<?php echo $rand_id; ?>+" .button.current" );
        
        if( jQuery( current_button ).next('.button').length == 0 ) {
            jQuery( "#slides-"+<?php echo $rand_id; ?>+" .slides-button > .button:first-child" ).click();
        } else {
            jQuery( current_button ).next().click();
        }
      }, 3000);
</script>