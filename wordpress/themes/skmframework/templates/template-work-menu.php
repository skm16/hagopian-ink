<?php

$current_term = get_query_var('term');

$current_url = get_permalink();

echo "<div class='container text-center taxonomy-list ".( ( is_tax( 'work' ) ) ? " open " : "" )." '>";
    $terms = get_terms('work');
    
    echo '<ul>';
    echo '<li '.( ( $current_url == get_permalink( PAGE_ID_WORK ) ) ? 'class="current"' : ""  ).'><a href="'.get_permalink( PAGE_ID_WORK ).'">VIEW ALL</a> <a href="javascript:void(0);" class="menu-tax-work '.( ( is_tax( 'work' ) ) ? " open " : "" ).' "></a></li>';
        foreach ($terms as $term) {
            echo '<li '.( ( $current_term == $term->slug ) ? 'class="current"' : ""  ).' ><a href="'.get_term_link($term).'">'.$term->name.'</a></li>';
        }
    echo '</ul>';
    
    if( $current_term ) {
        
        global $posts;
        global $post_tags;
        global $post_tags_slug;
        $_tags = array();
        $post_tags = array();
        $post_tags_slug = array();
        
        
        foreach ( $posts as $key => $post ) {
            $term_list = wp_get_post_terms( $post->ID, 'tag', array("fields" => "all"));
            foreach ( $term_list as $key => $value ) {
                $name = $value->name;
                $value = $value->slug;
                
                if( !in_array($value, $_tags) ) {
                    array_push($_tags, $value);
                }
                
                if( !$post_tags[$post->ID] ) {
                    $post_tags[$post->ID] = array();
                }
                
                if( !$post_tags_slug[$value] ) {
                    $post_tags_slug[$value] = $name;
                }
                
                array_push($post_tags[$post->ID], $value);
            }
        }
        
        echo '<ul id="filters" class="button-group">';
            echo '<li class="current"><a href="javascript:void(0);" class="button_filter" data-filter="*">ALL</a></li>';
            foreach ($_tags as $key => $value) {
                echo '<li><a href="javascript:void(0);" class="button_filter" data-filter=".'.$value.'">'.$post_tags_slug[$value].'</a></li>';
            }
        echo '</ul>';
    }
    
echo "</div>";