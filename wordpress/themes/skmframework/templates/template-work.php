<?php
/*
 Template Name: Our Work
*/

get_header();


get_template_part( 'templates/template', "work-menu" );
    
?>
<div class='template-part posts'>
<div class='container'>
    <div class='row'>

        <div class='col-xs-12'>
    

        <?php
        $paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
        $args = array(
            'post_type' => 'works',
            'posts_per_page' =>  -1 //(int)get_option( "posts_per_page" )
            //'paged'     => $paged 
        );

        $query = new WP_Query( $args );

        if ( $query->have_posts() ) {

            echo '<div class="posts-grid">';

            while ( $query->have_posts() ) {
                $query->the_post();
                ?>
                    <div class='post'>
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
            echo '</div>';
        }
        ?>
        </div>
    </div>
    
<!--    <div class="pagination text-center">
        <?php 
            echo paginate_links( array(
                'base'         => str_replace( 999999999, '%#%', esc_url( get_pagenum_link( 999999999 ) ) ),
                'total'        => $query->max_num_pages,
                'current'      => max( 1, get_query_var( 'paged' ) ),
                'format'       => '?paged=%#%',
                'show_all'     => false,
                'type'         => 'plain',
                'end_size'     => 2,
                'mid_size'     => 1,
                'prev_next'    => true,
                'prev_text'    => sprintf( '<i></i> %1$s', __( 'Prev' ) ),
                'next_text'    => sprintf( '%1$s <i></i>', __( 'Next' ) ),
                'add_args'     => false,
                'add_fragment' => '',
            ) );
        ?>
    </div>-->
</div>
<?php
wp_reset_postdata();
 
?>
    
</div>


<?php
    if( have_rows('template_part') ):
            while ( have_rows('template_part') ) : the_row();
                    get_template_part( 'templates/parts/part', get_row_layout() );
            endwhile;
    endif;
get_footer();
