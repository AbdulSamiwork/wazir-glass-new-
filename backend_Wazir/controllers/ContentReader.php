<?php
/**
 * Content Reader Service
 * Queries settings, categories, products, gallery, and legal sections from MySQL.
 */

require_once __DIR__ . '/LegalReader.php';

function getDatabaseContent($pdo) {
    $stmt = $pdo->query("SELECT * FROM wazir_settings");
    $settings_rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $settings = [];
    foreach ($settings_rows as $row) {
        $settings[$row['setting_key']] = $row['setting_value'];
    }

    $hero = [
        'badge' => $settings['hero_badge'] ?? '',
        'titleLine1' => $settings['hero_titleLine1'] ?? '',
        'typedText' => $settings['hero_typedText'] ?? '',
        'description' => $settings['hero_description'] ?? '',
        'ctaText1' => $settings['hero_ctaText1'] ?? '',
        'ctaLink1' => $settings['hero_ctaLink1'] ?? '',
        'ctaText2' => $settings['hero_ctaText2'] ?? '',
        'ctaLink2' => $settings['hero_ctaLink2'] ?? '',
        'completedProjectsVal' => $settings['hero_completedProjectsVal'] ?? '',
        'completedProjectsLabel' => $settings['hero_completedProjectsLabel'] ?? '',
        'experienceVal' => $settings['hero_experienceVal'] ?? '',
        'experienceLabel' => $settings['hero_experienceLabel'] ?? '',
        'qualityVal' => $settings['hero_qualityVal'] ?? '',
        'qualityLabel' => $settings['hero_qualityLabel'] ?? ''
    ];

    $about_features = isset($settings['about_features']) ? json_decode($settings['about_features'], true) : [];
    $about = [
        'badge' => $settings['about_badge'] ?? '',
        'title' => $settings['about_title'] ?? '',
        'description1' => $settings['about_description1'] ?? '',
        'description2' => $settings['about_description2'] ?? '',
        'features' => is_array($about_features) ? $about_features : [],
        'showcaseBadge' => $settings['about_showcaseBadge'] ?? '',
        'showcaseTitle' => $settings['about_showcaseTitle'] ?? '',
        'showcaseDesc' => $settings['about_showcaseDesc'] ?? '',
        'beforeImage' => $settings['about_beforeImage'] ?? '',
        'beforeBadge' => $settings['about_beforeBadge'] ?? '',
        'beforeTitle' => $settings['about_beforeTitle'] ?? '',
        'beforeDesc' => $settings['about_beforeDesc'] ?? '',
        'afterImage' => $settings['about_afterImage'] ?? '',
        'afterBadge' => $settings['about_afterBadge'] ?? '',
        'afterTitle' => $settings['about_afterTitle'] ?? '',
        'afterDesc' => $settings['about_afterDesc'] ?? ''
    ];

    $contact = [
        'badge' => $settings['contact_badge'] ?? '',
        'title' => $settings['contact_title'] ?? '',
        'description' => $settings['contact_description'] ?? '',
        'companyName' => $settings['contact_companyName'] ?? '',
        'address' => $settings['contact_address'] ?? '',
        'phone' => $settings['contact_phone'] ?? '',
        'phoneCall' => $settings['contact_phoneCall'] ?? '',
        'email' => $settings['contact_email'] ?? '',
        'businessHours' => $settings['contact_businessHours'] ?? '',
        'whatsappNumber' => $settings['contact_whatsappNumber'] ?? '',
        'mapEmbedUrl' => $settings['contact_mapEmbedUrl'] ?? '',
        'additionalNumbers' => isset($settings['contact_additionalNumbers']) ? json_decode($settings['contact_additionalNumbers'], true) : []
    ];

    $footer_socials = isset($settings['footer_socials']) ? json_decode($settings['footer_socials'], true) : [];
    $footer = [
        'tagline' => $settings['footer_tagline'] ?? '',
        'copyright' => $settings['footer_copyright'] ?? '',
        'socials' => is_array($footer_socials) ? $footer_socials : []
    ];

    $stmt = $pdo->query("SELECT * FROM wazir_categories");
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($categories as &$cat) {
        $cat['specs'] = json_decode($cat['specs'], true);
        unset($cat['id']);
    }

    $stmt = $pdo->query("SELECT * FROM wazir_featured_products");
    $featuredProducts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($featuredProducts as &$prod) {
        $prod['features'] = json_decode($prod['features'], true);
        $prod['useCase'] = $prod['use_case'];
        unset($prod['use_case'], $prod['id']);
    }

    $stmt = $pdo->query("SELECT * FROM wazir_services");
    $services_items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($services_items as &$serv) {
        $serv['highlights'] = json_decode($serv['highlights'], true);
        unset($serv['id']);
    }
    $services = [
        'badge' => $settings['services_badge'] ?? '',
        'title' => $settings['services_title'] ?? '',
        'description' => $settings['services_description'] ?? '',
        'items' => $services_items
    ];

    $stmt = $pdo->query("SELECT * FROM wazir_stats");
    $stats = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($stats as &$st) { unset($st['id']); }

    $stmt = $pdo->query("SELECT * FROM wazir_trust_points");
    $trustPoints = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($trustPoints as &$tp) { unset($tp['id']); }

    $whyChooseUs = [
        'badge' => $settings['whyChooseUs_badge'] ?? '',
        'title' => $settings['whyChooseUs_title'] ?? '',
        'description' => $settings['whyChooseUs_description'] ?? '',
        'stats' => $stats,
        'trustPoints' => $trustPoints
    ];

    $stmt = $pdo->query("SELECT * FROM wazir_gallery");
    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($projects as &$p) { $p['id'] = (int)$p['id']; }
    $gallery = [
        'badge' => $settings['gallery_badge'] ?? '',
        'title' => $settings['gallery_title'] ?? '',
        'description' => $settings['gallery_description'] ?? '',
        'projects' => $projects
    ];

    $stmt = $pdo->query("SELECT * FROM wazir_timeline");
    $steps = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($steps as &$s) { unset($s['id']); }
    $timeline = [
        'badge' => $settings['timeline_badge'] ?? '',
        'title' => $settings['timeline_title'] ?? '',
        'description' => $settings['timeline_description'] ?? '',
        'steps' => $steps
    ];

    $stmt = $pdo->query("SELECT * FROM wazir_testimonials");
    $testimonials_items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($testimonials_items as &$t) {
        $t['stars'] = (int)$t['stars'];
        unset($t['id']);
    }
    $testimonials = [
        'badge' => $settings['testimonials_badge'] ?? '',
        'title' => $settings['testimonials_title'] ?? '',
        'description' => $settings['testimonials_description'] ?? '',
        'items' => $testimonials_items
    ];

    $stmt = $pdo->query("SELECT * FROM wazir_before_after");
    $beforeAfter_items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($beforeAfter_items as &$ba) {
        $ba['id'] = (int)$ba['id'];
        if (!empty($ba['specs']) && (substr(trim($ba['specs']), 0, 1) === '[' || substr(trim($ba['specs']), 0, 1) === '{')) {
            $decoded = json_decode($ba['specs'], true);
            if ($decoded !== null) $ba['specs'] = $decoded;
        }
    }
    $beforeAfter = [
        'badge' => $settings['beforeAfter_badge'] ?? '',
        'title' => $settings['beforeAfter_title'] ?? '',
        'description' => $settings['beforeAfter_description'] ?? '',
        'items' => $beforeAfter_items
    ];

    $legal = getLegalContent($settings);

    return [
        'hero' => $hero,
        'about' => $about,
        'categories' => $categories,
        'featuredProducts' => $featuredProducts,
        'services' => $services,
        'whyChooseUs' => $whyChooseUs,
        'gallery' => $gallery,
        'timeline' => $timeline,
        'testimonials' => $testimonials,
        'beforeAfter' => $beforeAfter,
        'contact' => $contact,
        'footer' => $footer,
        'privacyPolicy' => $legal['privacyPolicy'],
        'termsAndConditions' => $legal['termsAndConditions']
    ];
}
