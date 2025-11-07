/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// A collection of unique, animated SVG wallpapers for the header background,
// all based on a flowing, abstract "nebula" style.
export const animatedWallpapers: { id: string; svg: string }[] = [
  {
    id: 'Azure Dream',
    svg: `<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="g_bg_azure" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#1e3a8a" />
                    <stop offset="100%" stop-color="#0c0a09" />
                </radialGradient>
                <filter id="f_flow_azure">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="3" seed="2">
                        <animate attributeName="baseFrequency" dur="20s" values="0.01 0.02;0.02 0.01;0.01 0.02" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale="15" />
                </filter>
                <linearGradient id="g_color1_azure">
                    <stop stop-color="#38bdf8" />
                    <stop offset="100%" stop-color="#6366f1" />
                </linearGradient>
                <linearGradient id="g_color2_azure">
                    <stop stop-color="#8b5cf6" />
                    <stop offset="100%" stop-color="#60a5fa" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#g_bg_azure)" />
            <g opacity="0.7">
                <circle fill="#fff" r="0.2"><animate attributeName="opacity" dur="4s" values="1;0.2;1" repeatCount="indefinite" begin="-1s"/><animate attributeName="cx" dur="100s" values="0;100" repeatCount="indefinite"/><animate attributeName="cy" dur="100s" values="10;40" repeatCount="indefinite"/></circle>
                <circle fill="#fff" r="0.3"><animate attributeName="opacity" dur="3s" values="0.2;1;0.2" repeatCount="indefinite" begin="-2s"/><animate attributeName="cx" dur="80s" values="100;0" repeatCount="indefinite"/><animate attributeName="cy" dur="80s" values="80;20" repeatCount="indefinite"/></circle>
            </g>
            <g filter="url(#f_flow_azure)" opacity="0.6">
                <rect width="150" height="150" x="-25" y="-25" fill="url(#g_color1_azure)">
                     <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="40s" repeatCount="indefinite" />
                </rect>
                <rect width="120" height="120" x="-10" y="-10" fill="url(#g_color2_azure)">
                     <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="35s" repeatCount="indefinite" begin="-5s" />
                </rect>
            </g>
        </svg>`
  },
  {
    id: 'Veridian Nebula',
    svg: `<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="g_bg_veridian" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#062024" />
                    <stop offset="100%" stop-color="#0c0a09" />
                </radialGradient>
                <filter id="f_flow_veridian">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="3" seed="3">
                        <animate attributeName="baseFrequency" dur="20s" values="0.01 0.02;0.02 0.01;0.01 0.02" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale="15" />
                </filter>
                <linearGradient id="g_color1_veridian">
                    <stop stop-color="#10b981" />
                    <stop offset="100%" stop-color="#0d9488" />
                </linearGradient>
                <linearGradient id="g_color2_veridian">
                    <stop stop-color="#f59e0b" />
                    <stop offset="100%" stop-color="#d97706" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#g_bg_veridian)" />
            <g opacity="0.7">
                <circle fill="#fff" r="0.2"><animate attributeName="opacity" dur="4s" values="1;0.2;1" repeatCount="indefinite" begin="-1.5s"/><animate attributeName="cx" dur="100s" values="5;95" repeatCount="indefinite"/><animate attributeName="cy" dur="110s" values="15;45" repeatCount="indefinite"/></circle>
                <circle fill="#fff" r="0.3"><animate attributeName="opacity" dur="3s" values="0.2;1;0.2" repeatCount="indefinite" begin="-2.5s"/><animate attributeName="cx" dur="80s" values="90;10" repeatCount="indefinite"/><animate attributeName="cy" dur="90s" values="70;30" repeatCount="indefinite"/></circle>
            </g>
            <g filter="url(#f_flow_veridian)" opacity="0.6">
                <rect width="150" height="150" x="-25" y="-25" fill="url(#g_color1_veridian)">
                     <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="40s" repeatCount="indefinite" />
                </rect>
                <rect width="120" height="120" x="-10" y="-10" fill="url(#g_color2_veridian)">
                     <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="35s" repeatCount="indefinite" begin="-5s" />
                </rect>
            </g>
        </svg>`
  },
  {
    id: 'Solar Flare',
    svg: `<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="g_bg_solar" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#450a0a" />
                    <stop offset="100%" stop-color="#0c0a09" />
                </radialGradient>
                <filter id="f_flow_solar">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="3" seed="4">
                        <animate attributeName="baseFrequency" dur="20s" values="0.01 0.02;0.02 0.01;0.01 0.02" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale="15" />
                </filter>
                <linearGradient id="g_color1_solar">
                    <stop stop-color="#ef4444" />
                    <stop offset="100%" stop-color="#f97316" />
                </linearGradient>
                <linearGradient id="g_color2_solar">
                    <stop stop-color="#eab308" />
                    <stop offset="100%" stop-color="#dc2626" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#g_bg_solar)" />
            <g opacity="0.7">
                <circle fill="#fff" r="0.2"><animate attributeName="opacity" dur="4s" values="1;0.2;1" repeatCount="indefinite" begin="-1s"/><animate attributeName="cx" dur="100s" values="0;100" repeatCount="indefinite"/><animate attributeName="cy" dur="100s" values="10;40" repeatCount="indefinite"/></circle>
                <circle fill="#fff" r="0.3"><animate attributeName="opacity" dur="3s" values="0.2;1;0.2" repeatCount="indefinite" begin="-2s"/><animate attributeName="cx" dur="80s" values="100;0" repeatCount="indefinite"/><animate attributeName="cy" dur="80s" values="80;20" repeatCount="indefinite"/></circle>
            </g>
            <g filter="url(#f_flow_solar)" opacity="0.65">
                <rect width="150" height="150" x="-25" y="-25" fill="url(#g_color1_solar)">
                     <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="40s" repeatCount="indefinite" />
                </rect>
                <rect width="120" height="120" x="-10" y="-10" fill="url(#g_color2_solar)">
                     <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="35s" repeatCount="indefinite" begin="-5s" />
                </rect>
            </g>
        </svg>`
  },
  {
    id: 'Rose Quartz',
    svg: `<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="g_bg_rose" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#581c87" />
                    <stop offset="100%" stop-color="#0c0a09" />
                </radialGradient>
                <filter id="f_flow_rose">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="3" seed="5">
                        <animate attributeName="baseFrequency" dur="20s" values="0.01 0.02;0.02 0.01;0.01 0.02" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale="15" />
                </filter>
                <linearGradient id="g_color1_rose">
                    <stop stop-color="#f472b6" />
                    <stop offset="100%" stop-color="#d946ef" />
                </linearGradient>
                <linearGradient id="g_color2_rose">
                    <stop stop-color="#a855f7" />
                    <stop offset="100%" stop-color="#ec4899" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#g_bg_rose)" />
            <g opacity="0.7">
                <circle fill="#fff" r="0.2"><animate attributeName="opacity" dur="4s" values="1;0.2;1" repeatCount="indefinite" begin="-1s"/><animate attributeName="cx" dur="100s" values="0;100" repeatCount="indefinite"/><animate attributeName="cy" dur="100s" values="10;40" repeatCount="indefinite"/></circle>
                <circle fill="#fff" r="0.3"><animate attributeName="opacity" dur="3s" values="0.2;1;0.2" repeatCount="indefinite" begin="-2s"/><animate attributeName="cx" dur="80s" values="100;0" repeatCount="indefinite"/><animate attributeName="cy" dur="80s" values="80;20" repeatCount="indefinite"/></circle>
            </g>
            <g filter="url(#f_flow_rose)" opacity="0.6">
                <rect width="150" height="150" x="-25" y="-25" fill="url(#g_color1_rose)">
                     <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="40s" repeatCount="indefinite" />
                </rect>
                <rect width="120" height="120" x="-10" y="-10" fill="url(#g_color2_rose)">
                     <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="35s" repeatCount="indefinite" begin="-5s" />
                </rect>
            </g>
        </svg>`
  },
   {
    id: 'Boreal Glow',
    svg: `<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="g_bg_boreal" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#14532d" />
                    <stop offset="100%" stop-color="#0c0a09" />
                </radialGradient>
                <filter id="f_flow_boreal">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="3" seed="6">
                        <animate attributeName="baseFrequency" dur="20s" values="0.01 0.02;0.02 0.01;0.01 0.02" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale="15" />
                </filter>
                <linearGradient id="g_color1_boreal">
                    <stop stop-color="#84cc16" />
                    <stop offset="100%" stop-color="#22c55e" />
                </linearGradient>
                <linearGradient id="g_color2_boreal">
                    <stop stop-color="#16a34a" />
                    <stop offset="100%" stop-color="#14b8a6" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#g_bg_boreal)" />
            <g opacity="0.7">
                <circle fill="#fff" r="0.2"><animate attributeName="opacity" dur="4s" values="1;0.2;1" repeatCount="indefinite" begin="-1s"/><animate attributeName="cx" dur="100s" values="0;100" repeatCount="indefinite"/><animate attributeName="cy" dur="100s" values="10;40" repeatCount="indefinite"/></circle>
                <circle fill="#fff" r="0.3"><animate attributeName="opacity" dur="3s" values="0.2;1;0.2" repeatCount="indefinite" begin="-2s"/><animate attributeName="cx" dur="80s" values="100;0" repeatCount="indefinite"/><animate attributeName="cy" dur="80s" values="80;20" repeatCount="indefinite"/></circle>
            </g>
            <g filter="url(#f_flow_boreal)" opacity="0.6">
                <rect width="150" height="150" x="-25" y="-25" fill="url(#g_color1_boreal)">
                     <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="40s" repeatCount="indefinite" />
                </rect>
                <rect width="120" height="120" x="-10" y="-10" fill="url(#g_color2_boreal)">
                     <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="35s" repeatCount="indefinite" begin="-5s" />
                </rect>
            </g>
        </svg>`
  },
  {
    id: 'Glacial Flow',
    svg: `<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="g_bg_glacial" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#334155" />
                    <stop offset="100%" stop-color="#0c0a09" />
                </radialGradient>
                <filter id="f_flow_glacial">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="3" seed="7">
                        <animate attributeName="baseFrequency" dur="20s" values="0.01 0.02;0.02 0.01;0.01 0.02" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale="15" />
                </filter>
                <linearGradient id="g_color1_glacial">
                    <stop stop-color="#67e8f9" />
                    <stop offset="100%" stop-color="#94a3b8" />
                </linearGradient>
                <linearGradient id="g_color2_glacial">
                    <stop stop-color="#475569" />
                    <stop offset="100%" stop-color="#22d3ee" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#g_bg_glacial)" />
            <g opacity="0.7">
                <circle fill="#fff" r="0.2"><animate attributeName="opacity" dur="4s" values="1;0.2;1" repeatCount="indefinite" begin="-1s"/><animate attributeName="cx" dur="100s" values="0;100" repeatCount="indefinite"/><animate attributeName="cy" dur="100s" values="10;40" repeatCount="indefinite"/></circle>
                <circle fill="#fff" r="0.3"><animate attributeName="opacity" dur="3s" values="0.2;1;0.2" repeatCount="indefinite" begin="-2s"/><animate attributeName="cx" dur="80s" values="100;0" repeatCount="indefinite"/><animate attributeName="cy" dur="80s" values="80;20" repeatCount="indefinite"/></circle>
            </g>
            <g filter="url(#f_flow_glacial)" opacity="0.6">
                <rect width="150" height="150" x="-25" y="-25" fill="url(#g_color1_glacial)">
                     <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="40s" repeatCount="indefinite" />
                </rect>
                <rect width="120" height="120" x="-10" y="-10" fill="url(#g_color2_glacial)">
                     <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="35s" repeatCount="indefinite" begin="-5s" />
                </rect>
            </g>
        </svg>`
  },
  {
    id: 'Midnight Majesty',
    svg: `<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="g_bg_midnight" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#172554" />
                    <stop offset="100%" stop-color="#0c0a09" />
                </radialGradient>
                <filter id="f_flow_midnight">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="3" seed="8">
                        <animate attributeName="baseFrequency" dur="20s" values="0.01 0.02;0.02 0.01;0.01 0.02" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale="15" />
                </filter>
                <linearGradient id="g_color1_midnight">
                    <stop stop-color="#2563eb" />
                    <stop offset="100%" stop-color="#7e22ce" />
                </linearGradient>
                <linearGradient id="g_color2_midnight">
                    <stop stop-color="#4f46e5" />
                    <stop offset="100%" stop-color="#3b82f6" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#g_bg_midnight)" />
            <g opacity="0.7">
                <circle fill="#fff" r="0.2"><animate attributeName="opacity" dur="4s" values="1;0.2;1" repeatCount="indefinite" begin="-1s"/><animate attributeName="cx" dur="100s" values="0;100" repeatCount="indefinite"/><animate attributeName="cy" dur="100s" values="10;40" repeatCount="indefinite"/></circle>
                <circle fill="#fff" r="0.3"><animate attributeName="opacity" dur="3s" values="0.2;1;0.2" repeatCount="indefinite" begin="-2s"/><animate attributeName="cx" dur="80s" values="100;0" repeatCount="indefinite"/><animate attributeName="cy" dur="80s" values="80;20" repeatCount="indefinite"/></circle>
            </g>
            <g filter="url(#f_flow_midnight)" opacity="0.6">
                <rect width="150" height="150" x="-25" y="-25" fill="url(#g_color1_midnight)">
                     <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="40s" repeatCount="indefinite" />
                </rect>
                <rect width="120" height="120" x="-10" y="-10" fill="url(#g_color2_midnight)">
                     <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="35s" repeatCount="indefinite" begin="-5s" />
                </rect>
            </g>
        </svg>`
  },
  {
    id: 'Autumn Embers',
    svg: `<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="g_bg_autumn" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#422006" />
                    <stop offset="100%" stop-color="#0c0a09" />
                </radialGradient>
                <filter id="f_flow_autumn">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="3" seed="9">
                        <animate attributeName="baseFrequency" dur="20s" values="0.01 0.02;0.02 0.01;0.01 0.02" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale="15" />
                </filter>
                <linearGradient id="g_color1_autumn">
                    <stop stop-color="#f59e0b" />
                    <stop offset="100%" stop-color="#fb923c" />
                </linearGradient>
                <linearGradient id="g_color2_autumn">
                    <stop stop-color="#b91c1c" />
                    <stop offset="100%" stop-color="#ef4444" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#g_bg_autumn)" />
            <g opacity="0.7">
                <circle fill="#fff" r="0.2"><animate attributeName="opacity" dur="4s" values="1;0.2;1" repeatCount="indefinite" begin="-1s"/><animate attributeName="cx" dur="100s" values="0;100" repeatCount="indefinite"/><animate attributeName="cy" dur="100s" values="10;40" repeatCount="indefinite"/></circle>
                <circle fill="#fff" r="0.3"><animate attributeName="opacity" dur="3s" values="0.2;1;0.2" repeatCount="indefinite" begin="-2s"/><animate attributeName="cx" dur="80s" values="100;0" repeatCount="indefinite"/><animate attributeName="cy" dur="80s" values="80;20" repeatCount="indefinite"/></circle>
            </g>
            <g filter="url(#f_flow_autumn)" opacity="0.6">
                <rect width="150" height="150" x="-25" y="-25" fill="url(#g_color1_autumn)">
                     <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="40s" repeatCount="indefinite" />
                </rect>
                <rect width="120" height="120" x="-10" y="-10" fill="url(#g_color2_autumn)">
                     <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="35s" repeatCount="indefinite" begin="-5s" />
                </rect>
            </g>
        </svg>`
  },
  {
    id: 'Cosmic Ocean',
    svg: `<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="g_bg_ocean" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#0f172a" />
                    <stop offset="100%" stop-color="#0c0a09" />
                </radialGradient>
                <filter id="f_flow_ocean">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="3" seed="10">
                        <animate attributeName="baseFrequency" dur="20s" values="0.01 0.02;0.02 0.01;0.01 0.02" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale="15" />
                </filter>
                <linearGradient id="g_color1_ocean">
                    <stop stop-color="#14b8a6" />
                    <stop offset="100%" stop-color="#22d3ee" />
                </linearGradient>
                <linearGradient id="g_color2_ocean">
                    <stop stop-color="#4338ca" />
                    <stop offset="100%" stop-color="#6d28d9" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#g_bg_ocean)" />
            <g opacity="0.7">
                <circle fill="#fff" r="0.2"><animate attributeName="opacity" dur="4s" values="1;0.2;1" repeatCount="indefinite" begin="-1s"/><animate attributeName="cx" dur="100s" values="0;100" repeatCount="indefinite"/><animate attributeName="cy" dur="100s" values="10;40" repeatCount="indefinite"/></circle>
                <circle fill="#fff" r="0.3"><animate attributeName="opacity" dur="3s" values="0.2;1;0.2" repeatCount="indefinite" begin="-2s"/><animate attributeName="cx" dur="80s" values="100;0" repeatCount="indefinite"/><animate attributeName="cy" dur="80s" values="80;20" repeatCount="indefinite"/></circle>
            </g>
            <g filter="url(#f_flow_ocean)" opacity="0.6">
                <rect width="150" height="150" x="-25" y="-25" fill="url(#g_color1_ocean)">
                     <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="40s" repeatCount="indefinite" />
                </rect>
                <rect width="120" height="120" x="-10" y="-10" fill="url(#g_color2_ocean)">
                     <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="35s" repeatCount="indefinite" begin="-5s" />
                </rect>
            </g>
        </svg>`
  },
  {
    id: 'Orion\'s Belt',
    svg: `<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="g_bg_orion" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#2e1065" />
                    <stop offset="100%" stop-color="#0c0a09" />
                </radialGradient>
                <filter id="f_flow_orion">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="3" seed="11">
                        <animate attributeName="baseFrequency" dur="20s" values="0.01 0.02;0.02 0.01;0.01 0.02" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale="15" />
                </filter>
                <linearGradient id="g_color1_orion">
                    <stop stop-color="#f59e0b" />
                    <stop offset="100%" stop-color="#d97706" />
                </linearGradient>
                <linearGradient id="g_color2_orion">
                    <stop stop-color="#a855f7" />
                    <stop offset="100%" stop-color="#9333ea" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#g_bg_orion)" />
            <g opacity="0.7">
                <circle fill="#fff" r="0.2"><animate attributeName="opacity" dur="4s" values="1;0.2;1" repeatCount="indefinite" begin="-1s"/><animate attributeName="cx" dur="100s" values="0;100" repeatCount="indefinite"/><animate attributeName="cy" dur="100s" values="10;40" repeatCount="indefinite"/></circle>
                <circle fill="#fff" r="0.3"><animate attributeName="opacity" dur="3s" values="0.2;1;0.2" repeatCount="indefinite" begin="-2s"/><animate attributeName="cx" dur="80s" values="100;0" repeatCount="indefinite"/><animate attributeName="cy" dur="80s" values="80;20" repeatCount="indefinite"/></circle>
            </g>
            <g filter="url(#f_flow_orion)" opacity="0.6">
                <rect width="150" height="150" x="-25" y="-25" fill="url(#g_color1_orion)">
                     <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="40s" repeatCount="indefinite" />
                </rect>
                <rect width="120" height="120" x="-10" y="-10" fill="url(#g_color2_orion)">
                     <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="35s" repeatCount="indefinite" begin="-5s" />
                </rect>
            </g>
        </svg>`
  }
];