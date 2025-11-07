/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// A collection of 10 unique, high-quality "digital collectible" SVG avatars
// inspired by iconic superheroes, redesigned with a polished 3D look and detailed facial features.
export const animatedAvatars: string[] = [
  // 1. Stellar Sentinel (Superman-like) - Polished 3D
  `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Stellar Sentinel</title>
    <defs>
        <filter id="shadow_s1" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="4" dy="5" stdDeviation="4" flood-color="#000" flood-opacity="0.3"/></filter>
        <radialGradient id="grad_skin_s1" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#FDEBD0"/><stop offset="100%" stop-color="#E5C29F"/></radialGradient>
        <linearGradient id="grad_suit_s1" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#2962FF"/><stop offset="100%" stop-color="#0D47A1"/></linearGradient>
        <linearGradient id="grad_emblem_s1" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#FFD600"/><stop offset="100%" stop-color="#FFAB00"/></linearGradient>
    </defs>
    <g filter="url(#shadow_s1)">
        <!-- Body -->
        <path d="M20 100 V 50 C 20 20, 80 20, 80 50 V 100 H 20 Z" fill="url(#grad_suit_s1)"/>
        <!-- Head -->
        <circle cx="50" cy="40" r="30" fill="url(#grad_skin_s1)"/>
        <!-- Jaw Shadow -->
        <path d="M30 60 Q 50 75 70 60 C 65 65, 35 65, 30 60" fill="#000" opacity="0.1"/>
        <!-- Hair -->
        <path d="M25 45 C 15 15, 85 15, 75 45 L 70 50 C 60 40, 40 40, 30 50 Z" fill="#1C1C1C"/>
        <path d="M48 15 C 50 10, 52 15, 48 15" stroke="#1C1C1C" stroke-width="4" fill="none" stroke-linecap="round"/>
        <!-- Eyes -->
        <g>
            <ellipse cx="38" cy="42" rx="6" ry="8" fill="#FFF"/><ellipse cx="62" cy="42" rx="6" ry="8" fill="#FFF"/>
            <circle cx="38" cy="43" r="3.5" fill="#448AFF"/><circle cx="62" cy="43" r="3.5" fill="#448AFF"/>
            <circle cx="38" cy="43" r="1.5" fill="#000"/><circle cx="62" cy="43" r="1.5" fill="#000"/>
            <circle cx="36" cy="41" r="1" fill="#FFF"/><circle cx="60" cy="41" r="1" fill="#FFF"/>
        </g>
        <!-- Emblem -->
        <path d="M38 88 L50 75 L62 88 L50 98 Z" fill="url(#grad_emblem_s1)"/>
        <path d="M42 90 L50 80 L58 90 L50 96 Z" fill="#D32F2F"/>
        <path d="M45 92 Q 50 88 55 92 C 52 94, 48 94, 45 92" fill="url(#grad_emblem_s1)"/>
    </g>
</svg>`,

  // 2. Midnight Vigilante (Batman-like) - Polished 3D
  `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Midnight Vigilante</title>
    <defs>
        <filter id="shadow_b2" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="4" dy="5" stdDeviation="4" flood-color="#000" flood-opacity="0.4"/></filter>
        <radialGradient id="grad_skin_b2" cx="50%" cy="70%" r="50%"><stop offset="0%" stop-color="#FDEBD0"/><stop offset="100%" stop-color="#E5C29F"/></radialGradient>
        <linearGradient id="grad_suit_b2" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#424242"/><stop offset="100%" stop-color="#212121"/></linearGradient>
        <linearGradient id="grad_gold_b2" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#FFEE58"/><stop offset="100%" stop-color="#F9A825"/></linearGradient>
    </defs>
    <g filter="url(#shadow_b2)">
        <!-- Body -->
        <path d="M20 100 V 50 C 20 20, 80 20, 80 50 V 100 H 20 Z" fill="url(#grad_suit_b2)"/>
        <!-- Head -->
        <path d="M25 20 L 50 35 L 75 20 L 78 60 Q 50 75 22 60 Z" fill="#212121"/>
        <!-- Faceplate -->
        <path d="M30 60 C 40 75, 60 75, 70 60 C 60 65, 40 65, 30 60 Z" fill="url(#grad_skin_b2)"/>
        <!-- Eyes -->
        <path d="M38 48 L35 55 H 45 Z M62 48 L65 55 H 55 Z" fill="#FFF"/>
        <!-- Mouth -->
        <path d="M45 68 Q 50 65 55 68" stroke="#424242" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <!-- Emblem -->
        <ellipse cx="50" cy="80" rx="20" ry="14" fill="#FBC02D"/>
        <path d="M38 78 C 45 84, 55 84, 62 78 L 60 86 C 55 81, 45 81, 40 86 Z" fill="#212121"/>
        <!-- Belt -->
        <rect x="30" y="95" width="40" height="5" rx="2" fill="url(#grad_gold_b2)"/>
    </g>
</svg>`,

  // 3. Arachnid Ace (Spider-Man-like) - Polished 3D
  `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Arachnid Ace</title>
    <defs>
        <filter id="shadow_sm3" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="4" dy="5" stdDeviation="4" flood-color="#000" flood-opacity="0.3"/></filter>
        <radialGradient id="grad_red_sm3" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#EF5350"/><stop offset="100%" stop-color="#C62828"/></radialGradient>
        <linearGradient id="grad_blue_sm3" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#42A5F5"/><stop offset="100%" stop-color="#1565C0"/></linearGradient>
    </defs>
    <g filter="url(#shadow_sm3)">
        <!-- Body -->
        <path d="M20 100 V 50 C 20 20, 80 20, 80 50 V 100 H 20 Z" fill="url(#grad_blue_sm3)"/>
        <!-- Head -->
        <circle cx="50" cy="40" r="30" fill="url(#grad_red_sm3)"/>
        <!-- Web pattern -->
        <g stroke="#000" stroke-width="0.7" stroke-opacity="0.4">
            <path d="M50 40 L20 30 M50 40 L80 30 M50 40 L25 55 M50 40 L75 55 M50 40 L50 10 M50 40 L50 70"/>
            <circle cx="50" cy="40" r="10" fill="none"/><circle cx="50" cy="40" r="20" fill="none"/><circle cx="50" cy="40" r="29" fill="none"/>
        </g>
        <!-- Eyes -->
        <path d="M32 32 C 45 32, 45 52, 32 52 C 22 52, 22 32, 32 32 Z" fill="white" stroke="black" stroke-width="2.5"/>
        <path d="M68 32 C 55 32, 55 52, 68 52 C 78 52, 78 32, 68 32 Z" fill="white" stroke="black" stroke-width="2.5"/>
        <!-- Emblem -->
        <path d="M50 72 L 44 78 L 56 78 L 50 72 M 50 88 L 44 82 L 56 82 L 50 88 M 40 75 L 50 81 L 60 75 M 40 85 L 50 79 L 60 85" fill="none" stroke="#212121" stroke-width="3" stroke-linecap="round"/>
    </g>
</svg>`,

  // 4. Ironclad Invader (Iron Man-like) - Polished 3D
  `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Ironclad Invader</title>
    <defs>
        <filter id="shadow_im4" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="4" dy="5" stdDeviation="4" flood-color="#000" flood-opacity="0.4"/></filter>
        <linearGradient id="grad_red_im4" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#D32F2F"/><stop offset="100%" stop-color="#B71C1C"/></linearGradient>
        <linearGradient id="grad_gold_im4" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#FFF59D"/><stop offset="100%" stop-color="#FBC02D"/></linearGradient>
        <radialGradient id="grad_glow_im4" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#E1F5FE"/><stop offset="100%" stop-color="#03A9F4"/></radialGradient>
    </defs>
    <g filter="url(#shadow_im4)">
        <!-- Body -->
        <path d="M20 100 V 50 C 20 20, 80 20, 80 50 V 100 H 20 Z" fill="url(#grad_red_im4)"/>
        <!-- Head -->
        <path d="M25 15 L75 15 L80 65 Q 50 75 20 65 Z" fill="url(#grad_red_im4)"/>
        <!-- Faceplate -->
        <path d="M30 15 L70 15 L75 55 C 60 68, 40 68, 25 55 Z" fill="url(#grad_gold_im4)"/>
        <!-- Eyes -->
        <path d="M35 42 H 65 V 50 H 35 Z" fill="#1C1C1C"/>
        <rect x="38" y="44" width="24" height="4" fill="url(#grad_glow_im4)" rx="1"/>
        <!-- Chest Reactor -->
        <circle cx="50" cy="80" r="16" fill="#616161"/>
        <circle cx="50" cy="80" r="12" fill="url(#grad_glow_im4)"/>
    </g>
</svg>`,

  // 5. Patriot Paragon (Captain America-like) - Polished 3D
  `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Patriot Paragon</title>
    <defs>
        <filter id="shadow_ca5" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="4" dy="5" stdDeviation="4" flood-color="#000" flood-opacity="0.3"/></filter>
        <radialGradient id="grad_skin_ca5" cx="50%" cy="70%" r="50%"><stop offset="0%" stop-color="#FDEBD0"/><stop offset="100%" stop-color="#E5C29F"/></radialGradient>
        <linearGradient id="grad_blue_ca5" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#2196F3"/><stop offset="100%" stop-color="#1565C0"/></linearGradient>
    </defs>
    <g filter="url(#shadow_ca5)">
        <!-- Body -->
        <path d="M20 100 V 50 C 20 20, 80 20, 80 50 V 100 H 20 Z" fill="url(#grad_blue_ca5)"/>
        <!-- Head -->
        <path d="M22 15 L78 15 L80 60 Q 50 75 20 60 Z" fill="url(#grad_blue_ca5)"/>
        <!-- Face -->
        <path d="M25 45 C 35 60, 65 60, 75 45 L 70 65 C 60 60, 40 60, 30 65 Z" fill="url(#grad_skin_ca5)"/>
        <!-- 'A' on forehead -->
        <path d="M45 25 L50 18 L55 25 M47.5 22 H 52.5" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Wings -->
        <path d="M22 35 L 18 30 M22 40 L 18 35 M22 45 L 18 40" stroke="white" stroke-width="2" stroke-linecap="round"/>
        <path d="M78 35 L 82 30 M78 40 L 82 35 M78 45 L 82 40" stroke="white" stroke-width="2" stroke-linecap="round"/>
        <!-- Star Emblem -->
        <path d="M50 75 L55 90 L70 90 L58 98 L62 110 L50 102 L38 110 L42 98 L30 90 L45 90 Z" fill="white"/>
        <!-- Red Stripes -->
        <g fill="#E53935"><rect x="25" y="90" width="50" height="6"/><rect x="20" y="96" width="60" height="6"/></g>
    </g>
</svg>`,

  // 6. Bubbles (Powerpuff Girls) - Redesigned
  `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Bubbles</title>
    <defs>
      <filter id="shadow_ppg2" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="4" dy="5" stdDeviation="4" flood-color="#000" flood-opacity="0.3"/></filter>
      <radialGradient id="grad_skin_ppg" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#FDEBD0"/><stop offset="100%" stop-color="#E5C29F"/></radialGradient>
      <linearGradient id="grad_dress_blue" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#90CAF9"/><stop offset="100%" stop-color="#42A5F5"/></linearGradient>
      <linearGradient id="grad_hair_blonde" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#FFF59D"/><stop offset="100%" stop-color="#FFEE58"/></linearGradient>
    </defs>
    <g filter="url(#shadow_ppg2)">
      <!-- Dress -->
      <path d="M20 100 V 65 C 20 40, 80 40, 80 65 V 100 Z" fill="url(#grad_dress_blue)"/>
      <rect x="20" y="78" width="60" height="8" fill="#212121"/>
      <!-- Head -->
      <circle cx="50" cy="45" r="30" fill="url(#grad_skin_ppg)"/>
      <path d="M35 70 Q 50 80 65 70 C 60 75, 40 75, 35 70" fill="#000" opacity="0.1"/>
      <!-- Hair -->
      <path d="M25 35 C 30 20, 70 20, 75 35 L 75 45 C 65 35, 35 35, 25 45 Z" fill="url(#grad_hair_blonde)"/>
      <path d="M25 45 C 10 40, 10 10, 25 25 Z" fill="url(#grad_hair_blonde)"/>
      <path d="M75 45 C 90 40, 90 10, 75 25 Z" fill="url(#grad_hair_blonde)"/>
      <!-- Eyes -->
      <g>
        <ellipse cx="38" cy="48" rx="12" ry="15" fill="#FFF"/><ellipse cx="62" cy="48" rx="12" ry="15" fill="#FFF"/>
        <circle cx="38" cy="50" r="7" fill="#90CAF9"/><circle cx="62" cy="50" r="7" fill="#90CAF9"/>
        <circle cx="38" cy="50" r="3" fill="#000"/><circle cx="62" cy="50" r="3" fill="#000"/>
        <circle cx="35" cy="46" r="2.5" fill="#FFF" opacity="0.9"/><circle cx="59" cy="46" r="2.5" fill="#FFF" opacity="0.9"/>
      </g>
      <!-- Mouth -->
      <path d="M47 65 Q 50 70 53 65" stroke="#A6573F" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </g>
</svg>`,

  // 7. Disassembly Drone (Murder Drones-like) - Polished 3D
  `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Disassembly Drone</title>
    <defs>
        <filter id="shadow_md8" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="4" dy="5" stdDeviation="4" flood-color="#000" flood-opacity="0.4"/></filter>
        <radialGradient id="grad_face_md8" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#E0E0E0"/></radialGradient>
        <linearGradient id="grad_suit_md8" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#424242"/><stop offset="100%" stop-color="#1C1C1C"/></linearGradient>
        <radialGradient id="grad_eye_glow_md8" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFF9C4"/><stop offset="70%" stop-color="#FFEB3B"/><stop offset="100%" stop-color="#FBC02D"/></radialGradient>
        <filter id="eye_bloom_md8"><feGaussianBlur in="SourceGraphic" stdDeviation="2"/></filter>
    </defs>
    <g filter="url(#shadow_md8)">
        <!-- Body -->
        <path d="M20 100 V 50 C 20 20, 80 20, 80 50 V 100 H 20 Z" fill="url(#grad_suit_md8)"/>
        <!-- Head -->
        <circle cx="50" cy="40" r="30" fill="url(#grad_face_md8)"/>
        <!-- Jaw Shadow -->
        <path d="M30 62 Q 50 72 70 62 C 65 67, 35 67, 30 62" fill="#000" opacity="0.08"/>
        <!-- Hair -->
        <path d="M20 40 C 15 10, 85 10, 80 40 C 90 55, 80 65, 82 50 C 75 20, 25 20, 18 50 C 20 65, 10 55, 20 40 Z" fill="#CFD8DC"/>
        <path d="M25 35 C 20 10, 80 10, 75 35 C 70 25, 30 25, 25 35" fill="#90A4AE"/>
        <!-- Eye Visor -->
        <path d="M25 35 C 35 30, 65 30, 75 35 L 72 50 C 65 55, 35 55, 28 50 Z" fill="#212121"/>
        <!-- Glowing Eyes -->
        <g filter="url(#eye_bloom_md8)">
            <ellipse cx="38" cy="43" rx="8" ry="8" fill="url(#grad_eye_glow_md8)"/><ellipse cx="62" cy="43" rx="8" ry="8" fill="url(#grad_eye_glow_md8)"/>
        </g>
        <g>
            <ellipse cx="38" cy="43" rx="8" ry="8" fill="url(#grad_eye_glow_md8)"/><ellipse cx="62" cy="43" rx="8" ry="8" fill="url(#grad_eye_glow_md8)"/>
        </g>
        <!-- Mouth -->
        <path d="M47 60 Q 50 58 53 60" stroke="#757575" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <!-- Emblem/Collar detail -->
        <path d="M35 85 L50 70 L65 85 L50 95 Z" fill="#455A64"/>
        <path d="M40 85 L50 75 L60 85 L50 92 Z" fill="#78909C"/>
    </g>
</svg>`,

  // 8. Tatsu Yamashiro (Katana-like) - Polished 3D
  `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Tatsu Yamashiro</title>
    <defs>
        <filter id="shadow_k9" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="4" dy="5" stdDeviation="4" flood-color="#000" flood-opacity="0.35"/></filter>
        <radialGradient id="grad_skin_k9" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#FDEBD0"/><stop offset="100%" stop-color="#E5C29F"/></radialGradient>
        <linearGradient id="grad_suit_k9" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#212121"/><stop offset="100%" stop-color="#000000"/></linearGradient>
        <linearGradient id="grad_red_k9" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#D32F2F"/><stop offset="100%" stop-color="#B71C1C"/></linearGradient>
    </defs>
    <g filter="url(#shadow_k9)">
        <!-- Body -->
        <path d="M20 100 V 50 C 20 20, 80 20, 80 50 V 100 H 20 Z" fill="url(#grad_suit_k9)"/>
        <!-- Red accent -->
        <path d="M40 70 L 60 70 L 50 85 Z" fill="url(#grad_red_k9)"/>
        <!-- Head -->
        <g>
            <!-- Ponytail -->
            <path d="M45 68 C 40 88, 50 92, 52 70 Z" fill="#1C1C1C"/>
            <path d="M46 70 C 43 83, 49 86, 51 72 Z" fill="#333"/>

            <circle cx="50" cy="40" r="30" fill="url(#grad_skin_k9)"/>
            <!-- Jaw Shadow -->
            <path d="M30 62 Q 50 72 70 62 C 65 67, 35 67, 30 62" fill="#000" opacity="0.1"/>
            
            <!-- Hair -->
            <g id="hair">
                <path d="M18 28 C 15 10, 85 10, 82 28 L 86 68 Q 50 64 14 68 Z" fill="#1C1C1C"/>
                <path d="M25 25 H 75" stroke="#1C1C1C" stroke-width="7" stroke-linecap="round"/>
                <path d="M22 25 C 35 15, 65 15, 78 25" stroke="#333" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.7"/>
            </g>
        </g>
        <!-- Mask -->
        <path d="M25 25 C 30 20, 70 20, 75 25 L 75 48 C 60 55, 40 55, 25 48 Z" fill="#FFFFFF" stroke="#BDBDBD" stroke-width="1"/>
        <!-- Red circle on mask -->
        <circle cx="50" cy="30" r="5" fill="url(#grad_red_k9)"/>
        <!-- Eye holes -->
        <path d="M35 35 C 40 32, 45 35, 45 40 C 45 45, 40 48, 35 45 Z M65 35 C 60 32, 55 35, 55 40 C 55 45, 60 48, 65 45 Z" fill="url(#grad_skin_k9)"/>
        <!-- Eyes -->
        <g>
            <ellipse cx="40" cy="40" rx="3" ry="5" fill="#5D4037"/><ellipse cx="60" cy="40" rx="3" ry="5" fill="#5D4037"/>
            <circle cx="39" cy="38" r="1" fill="#FFF" opacity="0.7"/><circle cx="59" cy="38" r="1" fill="#FFF" opacity="0.7"/>
        </g>
        <!-- Mouth -->
        <path d="M47 63 Q 50 62 53 63" stroke="#A6573F" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </g>
</svg>`,

  // 9. Cosmic Guardian (Evolved Jessica Cruz) - Polished 3D
  `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Cosmic Guardian</title>
    <defs>
        <filter id="shadow_jc10_evo" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="4" dy="5" stdDeviation="4" flood-color="#000" flood-opacity="0.35"/></filter>
        <radialGradient id="grad_skin_jc10_evo" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#FDEBD0"/><stop offset="100%" stop-color="#E5C29F"/></radialGradient>
        <linearGradient id="grad_suit_jc10_evo" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#212121"/><stop offset="100%" stop-color="#000000"/></linearGradient>
        <linearGradient id="grad_suit_green_jc10_evo" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#4CAF50"/><stop offset="100%" stop-color="#1B5E20"/></linearGradient>
        <radialGradient id="grad_green_glow_jc10_evo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#A5D6A7"/>
            <stop offset="70%" stop-color="#4CAF50"/>
            <stop offset="100%" stop-color="#1B5E20"/>
        </radialGradient>
        <filter id="green_bloom_jc10_evo"><feGaussianBlur in="SourceGraphic" stdDeviation="3"/></filter>
    </defs>
    <g filter="url(#shadow_jc10_evo)">
        <!-- Body -->
        <path d="M20 100 V 50 C 20 20, 80 20, 80 50 V 100 H 20 Z" fill="url(#grad_suit_jc10_evo)"/>
        <!-- Green Suit Accents -->
        <path d="M25 55 C 20 60, 20 70, 30 75 L 50 85 L 70 75 C 80 70, 80 60, 75 55 L 50 65 Z" fill="url(#grad_suit_green_jc10_evo)"/>
        <!-- Emblem Bloom -->
        <g filter="url(#green_bloom_jc10_evo)">
             <circle cx="50" cy="80" r="10" fill="#66BB6A"/>
        </g>
        <!-- Green Lantern Emblem on chest -->
        <circle cx="50" cy="80" r="10" fill="url(#grad_green_glow_jc10_evo)"/>
        <circle cx="50" cy="80" r="6" fill="white"/>
        <path d="M50 76 L 46 80 L 54 80 L 50 76 M50 84 L 46 80 L 54 80 L 50 84" fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round"/>

        <!-- Head -->
        <g>
            <circle cx="50" cy="40" r="30" fill="url(#grad_skin_jc10_evo)"/>
            <!-- Jaw Shadow -->
            <path d="M30 62 Q 50 72 70 62 C 65 67, 35 67, 30 62" fill="#000" opacity="0.1"/>

            <!-- Evolved Hair -->
            <path d="M15 50 C 5 20, 40 -10, 50 20 C 60 -10, 95 20, 85 50 C 100 70, 80 80, 80 55 C 70 10, 30 10, 20 55 C 20 80, 0 70, 15 50 Z" fill="#212121"/>
            <!-- Green energy highlights in hair -->
            <path d="M25 45 C 20 30, 30 20, 35 30" stroke="#4CAF50" stroke-width="2" fill="none" opacity="0.5"/>
            <path d="M75 45 C 80 30, 70 20, 65 30" stroke="#4CAF50" stroke-width="2" fill="none" opacity="0.5"/>
            <path d="M20 30 C 35 15, 65 15, 80 30" stroke="#333" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.7"/>
        </g>

        <!-- Eyes -->
        <g>
            <!-- Right Eye (viewer's right) -->
            <ellipse cx="62" cy="42" rx="6" ry="8" fill="#FFF"/>
            <circle cx="62" cy="43" r="3.5" fill="#5D4037"/>
            <circle cx="62" cy="43" r="1.5" fill="#000"/>
            <circle cx="60" cy="41" r="1" fill="#FFF"/>
            <!-- Left Eye (viewer's left) -->
            <ellipse cx="38" cy="42" rx="6" ry="8" fill="#FFF"/>
            <circle cx="38" cy="43" r="3.5" fill="#5D4037"/>
            <circle cx="38" cy="43" r="1.5" fill="#000"/>
            <circle cx="36" cy="41" r="1" fill="#FFF"/>
        </g>
        
        <!-- Mouth -->
        <path d="M47 63 H 53" stroke="#A6573F" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </g>
</svg>`,

  // 10. Amazonian Princess (Wonder Woman-like) - Polished 3D
  `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Amazonian Princess</title>
    <defs>
        <filter id="shadow_ww10" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="4" dy="5" stdDeviation="4" flood-color="#000" flood-opacity="0.35"/></filter>
        <radialGradient id="grad_skin_ww10" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#FDEBD0"/><stop offset="100%" stop-color="#D6A88B"/></radialGradient>
        <linearGradient id="grad_suit_red_ww10" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#D32F2F"/><stop offset="100%" stop-color="#B71C1C"/></linearGradient>
        <linearGradient id="grad_suit_gold_ww10" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#FFD600"/><stop offset="100%" stop-color="#FFAB00"/></linearGradient>
    </defs>
    <g filter="url(#shadow_ww10)">
        <!-- Body -->
        <path d="M20 100 V 50 C 20 20, 80 20, 80 50 V 100 H 20 Z" fill="url(#grad_suit_red_ww10)"/>
        <!-- Gold Eagle/W on chest -->
        <path d="M30 55 L 50 70 L 70 55 L 65 60 L 50 75 L 35 60 Z" fill="url(#grad_suit_gold_ww10)"/>
        <path d="M40 70 L 50 85 L 60 70 L 50 78 Z" fill="url(#grad_suit_gold_ww10)"/>

        <!-- Head -->
        <g>
            <circle cx="50" cy="40" r="30" fill="url(#grad_skin_ww10)"/>
            <!-- Jaw Shadow -->
            <path d="M30 62 Q 50 72 70 62 C 65 67, 35 67, 30 62" fill="#000" opacity="0.1"/>

            <!-- Hair -->
            <path d="M18 40 C 10 0, 90 0, 82 40 C 95 70, 80 85, 80 55 C 70 10, 30 10, 20 55 C 20 85, 5 70, 18 40 Z" fill="#1C1C1C"/>
            <path d="M25 30 C 35 15, 65 15, 75 30" stroke="#333" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.7"/>
        </g>
        
        <!-- Tiara -->
        <path d="M25 25 C 40 20, 60 20, 75 25 L 70 35 H 30 Z" fill="url(#grad_suit_gold_ww10)"/>
        <!-- Star on Tiara -->
        <path d="M50 22 L 52 26 L 56 26 L 53 28.5 L 54 32 L 50 30 L 46 32 L 47 28.5 L 44 26 L 48 26 Z" fill="#D32F2F"/>

        <!-- Eyes -->
        <g>
            <ellipse cx="38" cy="42" rx="6" ry="8" fill="#FFF"/>
            <ellipse cx="62" cy="42" rx="6" ry="8" fill="#FFF"/>
            <circle cx="38" cy="43" r="3.5" fill="#448AFF"/>
            <circle cx="62" cy="43" r="3.5" fill="#448AFF"/>
            <circle cx="38" cy="43" r="1.5" fill="#000"/>
            <circle cx="62" cy="43" r="1.5" fill="#000"/>
            <circle cx="36" cy="41" r="1" fill="#FFF"/>
            <circle cx="60" cy="41" r="1" fill="#FFF"/>
        </g>
        
        <!-- Eyebrows -->
        <path d="M32 35 Q 38 32 44 35 M56 35 Q 62 32 68 35" stroke="#1C1C1C" stroke-width="1.5" fill="none" stroke-linecap="round"/>

        <!-- Mouth -->
        <path d="M47 60 Q 50 62 53 60" stroke="#A6573F" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </g>
</svg>`
];