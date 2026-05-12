<?php

global $wp;
$current_url = home_url( $wp->request )."/";
$terms = get_terms('category');
$current_term = get_query_var('term');

echo '<ul>';
echo '<li '.( ( $current_url == get_permalink( get_option( 'page_for_posts' ) ) ) ? 'class="current"' : ""  ).'><a href="'.get_permalink( get_option( 'page_for_posts' ) ).'">JOURNAL</a> <a href="javascript:void(0);" class="menu-tax-work"></a></li>';

//    echo "<span class='tax-menu-work'>";
        foreach ($terms as $term) {
            $url = get_term_link($term);
            echo '<li '.( ( $current_url == $url ) ? 'class="current"' : ""  ).' ><a href="'.$url.'">'.$term->name.'</a></li>';
        }
//    echo "</span>";

echo '</ul>';