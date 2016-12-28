module.exports = {
    // webpack options
    context: __dirname + '/dev/js/wd',
    entry: {
        werneo: './main.js',
    },
    output: {
        path: __dirname + '/dist/js',
        filename: 'werneo.js',
    },

    resolveLoader: {
        modules: [
            __dirname + '\\node_modules',
            'node_modules'
        ]
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                    }
                }],
            },
        ],
    },

    plugins: [],

    stats: {
        // Configure the console output
        colors: true,
        modules: true,
        reasons: true
    },
    // stats: false disables the stats output

    storeStatsTo: "webpackStats", // writes the status to a variable named webpackStats - you may use it later in grunt i.e. <%= webpackStats.hash %>
    //progress: false, // Don't show progress - Defaults to true

    //failOnError: false, // don't report error to grunt if webpack find errors - Use this if webpack errors are tolerable and grunt should continue

    //watch: true, // use webpacks watcher - You need to keep the grunt process alive

    /*watchOptions: {
        aggregateTimeout: 500,
        poll: true
    },*/
    // Use this when you need to fallback to poll based watching (webpack 1.9.1+ only)

    //keepalive: true, // don't finish the grunt task - defaults to true for watch and dev-server otherwise false

    //inline: true,  // embed the webpack-dev-server runtime into the bundle - Defaults to false

    //hot: true, // adds the HotModuleReplacementPlugin and switch the server to hot mode -  Use this in combination with the inline option
}
