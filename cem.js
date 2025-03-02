import {customElementJetBrainsPlugin} from "custom-element-jet-brains-integration";

export default {
    dependencies: true,
    globs: [
        'src/**/*.ts',
    ],
    litelement: true,
    packagejson: true,
    plugins: [customElementJetBrainsPlugin()],
};
