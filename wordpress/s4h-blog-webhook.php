<?php
/**
 * Plugin Name: S4H Blog Webhook
 * Description: Laat de Next.js-frontend weten dat er een blog gepubliceerd of gewijzigd is, zodat die direct live staat.
 * Version: 1.0
 * Author: Stones for Health
 *
 * INSTALLEREN
 * -----------
 * 1. Upload dit bestand naar wp-content/mu-plugins/ op admin.stonesforhealth.nl
 *    (bestaat de map mu-plugins niet, maak hem dan aan - plugins daarin zijn
 *    altijd actief en kunnen niet per ongeluk uitgezet worden)
 * 2. Zet hieronder hetzelfde geheim als BLOG_REVALIDATE_SECRET in Vercel
 * 3. Klaar - publiceren in WordPress zet de blog binnen seconden op de site
 */

if (!defined('ABSPATH')) {
    exit;
}

define('S4H_FRONTEND_URL', 'https://www.stonesforhealth.nl');
define('S4H_REVALIDATE_SECRET', 'ZET-HIER-HETZELFDE-GEHEIM-ALS-IN-VERCEL');

/**
 * Stuurt een seintje naar de frontend zodra een bericht van status verandert.
 * Draait ook bij depubliceren en prullenbak, zodat een verwijderde blog
 * net zo snel van de site verdwijnt als hij erop kwam.
 */
function s4h_ping_frontend($new_status, $old_status, $post) {
    // Alleen blogberichten; producten lopen via de WooCommerce-API
    if ($post->post_type !== 'post') {
        return;
    }

    // Niets te doen als de post noch nu, noch daarvoor gepubliceerd was
    // (zo blijft het opslaan van een concept zonder netwerkverkeer)
    if ($new_status !== 'publish' && $old_status !== 'publish') {
        return;
    }

    $url = add_query_arg(
        array('slug' => $post->post_name),
        S4H_FRONTEND_URL . '/api/revalidate-blog'
    );

    // blocking => false: de redacteur hoeft niet te wachten op de frontend
    wp_remote_post($url, array(
        'timeout'  => 5,
        'blocking' => false,
        'headers'  => array(
            'Content-Type'       => 'application/json',
            'x-revalidate-secret' => S4H_REVALIDATE_SECRET,
        ),
        'body' => wp_json_encode(array(
            'slug'   => $post->post_name,
            'status' => $new_status,
        )),
    ));
}
add_action('transition_post_status', 's4h_ping_frontend', 10, 3);

/**
 * Zet in de berichtenlijst een directe link naar de pagina op de webshop,
 * zodat de redactie niet op de WordPress-versie uitkomt.
 */
function s4h_frontend_permalink($actions, $post) {
    if ($post->post_type === 'post' && $post->post_status === 'publish') {
        $actions['s4h_view'] = sprintf(
            '<a href="%s/blog/%s" target="_blank" rel="noopener">Bekijk op webshop</a>',
            S4H_FRONTEND_URL,
            $post->post_name
        );
    }
    return $actions;
}
add_filter('post_row_actions', 's4h_frontend_permalink', 10, 2);
