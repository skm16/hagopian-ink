<div class="template-part case-studies">
    <?php
		$i = 0;
        if( get_sub_field( "case" ) ) {
            global $case;
            foreach ( get_sub_field( "case" ) as $key => $case ) {
				$i++;
                if( $key+1 > 3 ) {
                    $key = 0;
                }
                
                ?>
                <div class='case-<?php echo ($key + 1); ?>' id="cs-<?php echo $i; ?>">
                <?php
                    if( $case['image']['url'] && $case['link'] ) {
                ?>
                        <div class='img <?php if( $key+1 == 3 ) { echo "container"; }?>'>
                            <?php
                            echo "<a href='".$case['link']['url']."' ".( ( !empty( $case['link']['target'] ) ) ? ' target="_blank" ' : '' ).">"."<img src='".$case['image']['url']."'></a>";
                            ?>
                        </div>
                <?php
                    }
                ?>
                <?php
                if( $key+1 == 3 ) {
                    echo "<div class='container'>";
                }
                ?>
                <div class='blocks parallax'  data-paroller-factor="0.2" data-paroller-type="foreground" >
                    <div class='first item'>
                        <?php
                            if( $case['text_top'] ) {
                        ?>
                            <div class='top-text text-center'>
                                <?php
                                    echo $case['text_top'];
                                ?>
                            </div>
                        <?php
                            }
                        ?>
                        <?php
                            if( $case['title'] ) {
                        ?>
                            <div class='title text-center'>
                                <?php
                                    echo $case['title'];
                                ?>
                            </div>
                        <?php
                            }
                        ?>
                        
                        <?php
                            if( $case['link'] ) {
                        ?>
                            <div class='link'>
                                <?php
                                    echo "<a href='".$case['link']['url']."' ".( ( !empty( $case['link']['target'] ) ) ? ' target="_blank" ' : '' )." class='link'>".$case['link']['title']."</a>";
                                ?>
                            </div>
                        <?php
                            }
                        ?>
                    </div>
                    <div class='second item' <?php echo ( $key+1 != 2 ) ? 'data-aos="fade-right"': 'data-aos="fade-down"'; ?> data-aos-offset="200" data-aos-easing="ease-in-sine">
                        <?php
                            if( $case['description'] ) {
                        ?>
                            <div class='description'>
                                <?php
                                    echo $case['description'];
                                ?>
                            </div>
                        <?php
                            }
                        ?>
                        <?php
                            if( $case['link'] ) {
                        ?>
                            <div class='link'>
                                <?php
                                    echo "<a href='".$case['link']['url']."' ".( ( !empty( $case['link']['target'] ) ) ? ' target="_blank" ' : '' )." class='link'>".$case['link']['title']."</a>";
                                ?>
                            </div>
                        <?php
                            }
                        ?>
                    </div>
                </div>
                <?php
                if( $key+1 == 3 ) {
                    echo "</div>";
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
        }
    ?>
</div>