<div class='template-part header-single-work'>
    <div class='container'>
        <?php
            if( !empty( get_sub_field( 'title' ) ) ) {
                echo "<div class='single-title text-center'>".get_sub_field( 'title' )."</div>";
            }
            /*if( !empty( get_sub_field( 'links' ) ) ) {
                echo "<div class='single-subtitle text-center'>";

                foreach ( get_sub_field( 'links' ) as $key => $case ) {
                    
                    if( $key != 0 ) {
                        echo " • ";
                    }
                    
                    echo "<a href='".$case['link']['url']."' ".( ( !empty( $case['link']['target'] ) ) ? ' target="_blank" ' : '' )." >".$case['link']['title']."</a>";

                }
        
                echo "</div>";
            }*/ ?>

    
            <?php $terms = wp_get_post_terms($post->ID, 'work'); if($terms):
            
                $i = 0;
                $num_of_terms = count($terms);

                echo '<div class="single-subtitle text-center">';
                foreach($terms as $term): $i++;

                    if($i == $num_of_terms):

                        echo '<a href="'.get_term_link($term).'">'.$term->name.'</a>';

                    else:

                        echo '<a href="'.get_term_link($term).'">'.$term->name.'</a>, ';

                    endif;

                endforeach;

                    $terms = wp_get_post_terms($post->ID, 'tag'); if($terms):

                        $i = 0;
                        $num_of_terms = count($terms); 

                        $work_url = get_site_url().'work';
                
                        echo " • ";

                        foreach($terms as $term): $i++;

                             if($i == $num_of_terms):

                                echo '<span>'.$term->name.'</span>';

                            else:

                                echo '<span>'.$term->name.'</span>, ';

                            endif;

                        endforeach;

                    endif;


                echo '</div>';

            endif; ?>



            
            
            <?php if( is_single() ) {
                global $post;
                if( $post->post_type == 'works' ) {
                    $cat = 'work';
                } else {
                    $cat = 'category';
                }

                $term = wp_get_post_terms( $post->ID, $cat)[0];
                echo '<a href="'.get_term_link($term).'" class="all-our-works-link">
                    &nbsp
                </a>';
            }
        ?>
    </div>
</div>