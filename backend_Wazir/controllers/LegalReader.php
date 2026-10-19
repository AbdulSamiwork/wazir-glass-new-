<?php
/**
 * Legal Content Reader Service
 * Reconstructs Privacy Policy and Terms & Conditions with defaults and fallbacks.
 */

function getLegalContent($settings) {
    $pp_sections_raw = $settings['privacyPolicy_sections'] ?? null;
    $pp_sections = !empty($pp_sections_raw) ? json_decode($pp_sections_raw, true) : null;
    $pp_trust_raw = $settings['privacyPolicy_trustBadges'] ?? null;
    $pp_trust = !empty($pp_trust_raw) ? json_decode($pp_trust_raw, true) : null;

    $tc_sections_raw = $settings['termsAndConditions_sections'] ?? null;
    $tc_sections = !empty($tc_sections_raw) ? json_decode($tc_sections_raw, true) : null;

    $fallback_data = null;
    if ($pp_sections === null || $tc_sections === null) {
        $possible_json = [__DIR__ . '/../data.json', __DIR__ . '/../../public/data.json', __DIR__ . '/../../data.json'];
        foreach ($possible_json as $f) {
            if (file_exists($f)) {
                $fallback_data = json_decode(file_get_contents($f), true);
                break;
            }
        }
    }

    $fb_pp = $fallback_data['privacyPolicy'] ?? [];
    $fb_tc = $fallback_data['termsAndConditions'] ?? [];

    $privacyPolicy = [
        'badge' => $settings['privacyPolicy_badge'] ?? ($fb_pp['badge'] ?? 'Data Protection'),
        'titleLine1' => $settings['privacyPolicy_titleLine1'] ?? ($fb_pp['titleLine1'] ?? 'Privacy'),
        'titleLine2' => $settings['privacyPolicy_titleLine2'] ?? ($fb_pp['titleLine2'] ?? 'Policy'),
        'description' => $settings['privacyPolicy_description'] ?? ($fb_pp['description'] ?? 'Your privacy matters to us.'),
        'lastUpdated' => $settings['privacyPolicy_lastUpdated'] ?? ($fb_pp['lastUpdated'] ?? 'October 2026'),
        'subNotice' => $settings['privacyPolicy_subNotice'] ?? ($fb_pp['subNotice'] ?? 'Your Data, Your Rights'),
        'trustBadges' => is_array($pp_trust) ? $pp_trust : ($fb_pp['trustBadges'] ?? []),
        'sections' => is_array($pp_sections) ? $pp_sections : ($fb_pp['sections'] ?? []),
        'ctaTitle' => $settings['privacyPolicy_ctaTitle'] ?? ($fb_pp['ctaTitle'] ?? 'Privacy Concerns?'),
        'ctaDescription' => $settings['privacyPolicy_ctaDescription'] ?? ($fb_pp['ctaDescription'] ?? 'Contact us for questions.'),
        'ctaBtnText' => $settings['privacyPolicy_ctaBtnText'] ?? ($fb_pp['ctaBtnText'] ?? 'Contact Us')
    ];

    $termsAndConditions = [
        'badge' => $settings['termsAndConditions_badge'] ?? ($fb_tc['badge'] ?? 'Legal Agreement'),
        'titleLine1' => $settings['termsAndConditions_titleLine1'] ?? ($fb_tc['titleLine1'] ?? 'Terms &'),
        'titleLine2' => $settings['termsAndConditions_titleLine2'] ?? ($fb_tc['titleLine2'] ?? 'Conditions'),
        'description' => $settings['termsAndConditions_description'] ?? ($fb_tc['description'] ?? 'Terms governing our services.'),
        'lastUpdated' => $settings['termsAndConditions_lastUpdated'] ?? ($fb_tc['lastUpdated'] ?? 'October 2026'),
        'subNotice' => $settings['termsAndConditions_subNotice'] ?? ($fb_tc['subNotice'] ?? 'Effective Immediately'),
        'quickSummary' => $settings['termsAndConditions_quickSummary'] ?? ($fb_tc['quickSummary'] ?? ''),
        'sections' => is_array($tc_sections) ? $tc_sections : ($fb_tc['sections'] ?? []),
        'ctaTitle' => $settings['termsAndConditions_ctaTitle'] ?? ($fb_tc['ctaTitle'] ?? 'Have Questions?'),
        'ctaDescription' => $settings['termsAndConditions_ctaDescription'] ?? ($fb_tc['ctaDescription'] ?? 'Reach out to our team.'),
        'ctaBtnText' => $settings['termsAndConditions_ctaBtnText'] ?? ($fb_tc['ctaBtnText'] ?? 'Contact Us')
    ];

    return ['privacyPolicy' => $privacyPolicy, 'termsAndConditions' => $termsAndConditions];
}
