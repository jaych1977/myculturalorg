const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for .ts and .tsx files
config.resolver.sourceExts = [...config.resolver.sourceExts, 'ts', 'tsx'];

// Configure module resolution
config.resolver.extraNodeModules = {};

module.exports = config;
