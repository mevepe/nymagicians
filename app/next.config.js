const withSass = require('@zeit/next-sass')
const { distDir } = require('../config');

module.exports = withSass({
    distDir: `../${distDir}/www`,
    env: {
      USER_HAS_PORTFOLIO: !!process.env.IFRAMELY_API_KEY,
    },
    /* config options here */ 
})