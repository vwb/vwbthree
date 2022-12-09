module.exports = {
    experimental: {
        appDir: true
    },
    webpack: function(config) {
        config.module.rules.push({
            test: /\.md$/,
            use: "raw-loader"
        });
        return config;
    },
    images: {
        domains: [
            "vwbthree-photos.s3-us-west-1.amazonaws.com",
            "ik.imagekit.io",
            "d1vk060ez13nog.cloudfront.net"
        ]
    }
};
