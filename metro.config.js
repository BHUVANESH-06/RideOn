const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)
config.resolver.alias = {
    "@/assets": "./assets",
    "@/components": "./components",
    "@/constants": "./constants",
    "@/screens": "./screens",
    "@/types":"./types",
}
module.exports = withNativeWind(config, { input: './global.css' })