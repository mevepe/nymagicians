const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { NextApp } = require('@keystonejs/app-next');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const { staticRoute, staticPath, distDir } = require('./config.js');
const { User, Product, StoreCategory, NavigationElement, HeroSection, InfoCardSection, HeroCard,
  Todo, Post, UnsplashPicture, InfoCard, SocialElement } = require('./schema');

const mongooseConnectionString = "mongodb+srv://mevepe:4a4a4a4a@heh-wckl0.gcp.mongodb.net/tryme?retryWrites=true&w=majority";

const keystone = new Keystone({
  name: "neverwantedtonode",
  adapter: new Adapter({ mongoUri: mongooseConnectionString }),
  
  cookieSecret: 'b14a354d08dbb8d0794b7564ad3821a020db5417c5cefb5635059e44d0eeb1f1',
  secureCookies: false,
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

keystone.createList('User', User);
keystone.createList('Product', Product);
keystone.createList('StoreCategory', StoreCategory);
keystone.createList('NavigationElement', NavigationElement);
keystone.createList('HeroSection', HeroSection);
keystone.createList('HeroCard', HeroCard);
keystone.createList('Todo', Todo);
keystone.createList('Post', Post);
keystone.createList('InfoCard', InfoCard);
keystone.createList('UnsplashPicture', UnsplashPicture);
keystone.createList('InfoCardSection', InfoCardSection);
keystone.createList('SocialElement', SocialElement);

const adminApp = new AdminUIApp({
  adminPath: '/admin',
  authStrategy,
  isAccessAllowed: ({ authentication: { item: user } }) => !!user && !!user.isAdmin,
  pages: [
    // {
    //   label: 'A new dashboard',
    //   path: '',
    //   component: require.resolve('./admin/pages/dashboard'),
    // },
    {
      label: 'About this project',
      path: 'about',
      component: require.resolve('./admin/pages/about'),
    },
    {
      label: 'Appearance',
      children: [
        { label: 'Menu', listKey: 'NavigationElement' },
        { label: 'Hero Sections', listKey: 'HeroSection' },
        { label: 'Hero Cards', listKey: 'HeroCard' },
        { label: 'Info Card Sections', listKey: 'InfoCardSection' },
        //{ listKey: 'Comment' },
      ],
    },
    {
      label: 'Store',
      children: [
        { listKey: 'Product' },
        { label: 'Categories', listKey: 'StoreCategory' },
        //{ listKey: 'Comment' },
      ],
    },
    {
      label: 'People',
      children: ['User'],
    },
  ],
});

// module.exports = {
//   keystone,
//   apps: [
//     new GraphQLApp(),
//     adminApp,
//     new NextApp({ dir: 'app' }),
//   ],
//   distDir,
// };

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    //new AdminUIApp({ enableDefaultRoute: false, authStrategy }),
    adminApp,
    new NextApp({ dir: 'app' }),
  ],
  distDir,
};
