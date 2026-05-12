<div class="template-part our-clients <?php echo ( get_sub_field( "slider" ) == "yes" ) ? "slider-active" : "slider-not-active"; ?>">
    <div class='container'>
        <?php
            if( get_sub_field( "title" ) ) {
                echo '<div class="part-title">'.get_sub_field( "title" ).'</div>';
            }
        ?>
        <div class='owl-carousel owl-theme'>

            <?php if( have_rows('client') ): while ( have_rows('client') ) : the_row(); $link = get_sub_field('link'); ?>

                <div class="item">
                     <?php if($link):
                            $url = $link['url'];
                            $target = '_self';
                            $title = 'View';
                            if($title != ''):
                               $title = $link['title']; 
                            endif; endif; ?>
                    <?php if($link): ?>
                        <a href="<?php echo $url; ?>" target="<?php echo $target; ?>"><img src="<?php the_sub_field('image'); ?>" alt="" /></a>
                    <?php else: ?>
                        <img src="<?php the_sub_field('image'); ?>" alt="" />
                    <?php endif; ?>

                    <?php if($link): ?>
                    <div class="link text-center">

                        <a href="<?php echo $url; ?>" target="<?php echo $target; ?>" class="link">View</a>

                    </div>

                    <?php endif; ?>

                </div>

            <?php endwhile; endif; ?>
        </div>
    </div>
</div>

<?php 
    if( get_sub_field( "slider" ) == "yes" ) { 
?>
    <script>
        jQuery('.owl-carousel').owlCarousel({
            loop:true,
            margin:10,
            autoplay: true,
            autoplayTimeout: 3000,
            
            responsive:{
                0:{
                    items:3
                },
                600:{
                    items:3
                },
                1000:{
                    items:6
                }
            }
        })
    </script>
<?php
    }
?>
