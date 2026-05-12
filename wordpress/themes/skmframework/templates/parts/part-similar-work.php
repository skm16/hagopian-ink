<div class="template-part similar-work">
    <div class='container'>
        <div class='part-name text-center'>SIMILAR WORK</div>
        
        <div class='row'>
            
            <?php
            global $post;
            $term = wp_get_post_terms( $post->ID, 'work')[0];
            $slug =  wp_get_post_terms( $post->ID, 'work')[0]->slug;
            
            
            
            $args = array(
                'post_type'         => 'works',
                'posts_per_page'    => 4,
                'orderby'           => 'rand',
                'post__not_in' => array($post->ID), 
                'tax_query' => array(
                    array (
                        'taxonomy'  => 'work',
                        'field'     => 'slug',
                        'terms'     => $slug,
                    )
                )
            );

            $query = new WP_Query( $args );

            if ( $query->have_posts() ) {

                while ( $query->have_posts() ) {
                    $query->the_post();
                    ?>
                        <div class='post col-xs-6 col-sm-6 col-md-3'>
                            <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>" >
                                <?php if ( has_post_thumbnail()) { ?>
                                    <?php the_post_thumbnail( 'thumbnail-work' ); ?>
                              <?php } ?>
                                <div class='title'>
                                <?php
                                    the_title();
                                ?>
                                </div>
                            </a>
                        </div>
                    <?php
                }

            }
            wp_reset_postdata();
            
            ?>
        </div>
        <div class='text-center prev-cat'>
            <a href="<?php echo get_term_link($term); ?>" class="all-our-works-link">
                &nbsp
            </a>
        </div>
    </div>
</div>