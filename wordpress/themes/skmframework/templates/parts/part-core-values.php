<div  class="template-part core-values">
    <div class='container'>
        <?php
            if( !empty( get_sub_field( 'title' ) ) ) {
                echo "<div class='part-title'>".get_sub_field( 'title' )."</div>";
            }
            
            
            if( !empty( get_sub_field( 'core_value' ) ) ) {
                
                echo "<div class='core-values parallax' data-paroller-factor='0.1' data-paroller-type='foreground'>";
                foreach ( get_sub_field( 'core_value' ) as $key => $value ) {
                ?>
                    <div class='core_value'>
                        <?php
                            if( $value['title'] ) {
                                echo "<div class='core-title'>".$value['title']."</div>";
                            }
                            if( $value['image'] ) {
                                echo "<div class='core-image' style='background-image: url(".$value['image'].");'></div>";
                            }
                        ?>
                    </div>
                <?php
                }
                echo "</div>";
                
            }
        ?>
    </div>
</div>