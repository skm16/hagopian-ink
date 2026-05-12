<?php

$cats = array();
$categories = get_the_category();
if($categories):
  foreach($categories as $cat):
    $cats[] = $cat->term_id;
  endforeach;
endif;
?>


<div class="wrap single-post">
 <div class="container">


  <div class="single-post-masthead">
    <div class="row">
      <div class="col-xs-12 text-center">
        <h4>Fresh Ink</h4>
        <div class="cats">
          <?php the_category(', '); ?>
        </div>
        <div class="date">
          <?php echo get_the_date(); ?>
        </div>
        <div class="author">
          Author: <?php the_author(); ?>
        </div>
      </div>
    </div>
  </div> 

  <header class="single-post-title text-center">
    <div class="row">
      <div class="col-xs-12 text-center">
        <div class="container-600">
          <h1><?php the_title(); ?></h1>
        </div>
        <?php if(get_field('journal_short_desc')): ?>
          <h2><?php the_field('journal_short_desc'); ?></h2>
        <?php elseif(get_field('journal_post_subtitle')): ?>
          <h2><?php the_field('journal_post_subtitle'); ?></h2>
        <?php endif; ?>
      </div>
    </div>
  </header>

  <div class="row">
   <div class="col-md-12">
    <div class="single-post-wrapper">
     <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

      <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>


        <?php if(get_field('journal_post_banner')): $img = get_field('journal_post_banner'); ?>
          <div class="single-post-featured-image">

            <img src="<?php echo $img['url']; ?>" alt="<?php echo $img['alt']; ?>" />

          </div>
        <?php endif; ?>

        <?php if(get_field('featured_image_two')): $img = get_field('featured_image_two'); ?>
          <div class="single-post-featured-image">

            <img src="<?php echo $img['url']; ?>" alt="<?php echo $img['alt']; ?>" />

          </div>
        <?php endif; ?>

        <div class="single-post-content">
         <?php if(post_password_required()):
          echo skmframework_password_form();
        else:
          if(get_the_content() != ''):
            the_content();
          else:
            get_template_part('loops/loop', 'post-builder');
          endif;
          ?>
        <?php endif; ?>
      </article>

    <?php endwhile; ?>
    <?php else: ?>
      <?php if ( is_home() && current_user_can( 'publish_posts' ) ) : ?>
      <p><?php printf( __( 'Ready to publish your first post? <a href="%1$s">Get started here</a>.', 'skmframework' ), esc_url( admin_url( 'post-new.php' ) ) ); ?></p>
      <?php else : ?>
       <p><?php _e( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'skmframework' ); ?></p>
       <?php get_search_form();
     endif; ?>
   <?php endif; ?>



 </div>
</div>
</div>
</div>



<div class="single-posts-related-posts">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 text-center">
        <h4>Past Posts</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <div class="container-881 related-posts-wrap">

          <?php $current_post_date = get_the_date();
          $args = array(
            'post_type' => 'post',
            'posts_per_page' => 2,
            'date_query' => array(
              array(
                'before' => $current_post_date
              )
            ),
          ); $the_query = new WP_Query( $args ); if ( $the_query->have_posts() ) : while ( $the_query->have_posts() ) : $the_query->the_post(); ?>


            <div class="single-related-post">

              <a href="<?php echo get_permalink($post->ID); ?>" title="Link to <?php echo get_the_title($post->ID); ?>" class="dynamic-rectangle post-thumb-wrap" style="background-image:url(<?php echo get_the_post_thumbnail_url($post->ID,'full'); ?>); ?>"></a>

              <h4><a href="<?php echo get_permalink($post->ID); ?>" title="Link to <?php echo get_the_title($post->ID); ?>"><?php echo get_the_title($post->ID); ?></a></h4>

              
            </div>



        <?php endwhile; endif; wp_reset_postdata(); ?>

          
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 text-center">
        <a href="<?php echo get_permalink( get_option( 'page_for_posts' ) ); ?>" title="Link to all posts" class="back-to-posts-link"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/public/img/prev.png" alt="Back button" /></a>
      </div>
    </div>
  </div>
</div>



<?php if( have_rows('template_part') ):
  while ( have_rows('template_part') ) : the_row();
    get_template_part( 'templates/parts/part', get_row_layout() );
  endwhile;
endif; ?>

<div  class="template-part subscription_form">

  <video autoplay="" class="l_o_h" data-automation="VideoPlayer_video_video" loop="" muted="" playsinline="" poster="<?php echo get_field( "subscription_form_video_mp4", "options" ); ?>">
    <?php

    if( get_field( "subscription_form_video_webm", "options") ) {
      echo '<source src="'.get_field( "subscription_form_video_webm", "options" ).'" type="video/webm">';
    }
    if( get_field( "subscription_form_video_mp4", "options" ) ) {
      echo '<source src="'.get_field( "subscription_form_video_mp4", "options" ).'" type="video/mp4">';
    }
    ?>
  </video>

  <div class="container">
    <?php
    if( !empty( get_field('subscription_form_title', 'options') ) ) {
      echo "<div class='subscription_form_title'>".get_field('subscription_form_title', 'options')."</div>";
    }

    if( !empty( get_field('subscription_form_subtitle', 'options') ) ) {
      echo "<div class='subscription_form_subtitle'>".get_field( 'subscription_form_subtitle', 'options' )."</div>";
    }

    if( get_field('subscription_form_form', 'options') ) {
      echo do_shortcode( get_field('subscription_form_form', 'options') );
    }
    ?>
  </div>
</div>
