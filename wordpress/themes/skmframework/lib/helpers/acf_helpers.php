<?php 
// get acf image field attributes
function skm_get_acf_image_with_atts($image, $image_size, $class, $id) {
    if( !empty($image) ):
        $url = $image['url'];
        $title = $image['title'];
        $alt = $image['alt'];
        $id = $image['ID'];
        $size = $image_size;
        if($image_size === 'full'):
            $thumb = $image['url'];
            $width = $image['width'];
            $height = $image['height'];
        else:
            $thumb = $image['sizes'][ $size ];
            $width = $image['sizes'][ $size . '-width' ];
            $height = $image['sizes'][ $size . '-height' ];
        endif;
    $custom_classes = '';
    $image = '<img src="'.$thumb.'" alt="'.$alt.'" height="'.$height.'" id="'.$id.'" width="'.$width.'" title="'.$title.'" class="'.$class.'"  />';
    return $image;
    else:
        return '<img src="'.get_stylesheet_directory_uri().'/assets/public/images/no-image.jpg" alt="'.$alt.'" height="121" width="120" title="No image available" class="no-image-available"  />';
    endif;
};

// get acf image field url
function skm_get_acf_image_url($image, $image_size) {
    if( !empty($image) ):
        if($image_size == 'full' || $image_size == ''):
            $url = $image['url'];
        else:
            $url = $image['url'];
            $size = $image_size;
            $thumb = $image['sizes'][ $size ];
        endif;
   return $thumb;
  endif;
};

// acf register options page
if( function_exists('acf_add_options_page') ) {
    acf_add_options_page();
}


function custom_field_excerpt($text) {
    global $post;
    if ( '' != $text ) {
        $text = strip_shortcodes( $text );
        $text = apply_filters('the_content', $text);
        $text = str_replace(']]&gt;', ']]&gt;', $text);
        $excerpt_length = 35; // 20 words
        $excerpt_more = apply_filters('excerpt_more', ' ' . '[...]');
        $text = wp_trim_words( $text, $excerpt_length, $excerpt_more );
    }
    return apply_filters('the_excerpt', $text);
}

function return_excerpt_from_flex_content() {
    global $post;
    $content_layouts = array();
    $layouts = get_field('post_builder', $post->ID); 
     if($layouts): 
      foreach($layouts as $layout):
        if($layout['acf_fc_layout'] === 'full_width_column_wysiwyg' || $layout['acf_fc_layout'] === '2_column_wysiwyg' || $layout['acf_fc_layout'] === '3_column_wysiwyg'):
          $content_layouts[] = $layout;
        endif;
      endforeach;    
     endif;
     $first_content_layout = $content_layouts[0];
     $first_content_layout_content = $first_content_layout["wysiwyg"];
     return custom_field_excerpt($first_content_layout_content);  
}