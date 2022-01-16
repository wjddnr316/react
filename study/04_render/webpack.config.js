const path = require('path');
const webpack = require('webpack');
const RefeshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
//node 에서 경로 쉽게 기억하도록 path를 가져옴

module.exports = {
    name : 'webpack-setting',
    mode : 'development', //실서비스에는 production
    devtool : 'eval',// 실서비스에는 hidden-source-map

    target: ['web', 'es5', 'es6'], // ie 에서 안될때 target 지정 필요

    resolve : { // resolve = entry 파일의 확장자를 설정핻주면 entry 에서 확장자 입력 안해도 됨.
        extensions : ['.js','.jsx']
    },
    
    entry : { // 입력
        app : ['./client'],
    },

    module: {
        rules : [{
            test : /\.jsx?/,
            loader : 'babel-loader',
            options : {
                // plugins 들의 모음이 presets
                // if presets 에 또 옵션이 들어올 경우는 배열로
                presets: [
                    // preset-env 는 중요함. 나중에 크로스브라우징 대응할때 사용함. 회사에서 지원하고자 하는 브라우저만 지정해서 설정가능  
                    // 브라우저스리스트 깃허브 https://github.com/browserslist/browserslist
                    ['@babel/preset-env', {
                        targets : {
                            browsers :['> 1% in KR', 'IE 10'], 
                        },
                        debug : true,
                    }],
                    '@babel/preset-react',
                ],

                // //  presets 기본형
                // presets: ['@babel/preset-env','@babel/preset-react'],
                plugins : [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ],
            },
        }]
    },

    plugins : [
        new RefeshWebpackPlugin()
    ],

    output : { // 출력
        //__dirname : 현재경로 , 'dist' 폴더 
        // path 와 publicPath의 차이는 path는 실제경로 publicPath는 가상경로
        path : path.join(__dirname, 'dist'),
        filename : 'app.js',
        publicPath : '/dist/',
    }, 

    // webpack-dev-server 4버전에서는 아래와 같이
    devServer: {
        devMiddleware : { publicPath : '/dist'},
        // 만약 폴더가 같은 위치가 아니라 다를 경우 path.resolve( __dirname, 'src' )
        static : { directory : path.resolve( __dirname )},
        hot : true,
    },
};