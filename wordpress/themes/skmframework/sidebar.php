<?php
    echo '<aside class="sidebar archive-sidebar col-md-4">';
        echo "<div class='blog-search'>";
            dynamic_sidebar('archive-sidebar');
        echo "</div>";
        
        echo "<div class='other-sidebar'>";
            dynamic_sidebar( 'post-sidebar' );
        echo "</div>";
        
    echo '</aside>';