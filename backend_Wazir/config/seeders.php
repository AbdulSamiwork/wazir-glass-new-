<?php
/**
 * Initial Database Seeders
 * Seeds default site content into settings and entity tables.
 */

function seedDatabase($pdo, $data_file) {
    $data = json_decode(file_get_contents($data_file), true);
    if (!$data) return;

    $stmt = $pdo->prepare("INSERT INTO wazir_settings (setting_key, setting_value) VALUES (?, ?)");
    $sections = ['hero', 'about', 'contact', 'footer', 'privacyPolicy', 'termsAndConditions'];
    foreach ($sections as $sec) {
        if (isset($data[$sec])) {
            foreach ($data[$sec] as $key => $val) {
                if (is_array($val)) {
                    $stmt->execute([$sec . '_' . $key, json_encode($val, JSON_UNESCAPED_UNICODE)]);
                } else {
                    $stmt->execute([$sec . '_' . $key, $val]);
                }
            }
        }
    }
    
    foreach (['services', 'whyChooseUs', 'gallery', 'timeline', 'testimonials', 'beforeAfter'] as $sec) {
        if (isset($data[$sec])) {
            foreach ($data[$sec] as $key => $val) {
                if (!in_array($key, ['items', 'projects', 'stats', 'trustPoints', 'steps'])) {
                    $stmt->execute([$sec . '_' . $key, $val]);
                }
            }
        }
    }

    if (isset($data['categories'])) {
        $ins = $pdo->prepare("INSERT INTO wazir_categories (name, description, meta, image, details, specs) VALUES (?, ?, ?, ?, ?, ?)");
        foreach ($data['categories'] as $cat) {
            $ins->execute([
                $cat['name'], $cat['description'], $cat['meta'], $cat['image'], $cat['details'],
                json_encode($cat['specs'], JSON_UNESCAPED_UNICODE)
            ]);
        }
    }

    if (isset($data['featuredProducts'])) {
        $ins = $pdo->prepare("INSERT INTO wazir_featured_products (title, tagline, description, use_case, specifications, image, features) VALUES (?, ?, ?, ?, ?, ?, ?)");
        foreach ($data['featuredProducts'] as $prod) {
            $ins->execute([
                $prod['title'], $prod['tagline'], $prod['description'], $prod['useCase'], $prod['specifications'], $prod['image'],
                json_encode($prod['features'], JSON_UNESCAPED_UNICODE)
            ]);
        }
    }

    if (isset($data['services']['items'])) {
        $ins = $pdo->prepare("INSERT INTO wazir_services (title, description, image, details, highlights) VALUES (?, ?, ?, ?, ?)");
        foreach ($data['services']['items'] as $serv) {
            $ins->execute([
                $serv['title'], $serv['description'], $serv['image'], $serv['details'],
                json_encode($serv['highlights'], JSON_UNESCAPED_UNICODE)
            ]);
        }
    }

    if (isset($data['whyChooseUs']['stats'])) {
        $ins = $pdo->prepare("INSERT INTO wazir_stats (value, suffix, label) VALUES (?, ?, ?)");
        foreach ($data['whyChooseUs']['stats'] as $st) {
            $ins->execute([$st['value'], $st['suffix'], $st['label']]);
        }
    }
    if (isset($data['whyChooseUs']['trustPoints'])) {
        $ins = $pdo->prepare("INSERT INTO wazir_trust_points (title, `desc`) VALUES (?, ?)");
        foreach ($data['whyChooseUs']['trustPoints'] as $tp) {
            $ins->execute([$tp['title'], $tp['desc']]);
        }
    }

    if (isset($data['gallery']['projects'])) {
        $ins = $pdo->prepare("INSERT INTO wazir_gallery (id, title, category, size, `desc`, image) VALUES (?, ?, ?, ?, ?, ?)");
        foreach ($data['gallery']['projects'] as $proj) {
            $ins->execute([$proj['id'], $proj['title'], $proj['category'], $proj['size'], $proj['desc'], $proj['image']]);
        }
    }

    if (isset($data['timeline']['steps'])) {
        $ins = $pdo->prepare("INSERT INTO wazir_timeline (step, title, `desc`) VALUES (?, ?, ?)");
        foreach ($data['timeline']['steps'] as $step) {
            $ins->execute([$step['step'], $step['title'], $step['desc']]);
        }
    }

    if (isset($data['testimonials']['items'])) {
        $ins = $pdo->prepare("INSERT INTO wazir_testimonials (name, role, `text`, stars) VALUES (?, ?, ?, ?)");
        foreach ($data['testimonials']['items'] as $test) {
            $ins->execute([$test['name'], $test['role'], $test['text'], $test['stars']]);
        }
    }

    if (isset($data['beforeAfter']['items'])) {
        $ins = $pdo->prepare("INSERT INTO wazir_before_after (id, title, category, beforeImage, afterImage, beforeLabel, afterLabel, specs, impact) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        foreach ($data['beforeAfter']['items'] as $ba) {
            $specs_str = is_array($ba['specs']) ? json_encode($ba['specs'], JSON_UNESCAPED_UNICODE) : (string)$ba['specs'];
            $ins->execute([
                isset($ba['id']) ? $ba['id'] : 1,
                isset($ba['title']) ? $ba['title'] : '',
                isset($ba['category']) ? $ba['category'] : '',
                isset($ba['beforeImage']) ? $ba['beforeImage'] : '',
                isset($ba['afterImage']) ? $ba['afterImage'] : '',
                isset($ba['beforeLabel']) ? $ba['beforeLabel'] : '',
                isset($ba['afterLabel']) ? $ba['afterLabel'] : '',
                $specs_str,
                isset($ba['impact']) ? $ba['impact'] : ''
            ]);
        }
    }
}
