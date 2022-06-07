/* eslint-env node */
const webpack = require("webpack");
const path = require("path");

const release = process.env.NODE_ENV === "production";

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const BundleTracker = require("webpack-bundle-tracker");

const DEV_SERVER_PORT = 3005;

const config = {
    context: path.join(__dirname, "src"),
    devtool: "source-map",
    mode: "development",
    output: {
        publicPath: `http://localhost:${DEV_SERVER_PORT}/static/`,
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[chunkhash].js"
    },
    entry: {
        smart: "./smart.jsx",
        globals: "./globals.js",
        admins: "./admins.js"
    },
    devServer: {
        port: DEV_SERVER_PORT,
        hot: true
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
    plugins: [
        new webpack.DefinePlugin({
            DEBUG: release,
            PRODUCTION: release,
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
        }),
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
        }),
        new BundleTracker({
            path: path.resolve(__dirname),
            filename: "./webpack-stats.json",
        })
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    }
};

module.exports = config;
