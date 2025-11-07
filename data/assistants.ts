/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// A collection of enhanced animated SVG characters to be used as interactive assistants.
// These versions include more detail, gradients, and refined, character-specific animations.
export const animatedAssistants: { id: string; svg: string }[] = [
    {
        id: 'Clippy',
        svg: `<svg viewBox="-10 -15 120 120" xmlns="http://www.w3.org/2000/svg">
            <title>Clippy the Paperclip</title>
            <defs>
                <filter id="shadow_clippy" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.25"/>
                </filter>
                <linearGradient id="metalGradient_clippy" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff" />
                    <stop offset="30%" stop-color="#d1d5db" />
                    <stop offset="50%" stop-color="#9ca3af" />
                    <stop offset="70%" stop-color="#d1d5db" />
                    <stop offset="100%" stop-color="#f9fafb" />
                </linearGradient>
                <radialGradient id="eyeWhiteGradient">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="100%" stop-color="#f3f4f6"/>
                </radialGradient>
            </defs>
            <g filter="url(#shadow_clippy)">
                <!-- Main Body with Squash & Stretch -->
                <g>
                    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -6; 0 0" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"/>
                     <animateTransform attributeName="transform" type="scale" values="1 1; 1.05 0.95; 1 1" dur="3s" repeatCount="indefinite" additive="sum" origin="center bottom"/>
                    <path d="M 50 15 C 25 15, 25 40, 40 50 L 40 85 A 10 10 0 0 0 60 85 L 60 40 C 75 40, 75 15, 50 15 Z" fill="url(#metalGradient_clippy)" stroke="#4b5563" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M 40 50 C 20 50, 20 70, 40 75 L 40 50" fill="none" stroke="#4b5563" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                    
                    <!-- Eyes -->
                    <g>
                        <!-- Left Eye -->
                        <g transform="translate(40, 32)">
                            <path d="M -6 -8 Q 0 -11 6 -8" stroke="black" stroke-width="1.5" fill="none">
                                <animate attributeName="d" values="M -6 -8 Q 0 -11 6 -8; M -6 -8 Q 0 -8 6 -8; M -6 -8 Q 0 -11 6 -8" dur="4s" repeatCount="indefinite" begin="-1s" />
                            </path>
                            <circle cx="0" cy="0" r="8" fill="url(#eyeWhiteGradient)" stroke="black" stroke-width="0.5"/>
                            <circle r="4.5" fill="black">
                                <animateMotion dur="8s" repeatCount="indefinite" path="M0,0 C1,0 1.5,1 1.5,1 C1.5,1 0,1.5 0,1.5 C-1,1.5 -1.5,1 -1.5,1 C-1.5,1 -1,0 0,0 Z"/>
                            </circle>
                            <circle cx="-2" cy="-2" r="1.5" fill="white" opacity="0.8"/>
                        </g>
                        <!-- Right Eye -->
                        <g transform="translate(60, 32)">
                             <path d="M -6 -8 Q 0 -11 6 -8" stroke="black" stroke-width="1.5" fill="none">
                                <animate attributeName="d" values="M -6 -8 Q 0 -11 6 -8; M -6 -8 Q 0 -8 6 -8; M -6 -8 Q 0 -11 6 -8" dur="4s" repeatCount="indefinite" />
                            </path>
                            <circle cx="0" cy="0" r="8" fill="url(#eyeWhiteGradient)" stroke="black" stroke-width="0.5"/>
                            <circle r="4.5" fill="black">
                                <animateMotion dur="8s" repeatCount="indefinite" path="M0,0 C1,0 1.5,1 1.5,1 C1.5,1 0,1.5 0,1.5 C-1,1.5 -1.5,1 -1.5,1 C-1.5,1 -1,0 0,0 Z"/>
                            </circle>
                            <circle cx="-2" cy="-2" r="1.5" fill="white" opacity="0.8"/>
                        </g>
                    </g>
                </g>
                 <!-- Thought Bubble -->
                <g opacity="0" transform="translate(0, 0)">
                    <animate attributeName="opacity" values="0;0;0;0;0;0;1;1;0;0" dur="10s" repeatCount="indefinite" begin="-5s"/>
                     <animateTransform attributeName="transform" type="translate" values="0 0; 0 -5; 0 0" dur="1s" repeatCount="indefinite" additive="sum"/>
                    <path d="M 20 20 C 5 20, 5 5, 20 5 L 35 5 C 50 5, 50 20, 35 20 Z" fill="white" stroke="#4b5563" stroke-width="1.5"/>
                    <path d="M 27.5 20 L 25 25 L 30 20" fill="white" stroke="#4b5563" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
                    <!-- Lightbulb -->
                    <g transform="translate(27.5, 12.5) scale(0.6)">
                        <path d="M 0 -8 C -5 -8, -5 0, 0 0 C 5 0, 5 -8, 0 -8 Z" fill="#facc15"/>
                        <rect x="-2" y="0" width="4" height="3" fill="#9ca3af"/>
                        <g fill="#fff" opacity="0.8">
                            <path d="M -1 -7 L 1 -7 L 3 -5 L 1 -3 L -1 -3 L -3 -5 Z" />
                        </g>
                    </g>
                </g>
            </g>
        </svg>`
    },
    {
        id: 'Sprout',
        svg: `<svg viewBox="-10 -15 120 120" xmlns="http://www.w3.org/2000/svg">
            <title>Sprout the Plant</title>
            <defs>
                <filter id="shadow_plant" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="3" dy="5" stdDeviation="3" flood-color="#000000" flood-opacity="0.2"/>
                </filter>
                <linearGradient id="potGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#f97316"/>
                    <stop offset="100%" stop-color="#c2410c"/>
                </linearGradient>
                <radialGradient id="leafGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#4ade80"/>
                    <stop offset="100%" stop-color="#16a34a"/>
                </radialGradient>
                <radialGradient id="soilGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#57534e"/>
                    <stop offset="100%" stop-color="#292524"/>
                </radialGradient>
            </defs>
            <g filter="url(#shadow_plant)">
                <!-- Hover animation group -->
                <g>
                    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -5; 0 0" dur="8s" repeatCount="indefinite" keySplines="0.5 0 0.5 1; 0.5 0 0.5 1" calcMode="spline"/>
                    
                    <!-- Pot -->
                    <path d="M 25 90 L 30 60 H 70 L 75 90 Z" fill="url(#potGradient)" stroke="#7c2d12" stroke-width="1.5"/>
                    <ellipse cx="50" cy="60" rx="20" ry="5" fill="url(#soilGradient)"/>
                    
                    <!-- Stem -->
                    <path d="M 50 60 Q 52 40 50 20" stroke="#166534" stroke-width="4" fill="none" stroke-linecap="round"/>
                    
                    <!-- Side Leaves -->
                    <g>
                        <animateTransform attributeName="transform" type="rotate" values="-5 50 60; 5 50 60; -5 50 60" dur="10s" repeatCount="indefinite" />
                        <path d="M 50 50 C 30 50, 30 35, 45 35" fill="url(#leafGradient)" stroke="#14532d" stroke-width="1"/>
                        <path d="M 50 50 C 70 50, 70 35, 55 35" fill="url(#leafGradient)" stroke="#14532d" stroke-width="1"/>
                    </g>
                    
                    <!-- Head Leaf (Face) -->
                    <g>
                        <animateTransform attributeName="transform" type="rotate" values="0 50 20; 10 50 20; -10 50 20; 0 50 20" dur="14s" repeatCount="indefinite" />
                        <ellipse cx="50" cy="20" rx="18" ry="12" fill="url(#leafGradient)" stroke="#14532d" stroke-width="1.5"/>
                        
                        <!-- Eyes -->
                        <g>
                            <!-- Left Eye -->
                            <ellipse cx="44" cy="20" rx="3" ry="4" fill="black">
                                <animate attributeName="ry" values="4; 0.5; 4; 4; 4" dur="8s" repeatCount="indefinite" />
                            </ellipse>
                             <circle cx="43" cy="18" r="1" fill="white" opacity="0.9"/>
                            <!-- Right Eye -->
                             <ellipse cx="56" cy="20" rx="3" ry="4" fill="black">
                                <animate attributeName="ry" values="4; 4; 0.5; 4; 4" dur="8s" repeatCount="indefinite" begin="-0.2s" />
                            </ellipse>
                            <circle cx="55" cy="18" r="1" fill="white" opacity="0.9"/>
                        </g>
                        <!-- Mouth -->
                        <path d="M 48 25 Q 50 28 52 25" stroke="black" stroke-width="1.5" fill="none" stroke-linecap="round">
                            <animate attributeName="d" values="M 48 25 Q 50 28 52 25; M 48 25 Q 50 26 52 25; M 48 25 Q 50 28 52 25" dur="4s" repeatCount="indefinite" />
                        </path>
                    </g>

                </g>
                <!-- Shadow -->
                <ellipse cx="50" cy="98" rx="25" ry="5" fill="black" opacity="0.15">
                    <animate attributeName="ry" values="5; 3; 5" dur="8s" repeatCount="indefinite" keySplines="0.5 0 0.5 1; 0.5 0 0.5 1" calcMode="spline"/>
                    <animate attributeName="opacity" values="0.15; 0.08; 0.15" dur="8s" repeatCount="indefinite" keySplines="0.5 0 0.5 1; 0.5 0 0.5 1" calcMode="spline"/>
                </ellipse>
            </g>
        </svg>`
    },
    {
        id: 'Rune',
        svg: `<svg viewBox="-20 -20 140 140" xmlns="http://www.w3.org/2000/svg">
            <title>Ascended Rune the Golem</title>
            <defs>
                <filter id="shadow_rune_ascended" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="5" dy="8" stdDeviation="6" flood-color="#000" flood-opacity="0.35"/>
                </filter>
                <radialGradient id="runeStoneGrad_ascended" cx="50%" cy="40%" r="70%">
                    <stop offset="0%" stop-color="#a8a29e"/>
                    <stop offset="100%" stop-color="#44403c"/>
                </radialGradient>
                <radialGradient id="runeEyeGalaxy_ascended" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#e0f2fe"/>
                    <stop offset="50%" stop-color="#38bdf8"/>
                    <stop offset="100%" stop-color="#075985"/>
                </radialGradient>
                <radialGradient id="runeHeartGrad_ascended" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#a5f3fc"/>
                    <stop offset="100%" stop-color="#0891b2"/>
                </radialGradient>
                <filter id="runeGlow_ascended">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4"/>
                </filter>
                <linearGradient id="runeCrystalGrad_ascended" x1="0.5" y1="0" x2="0.5" y2="1">
                    <stop offset="0%" stop-color="#67e8f9"/>
                    <stop offset="100%" stop-color="#0e7490"/>
                </linearGradient>
                <filter id="energy_turbulence_ascended">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" seed="12">
                         <animate attributeName="baseFrequency" dur="0.5s" values="0.8; 1; 0.8" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale="2" />
                </filter>
            </defs>
            <g filter="url(#shadow_rune_ascended)">
                <!-- Main Float Animation -->
                <g>
                    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -12; 0 0" dur="10s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"/>
                    
                    <!-- Orbiting Crystals -->
                    <g filter="url(#runeGlow_ascended)" opacity="0.8">
                        <g>
                            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="20s" repeatCount="indefinite"/>
                            <path d="M 0 45 L 10 50 L 0 55 Z" fill="url(#runeCrystalGrad_ascended)"/>
                        </g>
                        <g>
                            <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="25s" repeatCount="indefinite" begin="-5s"/>
                            <path d="M 100 55 L 90 50 L 100 45 Z" fill="url(#runeCrystalGrad_ascended)"/>
                        </g>
                    </g>

                    <!-- Core/Body Fragments -->
                    <g>
                         <!-- Heartstone -->
                        <g filter="url(#runeGlow_ascended)">
                             <circle cx="50" cy="65" r="10" fill="url(#runeHeartGrad_ascended)">
                                <animate attributeName="r" values="10; 12; 10" dur="4s" repeatCount="indefinite"/>
                            </circle>
                        </g>
                        <circle cx="50" cy="65" r="10" fill="url(#runeHeartGrad_ascended)"/>
                        
                        <!-- Main torso rock -->
                        <path d="M 30 90 L 25 55 L 75 55 L 70 90 Z" fill="url(#runeStoneGrad_ascended)" stroke="#292524" stroke-width="2"/>
                        
                        <!-- Floating shoulder rocks -->
                        <g>
                            <animateTransform attributeName="transform" type="translate" values="0 0; 0 -3; 0 0" dur="8s" repeatCount="indefinite" begin="-1s" calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"/>
                             <path d="M 25 55 L 15 50 L 30 35 Z" fill="url(#runeStoneGrad_ascended)" stroke="#292524" stroke-width="1.5"/>
                        </g>
                         <g>
                            <animateTransform attributeName="transform" type="translate" values="0 0; 0 -3; 0 0" dur="8s" repeatCount="indefinite" begin="-3s" calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"/>
                            <path d="M 75 55 L 85 50 L 70 35 Z" fill="url(#runeStoneGrad_ascended)" stroke="#292524" stroke-width="1.5"/>
                        </g>
                    </g>
                    
                    <!-- Energy Tendrils -->
                    <g stroke="#a5f3fc" stroke-width="2" fill="none" opacity="0.6" filter="url(#energy_turbulence_ascended)">
                        <path d="M 40 60 C 30 50, 20 50, 20 40"/>
                        <path d="M 60 60 C 70 50, 80 50, 80 40"/>
                        <path d="M 50 55 C 45 45, 40 35, 45 25"/>
                    </g>

                    <!-- Head/Eye Assembly -->
                    <g>
                        <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"/>
                        <!-- Crown fragments orbiting the eye -->
                        <g>
                             <animateTransform attributeName="transform" type="rotate" from="0 50 25" to="360 50 25" dur="15s" repeatCount="indefinite"/>
                             <path d="M 30 20 L 35 15 L 40 20 Z" fill="url(#runeStoneGrad_ascended)" stroke="#292524" stroke-width="1"/>
                             <path d="M 70 20 L 65 15 L 60 20 Z" fill="url(#runeStoneGrad_ascended)" stroke="#292524" stroke-width="1"/>
                             <path d="M 50 5 L 45 10 L 55 10 Z" fill="url(#runeStoneGrad_ascended)" stroke="#292524" stroke-width="1"/>
                        </g>

                        <!-- Galactic Eye -->
                        <g>
                            <g filter="url(#runeGlow_ascended)">
                                <circle cx="50" cy="25" r="12" fill="url(#runeEyeGalaxy_ascended)"/>
                            </g>
                            <!-- Swirling nebula inside the eye -->
                            <g clip-path="url(#eye-clip)">
                                <circle id="eye-clip-shape" cx="50" cy="25" r="12"/>
                                <g opacity="0.5">
                                    <path d="M 40 25 a 10 5 0 0 1 20 0" fill="none" stroke="#e0f2fe" stroke-width="2">
                                         <animateTransform attributeName="transform" type="rotate" from="0 50 25" to="360 50 25" dur="8s" repeatCount="indefinite"/>
                                    </path>
                                    <path d="M 45 25 a 5 10 0 0 0 10 0" fill="none" stroke="#e0f2fe" stroke-width="1.5">
                                         <animateTransform attributeName="transform" type="rotate" from="360 50 25" to="0 50 25" dur="12s" repeatCount="indefinite"/>
                                    </path>
                                </g>
                            </g>
                            <circle cx="50" cy="25" r="12" fill="none" stroke="#083344" stroke-width="1.5"/>
                        </g>
                    </g>
                </g>
                <!-- Shadow -->
                <ellipse cx="50" cy="105" rx="35" ry="5" fill="black" opacity="0.2">
                    <animate attributeName="ry" values="5; 1.5; 5" dur="10s" repeatCount="indefinite" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" calcMode="spline"/>
                    <animate attributeName="opacity" values="0.2; 0.08; 0.2" dur="10s" repeatCount="indefinite" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" calcMode="spline"/>
                </ellipse>
            </g>
        </svg>`
    },
    {
        id: 'Dot',
        svg: `<svg viewBox="-10 -15 120 120" xmlns="http://www.w3.org/2000/svg">
            <title>Dot the Robot</title>
            <defs>
                <filter id="shadow_robot" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="3" dy="5" stdDeviation="3" flood-color="#000000" flood-opacity="0.25"/>
                </filter>
                 <linearGradient id="robotBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#f9fafb" />
                    <stop offset="100%" stop-color="#9ca3af" />
                </linearGradient>
                 <linearGradient id="robotHeadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#e5e7eb" />
                    <stop offset="100%" stop-color="#d1d5db" />
                </linearGradient>
                 <radialGradient id="eyeGlow">
                    <stop offset="0%" stop-color="#059669" />
                    <stop offset="100%" stop-color="#10b981" />
                </radialGradient>
                 <linearGradient id="visorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#4b5563" stop-opacity="0.8"/>
                    <stop offset="100%" stop-color="#1f2937"/>
                </linearGradient>
            </defs>
            <g filter="url(#shadow_robot)">
                <!-- Hover animation group -->
                <g>
                    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -5; 0 0" dur="6s" repeatCount="indefinite" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" calcMode="spline"/>
                     <animateTransform attributeName="transform" type="rotate" values="0 50 50; 1 50 50; -1 50 50; 0 50 50" dur="8s" repeatCount="indefinite" additive="sum" />
                    
                    <!-- Antenna -->
                    <g>
                        <line x1="50" y1="15" x2="50" y2="5" stroke="#9ca3af" stroke-width="3" stroke-linecap="round"/>
                        <circle cx="50" cy="5" r="4" fill="#3b82f6"/>
                        <!-- Signal pulse -->
                        <circle cx="50" cy="5" r="4" stroke="#60a5fa" stroke-width="2" fill="none" opacity="0">
                            <animate attributeName="r" values="4; 10" dur="4s" repeatCount="indefinite"/>
                             <animate attributeName="opacity" values="1; 0" dur="4s" repeatCount="indefinite"/>
                        </circle>
                         <circle cx="50" cy="5" r="4" stroke="#60a5fa" stroke-width="2" fill="none" opacity="0">
                            <animate attributeName="r" values="4; 12" dur="4s" repeatCount="indefinite" begin="-1s"/>
                             <animate attributeName="opacity" values="1; 0" dur="4s" repeatCount="indefinite" begin="-1s"/>
                        </circle>
                    </g>
                    
                    <!-- Head -->
                    <rect x="25" y="15" width="50" height="40" rx="10" fill="url(#robotHeadGradient)" stroke="#4b5563" stroke-width="1.5"/>
                    <rect x="24" y="14" width="52" height="42" rx="11" fill="none" stroke="white" stroke-opacity="0.2" stroke-width="1.5"/>
                    
                    <!-- Eye -->
                    <rect x="35" y="25" width="30" height="15" rx="5" fill="url(#visorGradient)"/>
                    <rect x="37" y="30" width="6" height="5" fill="url(#eyeGlow)" rx="1">
                        <animate attributeName="x" values="37; 57; 37" dur="6s" repeatCount="indefinite" />
                    </rect>
                    
                    <!-- Body -->
                    <rect x="20" y="55" width="60" height="35" rx="10" fill="url(#robotBodyGradient)" stroke="#4b5563" stroke-width="1.5"/>
                    <rect x="19" y="54" width="62" height="37" rx="11" fill="none" stroke="white" stroke-opacity="0.2" stroke-width="1.5"/>

                    <circle cx="50" cy="72" r="8" fill="#d1d5db" stroke="#4b5563" stroke-width="1.5"/>
                    <!-- Indicator lights -->
                    <g>
                        <circle cx="28" cy="62" r="1.5" fill="#f87171"><animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite"/></circle>
                        <circle cx="28" cy="68" r="1.5" fill="#4ade80"><animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" begin="-0.5s"/></circle>
                        <circle cx="28" cy="74" r="1.5" fill="#fbbf24"><animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" begin="-1s"/></circle>
                        <circle cx="72" cy="78" r="1.5" fill="#38bdf8"><animate attributeName="opacity" values="1;0.3;1" dur="2.4s" repeatCount="indefinite" begin="-0.2s"/></circle>
                    </g>
                    
                    <!-- Arms and Fingers -->
                    <g>
                         <animateTransform attributeName="transform" type="rotate" values="0 25 62.5; -10 25 62.5; 0 25 62.5" dur="8s" repeatCount="indefinite" begin="-2s" />
                        <g fill="#9ca3af" stroke="#4b5563" stroke-width="1.5">
                            <rect x="10" y="60" width="15" height="5" rx="2.5"/>
                            <circle cx="25" cy="62.5" r="3"/>
                            <!-- Fingers -->
                            <g stroke-linecap="round" stroke-linejoin="round">
                                 <path d="M 5 58 L 10 60">
                                     <animateTransform attributeName="transform" type="rotate" values="0 10 60; 10 10 60; 0 10 60" dur="4s" repeatCount="indefinite"/>
                                 </path>
                                  <path d="M 5 66 L 10 64">
                                       <animateTransform attributeName="transform" type="rotate" values="0 10 64; -10 10 64; 0 10 64" dur="4s" repeatCount="indefinite"/>
                                  </path>
                            </g>
                        </g>
                    </g>
                     <g>
                         <animateTransform attributeName="transform" type="rotate" values="0 75 62.5; 10 75 62.5; 0 75 62.5" dur="8s" repeatCount="indefinite"/>
                        <g fill="#9ca3af" stroke="#4b5563" stroke-width="1.5">
                             <rect x="75" y="60" width="15" height="5" rx="2.5"/>
                            <circle cx="75" cy="62.5" r="3"/>
                             <!-- Fingers -->
                            <g stroke-linecap="round" stroke-linejoin="round">
                                 <path d="M 95 58 L 90 60">
                                     <animateTransform attributeName="transform" type="rotate" values="0 90 60; -10 90 60; 0 90 60" dur="4s" repeatCount="indefinite" begin="-1s"/>
                                 </path>
                                  <path d="M 95 66 L 90 64">
                                       <animateTransform attributeName="transform" type="rotate" values="0 90 64; 10 90 64; 0 90 64" dur="4s" repeatCount="indefinite" begin="-1s"/>
                                  </path>
                            </g>
                        </g>
                    </g>
                </g>
                
                <!-- Shadow -->
                <ellipse cx="50" cy="98" rx="25" ry="5" fill="black" opacity="0.15">
                    <animate attributeName="ry" values="5; 2; 5" dur="6s" repeatCount="indefinite" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" calcMode="spline"/>
                    <animate attributeName="opacity" values="0.15; 0.05; 0.15" dur="6s" repeatCount="indefinite" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" calcMode="spline"/>
                </ellipse>
            </g>
        </svg>`
    },
    {
        id: 'Cosmo',
        svg: `<svg viewBox="-10 -15 120 120" xmlns="http://www.w3.org/2000/svg">
            <title>Cosmo the Astronaut</title>
            <defs>
                <filter id="shadow_cosmo" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="3" dy="5" stdDeviation="3" flood-color="#000000" flood-opacity="0.2"/>
                </filter>
                <linearGradient id="cosmoBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#f3f4f6"/>
                    <stop offset="100%" stop-color="#9ca3af"/>
                </linearGradient>
                <radialGradient id="cosmoVisorGradient" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" stop-color="#60a5fa" stop-opacity="0.5"/>
                    <stop offset="100%" stop-color="#1e3a8a" stop-opacity="0.8"/>
                </radialGradient>
                <radialGradient id="cosmoEyeGradient">
                    <stop offset="0%" stop-color="#e0f2fe"/>
                    <stop offset="100%" stop-color="#38bdf8"/>
                </radialGradient>
                <filter id="cosmoEyeGlow">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.5"/>
                </filter>
            </defs>
            <g filter="url(#shadow_cosmo)">
                <!-- Main Float Animation -->
                <g>
                    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -8; 0 0" dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"/>

                    <!-- Antenna -->
                    <line x1="50" y1="20" x2="50" y2="10" stroke="#9ca3af" stroke-width="3" stroke-linecap="round"/>
                    <circle cx="50" cy="10" r="4" fill="#ef4444"/>
                    <circle cx="50" cy="10" r="4" stroke="#f87171" stroke-width="2" fill="none">
                        <animate attributeName="r" values="4; 8" dur="3s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="1; 0" dur="3s" repeatCount="indefinite"/>
                    </circle>

                    <!-- Head/Body -->
                    <ellipse cx="50" cy="50" rx="30" ry="28" fill="url(#cosmoBodyGradient)" stroke="#4b5563" stroke-width="2"/>

                    <!-- Visor -->
                    <circle cx="50" cy="45" r="20" fill="url(#cosmoVisorGradient)"/>
                    <path d="M 35 30 C 45 25, 55 25, 65 30" stroke="white" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.4">
                         <animateTransform attributeName="transform" type="translate" values="0 0; 0 20; 0 0" dur="6s" repeatCount="indefinite" begin="-2s"/>
                    </path>
                    
                    <!-- Eye -->
                    <g filter="url(#cosmoEyeGlow)">
                         <ellipse cx="50" cy="45" rx="8" ry="10" fill="url(#cosmoEyeGradient)"/>
                    </g>
                    <ellipse cx="50" cy="45" rx="8" ry="10" fill="url(#cosmoEyeGradient)"/>
                    <ellipse cx="50" cy="45" rx="3" ry="4" fill="#0c4a6e"/>
                    <circle cx="48" cy="42" r="1.5" fill="white" opacity="0.9"/>
                    
                    <!-- Cheek highlights -->
                    <g opacity="0.6">
                         <ellipse cx="35" cy="55" rx="5" ry="3" fill="#fb7185">
                             <animate attributeName="opacity" values="0.6; 0.2; 0.6" dur="4s" repeatCount="indefinite"/>
                         </ellipse>
                         <ellipse cx="65" cy="55" rx="5" ry="3" fill="#fb7185">
                              <animate attributeName="opacity" values="0.6; 0.2; 0.6" dur="4s" repeatCount="indefinite" begin="-2s"/>
                         </ellipse>
                    </g>

                    <!-- Feet/Boosters -->
                    <g>
                        <rect x="35" y="75" width="10" height="5" rx="2" fill="#64748b"/>
                        <rect x="55" y="75" width="10" height="5" rx="2" fill="#64748b"/>
                        <!-- Booster flame -->
                        <path d="M 37 80 l 3 5 l 3 -5 Z M 57 80 l 3 5 l 3 -5 Z" fill="#60a5fa">
                             <animate attributeName="d" values="M 37 80 l 3 5 l 3 -5 Z M 57 80 l 3 5 l 3 -5 Z; M 37 80 l 3 8 l 3 -8 Z M 57 80 l 3 8 l 3 -8 Z; M 37 80 l 3 5 l 3 -5 Z M 57 80 l 3 5 l 3 -5 Z" dur="0.5s" repeatCount="indefinite"/>
                        </path>
                    </g>
                </g>
                
                <!-- Shadow -->
                <ellipse cx="50" cy="98" rx="20" ry="4" fill="black" opacity="0.1">
                    <animate attributeName="ry" values="4; 2; 4" dur="5s" repeatCount="indefinite" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" calcMode="spline"/>
                    <animate attributeName="opacity" values="0.1; 0.05; 0.1" dur="5s" repeatCount="indefinite" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" calcMode="spline"/>
                </ellipse>
            </g>
        </svg>`
    }
];
