module.exports = function (api) {
    api.cache(true);
  
    const presets = ['@babel/preset-react', '@babel/preset-env'];
    const plugins = [
        '@babel/proposal-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/proposal-class-properties'
    ];
  
    return {
        presets,
        plugins
    };
};
