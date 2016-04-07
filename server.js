'use strict'

var webpack = require('webpack'),
		WebpackDevServer = require('webpack-dev-server'),
		config = require('./webpack.config')


config.entry.unshift('webpack-dev-server/client?http://localhost:9000', 'webpack/hot/dev-server');
config.plugins.push(new webpack.HotModuleReplacementPlugin());

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	proxy: [{
		path: '/api/*',
		target: 'https://cnodejs.org',
		host: 'cnodejs.org'
	}]
});

server.listen(9000);