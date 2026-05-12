<div class="template-part slidebar-posts">
    <?php
        echo "<div class='part-title'>From instagram</div>";
        foreach ( get_field( "posts", get_option( 'page_for_posts' ) ) as $key => $post) {
            echo "<article class='slidebar-post'>";
                echo "<div><img src='".$post['image']."'></div>";
                
                echo "<div class='post-link'>";
                echo "<a href='".$post['link']['url']."' ".( ( !empty( $post['link']['target'] ) ) ? ' target="_blank" ' : '' )." class='link'>".$post['link']['title']."</a>";
                echo "</div>";
            echo "</article>";
        }
    ?>
</div>