import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignore: [
    'src/components/ui/**',
    'src/routeTree.gen.ts',
    // Legacy default landing sections (Hero/Stats/Features/HowItWorks/CTA) and
    // their helpers are no longer rendered since the company site replaced the
    // default home fallback, but they are retained per the protected-project-
    // information policy (new-api product references must not be removed).
    'src/features/home/components/**',
    'src/features/home/constants.ts',
    'src/features/home/lib/icon-mapper.tsx',
  ],
  ignoreDependencies: ['tailwindcss', 'tw-animate-css'],
}

export default config
