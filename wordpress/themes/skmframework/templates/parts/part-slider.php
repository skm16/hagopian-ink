<?php
 $rand_id = rand(1, 1000);
?>

<div class="template-part slides" id='slides-<?php echo $rand_id; ?>'>
    <?php
        if( get_sub_field( 'images' ) ) {            
            foreach ( get_sub_field( 'images' ) as $key => $image ) {
                echo "<img src='".$image['image']."' class='slide ".( ( $key == 0) ? "showing" : "" )."'>";
            }
        }
    ?>
    
    <div class='slides-button'>
        <?php
            for( $i = 1; $i <= count( get_sub_field( 'images' ) ); $i++ ) {
                echo "<span class='button ".( ( $i == 1 ) ? "current" : "" )."'></span>";
            }
        ?>
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