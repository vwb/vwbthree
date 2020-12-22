module.exports = {
    webpack: function(config) {
        config.module.rules.push({
            test: /\.md$/,
            use: "raw-loader"
        });
        return config;
    },
    images: {
        domains: ['vwbthree-photos.s3-us-west-1.amazonaws.com'],
    },
};
