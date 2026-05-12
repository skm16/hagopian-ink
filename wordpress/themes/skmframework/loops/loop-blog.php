<?php
$post_id = get_option( 'page_for_posts' );
if( have_rows( 'template_part_header', $post_id ) ):
  while ( have_rows( 'template_part_header', $post_id) ) : the_row();
    get_template_part( 'templates/parts/part', get_row_layout() );
  endwhile;
endif;

global $wp;
$current_page_link = trailingslashit( home_url( $wp->request ) );
?>

<div class="wrap page-blog">
  <?php
  
  if(is_blog()) { ?>

    <?php $categories = get_field('blog_categories', get_option( "page_for_posts" ) ); if($categories) { ?>
      <div class="blog-terms-wrap">
        <div class="container hidden-below-800">
          <div class="row">
            <div class="col-xs-12 text-center">
              <ul>

                <li <?php echo ( get_permalink( get_option( 'page_for_posts' ) ) == $current_page_link ) ? "class='current_link'": ""; ?>><a href="<?php echo get_permalink( get_option( 'page_for_posts' ) ); ?>">View All</a></li>

                <?php foreach($categories as $term): ?>

                  <li <?php echo ( get_term_link($term->term_id) == $current_page_link ) ? "class='current_link'": ""; ?> ><a href="<?php echo get_term_link($term->term_id); ?>"><?php echo $term->name; ?></a></li>

                <?php endforeach; ?>

              </ul>

    


            </div>
          </div>
        </div>

        <div class="container taxonomy-list blog-cat-list-mobile text-center hidden-above-800">
          <ul>

            <li <?php echo ( get_permalink( get_option( 'page_for_posts' ) ) == $current_page_link ) ? "class='current'": ""; ?>><a href="<?php echo get_permalink( get_option( 'page_for_posts' ) ); ?>">View All</a>
            <a href="javascript:void(0);" class="menu-tax-work"></a>
            </li>

            <?php foreach($categories as $term): ?>

              <li <?php echo ( get_term_link($term->term_id) == $current_page_link ) ? "class='current'": ""; ?> ><a href="<?php echo get_term_link($term->term_id); ?>"><?php echo $term->name; ?></a></li>

            <?php endforeach; ?>

          </ul>

        </div>

      </div>
    <?php } ?>

    <?php
  }
  ?>


  <div class="container">
    
    <div class="row">
      <div class="<?php if ( is_active_sidebar( 'archive-sidebar' ) ) : echo 'col-md-8'; else: echo 'col-sm-12'; endif; ?>">
        <div class="article-roll-wrapper">
          <?php $i = 0; if ( have_posts() ) : while ( have_posts() ) : the_post(); $i++; ?>
          <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <div class="row">
              <?php if ( has_post_thumbnail() ) : ?>
                <div class="col-md-7 <?php if($i % 2 == 0): echo 'pull-right'; endif; ?>">
                  <a class="post-thumb-wrap dynamic-rectangle <?php if(!$i % 2 == 0): echo 'ml25'; endif; ?>" href="<?php the_permalink(); ?>" title="Link to <?php the_title(); ?>" style="background-image:url(<?php echo get_the_post_thumbnail_url( $post->ID, 'full' ); ?>);"></a>
                </div>

              <?php endif; ?>
              <div class="block-after-image col-md-5 <?php if($i % 2 == 0): echo 'pull-left'; endif; ?>"">
                <header class="post-roll-title">
                  <h3>
                    <a href="<?php the_permalink(); ?>" title="Link to <?php the_title(); ?>">
                      <?php the_title(); ?>
                    </a>
                  </h3>
                  <div class="excerpt">
                    <?php if(get_the_content() != ''):
                      the_excerpt();
                    else:
                     echo return_excerpt_from_flex_content();                  
                   endif; ?>
                  </div>
                </header>
              </div>
              
            </div>
          </article>
        <?php endwhile; ?>
        <?php if(skmframework_show_posts_nav()): ?>
          <?php the_posts_pagination(); ?>
        <?php endif; ?>
        <?php else: echo '<h2>Sorry no posts found!</h2>'; endif; ?>
      </div>
    </div>
    <?php get_sidebar(); ?>
  </div>
</div>
</div>
<?php
if( have_rows( 'template_part', $post_id ) ):
  while ( have_rows( 'template_part', $post_id) ) : the_row();
    get_template_part( 'templates/parts/part', get_row_layout() );
  endwhile;
endif;
?>