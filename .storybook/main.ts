import type {StorybookConfig} from "@storybook/web-components-vite";

const config: StorybookConfig = {
    stories: [
        "../src/ui/**/*.mdx",
        "../src/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)"
    ],
    addons: [
        '@storybook/addon-a11y',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@whitespace/storybook-addon-html',
    ],
    framework: {
        name: "@storybook/web-components-vite",
        options: {},
    },
    async viteFinal(config) {
        const {mergeConfig} = await import('vite');
        return mergeConfig(config, {
            assetsInclude: ['/sb-preview/runtime.js'],
            optimizeDeps: {
                include: [
                    '@storybook/web-components',
                    '@whitespace/storybook-addon-html'
                ],
                exclude: ['lit', 'lit-html'],
            },
            define: {
                'process.env': process.env,
            },
            sourcemap: true,
        });
    },
    docs: {
        defaultName: "Overview"
    },
    staticDirs: [
        '../public'
    ],
    managerHead: (head) => `
    ${head}
    <link rel="stylesheet" href="/src/index.scss"/>
    `,
    previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="/src/index.scss"/>
    `,
} satisfies StorybookConfig;

export default config;
