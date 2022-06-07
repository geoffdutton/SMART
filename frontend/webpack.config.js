/* eslint-env node */
const webpack = require("webpack");
const path = require("path");

const release = process.env.NODE_ENV === "production";

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

const config = {
    context: path.join(__dirname, "src"),
    devtool: "source-map",
    mode: "development",
    entry: {
        smart: "./smart.jsx",
        globals: "./globals.js",
        admins: "./admins.js"
    },
    devServer: {
        writeToDisk: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                ]
            },
            {
                test: /datatables\.net.*/,
                use: {
                    loader: "imports-loader",
                    options: {
                        additionalCode:
                            "var define = false; /* Disable AMD for misbehaving libraries */"
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "resolve-url-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: release ? "compress" : "expanded"
                            }
                        }
                    }
                ]
            },
            {
                test: require.resolve("jquery"),
                use: [
                    {
                        loader: "expose-loader",
                        options: {
                            exposes: [{
                                globalName: "$",
                                override: true,
                            }, {
                                globalName: "jQuery",
                                override: true,
                            }]
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|gif|html)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(png|ttf|eot|svg|woff(2)?)(\?[a-zA-Z0-9=.]+)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: "[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[chunkhash].js"
    },
    plugins: [
        new StyleLintPlugin({
            context: "/code/src/styles"
        }),
        new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Popper: ["popper.js", "default"]
        }),
        new CleanWebpackPlugin({
            root: path.resolve(),
            verbose: true,
            dry: false
        })
    ],
    resolve: {
        modules: ["node_modules", path.join(__dirname, "src")],
        extensions: [".js", ".jsx"]
    }
};

if (release) {
    config.plugins.push(
        new webpack.DefinePlugin({
            DEBUG: false,
            PRODUCTION: true,
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     mangle: true,
        //     compress: {
        //         warnings: false,
        //         pure_getters: true,
        //         unsafe_comps: true,
        //         screw_ie8: true
        //     },
        //     output: {
        //         comments: false
        //     },
        //     exclude: [/\.min\.js$/gi],
        //     sourceMap: true
        // }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
    );
} else {
    config.performance = {
        assetFilter: function(assetFilename) {
            return (
                assetFilename.endsWith(".js") || assetFilename.endsWith(".css")
            );
        },
        hints: "warning",
        maxEntrypointSize: 1000000
    };

    config.profile = true;

    config.plugins.push(
        new webpack.DefinePlugin({
            DEBUG: true,
            PRODUCTION: false
        })
    );
}

config.plugins.push(
    new webpack.optimize.SplitChunksPlugin({
        name: "vendor",
        minChunks: function(module) {
            return (
                module.context && module.context.indexOf("node_modules") !== -1
            );
        }
    }),
    new webpack.optimize.SplitChunksPlugin({
        name: "manifest",
        minChunks: Infinity
    })
);

module.exports = config;
