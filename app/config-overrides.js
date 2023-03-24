module.exports = function override(config, env) {
    // Disable hot reloading and live reloading
    config.devServer.hot = false;
    config.devServer.liveReload = false;
  
    return config;
  }