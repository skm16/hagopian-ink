<div class='template-part expertise'>
    <div class='container'>
        <?php
            if( !empty( get_sub_field( 'title' ) ) ) {
                echo "<div class='part-title'>".get_sub_field( 'title' )."</div>";
            }
        ?>   
        
        
        <?php
            if( !empty( get_sub_field( 'block' ) ) ) {
        ?>    
                <div class='row'>
                    <?php
                        foreach ( get_sub_field( 'block' ) as $key => $block ) {
                            ?>
                                <div class='col-sm-4'>
                                    <?php
                                        if( $block['icon'] ) {
                                            echo "<div class='icon' style='background-image: url(".$block['icon']['url'].");'></div>";
                                        }
                                        
                                        if( $block['title'] || $block['description'] ) {
                                            echo "<div class='data'>";
                                                if( !empty( $block['title'] ) ) {
                                                    echo "<div class='title'>".$block['title']."</div>";
                                                }
                                                if( !empty( $block['description'] ) ) {
                                                    echo "<div class='description'>".$block['description']."</div>";
                                                }
                                            echo "</div>";
                                        }
                                    ?>
                                </div>
                            <?php
                        }
                    ?>
                </div>
        <?php
            }
            
            if( !empty( get_sub_field( 'link' ) ) ) {
                $link = get_sub_field( 'link' );
                echo "<div class='container text-center'>"
                . "<a href='".$link['url']."' ".( ( !empty( $link['target'] ) ) ? ' target="_blank" ' : '' )." class='button' >".$link['title']."</a>"
                . "</div>";
            }
        ?>    
            

    </div>
</div>
    
    