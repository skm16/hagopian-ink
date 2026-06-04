<?php
/**
 * Plugin Name: HagopianInk — Next.js Revalidate
 * Description: Fires a cache-revalidation webhook to hagopianink.com whenever a post or work is published or updated, so the Next.js ISR cache clears immediately.
 * Version:     1.1.0
 * Author:      Hagopian Ink
 */

defined('ABSPATH') || exit;

// ---------------------------------------------------------------------------
// Configuration — set HAGOPIANINK_REVALIDATE_SECRET in wp-config.php:
//   define('HAGOPIANINK_REVALIDATE_SECRET', 'your-secret-here');
// ---------------------------------------------------------------------------

define('HI_REVALIDATE_ENDPOINT', 'https://hagopianink.com/api/revalidate');

/**
 * Map WP post types to the tag names the Next.js route expects.
 */
function hi_tag_for_post_type(string $post_type): ?string {
    $map = [
        'post'  => 'posts',
        'works' => 'works',
    ];
    return $map[$post_type] ?? null;
}

/**
 * Fire the revalidation request.
 *
 * @param string      $tag  Next.js cache tag ('posts' or 'works').
 * @param string|null $slug Post slug for per-entry cache purge.
 */
function hi_revalidate(string $tag, ?string $slug = null): void {
    $secret = defined('HAGOPIANINK_REVALIDATE_SECRET')
        ? HAGOPIANINK_REVALIDATE_SECRET
        : '';

    if (empty($secret)) {
        error_log('[HagopianInk Revalidate] HAGOPIANINK_REVALIDATE_SECRET is not defined in wp-config.php.');
        return;
    }

    $payload = ['secret' => $secret, 'tag' => $tag];
    if ($slug) {
        $payload['slug'] = $slug;
    }

    $response = wp_remote_post(HI_REVALIDATE_ENDPOINT, [
        'headers'   => ['Content-Type' => 'application/json'],
        'body'      => wp_json_encode($payload),
        'timeout'   => 10,
        'blocking'  => false, // fire-and-forget — don't slow the WP save
    ]);

    if (is_wp_error($response)) {
        error_log('[HagopianInk Revalidate] Request failed: ' . $response->get_error_message());
    }
}

/**
 * Hook: runs after a post transitions to 'publish', or is updated while already published.
 *
 * Using transition_post_status so we catch:
 *  - draft/private → publish  (new publish)
 *  - publish → publish        (edit of existing published post)
 *  - publish → draft/trash    (unpublish / delete — also needs cache clear)
 */
add_action('transition_post_status', function (string $new_status, string $old_status, WP_Post $post): void {
    // Only care when the post is becoming or leaving 'publish'.
    $was_published = ($old_status === 'publish');
    $is_published  = ($new_status === 'publish');
    if (!$was_published && !$is_published) {
        return;
    }

    // Skip auto-drafts and revisions.
    if (wp_is_post_revision($post->ID) || wp_is_post_autosave($post->ID)) {
        return;
    }

    $tag = hi_tag_for_post_type($post->post_type);
    if (!$tag) {
        return;
    }

    hi_revalidate($tag, $post->post_name);
}, 10, 3);
