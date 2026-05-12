<div  class="template-part contact_form <?php  echo "bg-".get_sub_field( 'background_color' ); if ( get_sub_field( 'display_form' ) == "yes" ) echo " open_form"; else echo " close_form"; ?>">
    <div class="container">
        <?php
        
            if( !empty( get_sub_field( 'title' ) ) ) {
                echo "<div class='part-title'>".get_sub_field( 'title' )."</div>";
            }
            
            if( !empty( get_sub_field( 'subtitle' ) ) ) {
                echo "<div class='part-subtitle'>".get_sub_field( 'subtitle' )."</div>";
            }
            
            if( !empty( get_sub_field( 'form' ) ) ) {
                echo "<div class='row'>";
                
                    echo "<div class='col-sm-6 col-xs-12'>";
                    
                        if( !empty( get_sub_field( 'text_befor_contact_form' ) ) ) {
                            echo "<div class='description-contact-form'>".get_sub_field( 'text_befor_contact_form' )."</div>";
                        }
                        
                        gravity_form( 1, false, false, false, '', false );

                        echo "<div class='contact-info'>";
                            if( !empty( get_sub_field( 'phone' ) ) ) {
                                echo "<div class='phone'><a href='tel:".preg_replace( "/[^,.0-9]/", '', get_sub_field( 'phone' ) )."'>".get_sub_field( 'phone' )."</a></div>";
                            }                        
                            if( !empty( get_sub_field( 'email' ) ) ) {
                                echo "<div class='email'><a href='mailto:".get_sub_field( 'email' ).( ( get_sub_field( 'email_subject' ) ) ? "?subject=".get_sub_field( 'email_subject' ) : "" )."'>".get_sub_field( 'email' )."</a></div>";
                            }
                        echo "</div>";
                    echo "</div>";
                    
                    $author = get_sub_field( 'testimonials' ); //get_sub_field( 'testimonials' )[0]->post_excerpt
            
                    echo "<div class='col-sm-6 col-xs-12'>";
                        echo "<div class='quote'>";
                            echo "<div class='img-author'>";

                                echo '<img src="'.get_stylesheet_directory_uri().'/assets/public/img/quote.svg" class="img_quote">';
                                
                                if( get_the_post_thumbnail_url( $author[0] ) ) {
                                    echo "<img src='".get_the_post_thumbnail_url( $author[0] )."' class='img_author'>";
                                }
                                
                            echo "</div>";
                            
                            echo "<div class='text'><span class='quote_author'>";
                                if( $author[0]->post_excerpt ) {
                                    echo $author[0]->post_excerpt;
                                        echo "<div class='span'>";
                                        echo get_the_title($author[0]->ID);
                                        echo "</div>";
                                    
                                }
                            echo "</span></div>";
                            
                        echo "</div>";
                    echo "</div>";
                
                echo "</div>";
            }
            
        ?>
        
        <script>
            jQuery(document).ready( function() {      
                $ = jQuery;
                
                var end = false;
                
                function fadeInImg(){
                    
                    $('.img_author').fadeIn( 1000 );

                    setTimeout(function() { 
                        $('.img_quote').fadeIn( 1000 ); 
                        
                        setTimeout(function() { 
                            $('.quote_author').animate({height: 'show'}, 500);
                            $('.quote .span').fadeIn( 500 );
                            end = true;
                        }, 500);
                        
                    }, 500);
                }
                
                $(document).scroll(function(){
                    
                    if( !end ) {
                        var scrollTop = $(window).scrollTop();
                        var windowHeight = $(window).height();
                        var $objPositionTop = jQuery(".template-part.contact_form .row").offset().top;

                        if( ( ( scrollTop + windowHeight - 150 ) >= $objPositionTop ) )  {
                            fadeInImg();
                        }
                    }
                });
                
                
                jQuery(document).ready(function($) {
                    var $originalButton = $("#gform_submit_button_1");

                    var $openButton = $("<span>")
                        .attr("id", "open_form_button")
                        .addClass("gform_button button open-form-btn")
                        .text("GET IN TOUCH");

                    $originalButton.before($openButton);
                    $originalButton.hide();

                    $openButton.on("click", function() {
                        var $parent = $(this).closest(".template-part.contact_form");
                        var $body = $parent.find(".gform_body");
                        $body.stop(true, true).slideDown(400);
                        $parent.removeClass("close_form").addClass("open_form");
                        $(this).fadeOut(300, function() {
                            $originalButton.fadeIn(300);
                        });
                    });
                });
            });
        </script>
    </div>
</div>

<style>
    #open_form_button {
        font-family: Sackers Gothic Std;
        background-color: #000;
        color: #fff;
        font-size: 13px;
        height: 40px;
        line-height: 40px;
        margin-bottom: 58px;
        margin-right: 0;
        padding: 0 29px !important;
    }
</style>