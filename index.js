const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password, Unsplash } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { NextApp } = require('@keystonejs/app-next');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = "neverwantedtonode";
const mongooseConnectionString = "mongodb+srv://mevepe:4a4a4a4a@heh-wckl0.gcp.mongodb.net/tryme?retryWrites=true&w=majority";

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter({mongoUri: mongooseConnectionString}),
});

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return { id: user.id };
};
const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};
const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: { type: Checkbox },
    password: {
      type: Password,
    },
  },
  // To create an initial user you can temporarily remove access controls
  access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

keystone.createList('Todo', {
  schemaDoc: 'A list of things which need to be done',
  fields: {
    name: { type: Text, schemaDoc: 'This is the thing you need to do' },
  },
});

/*
keystone.createList('Post', {
  fields: {
    body: {
      type: Content,
      blocks: [Content.blocks.blockquote, CloudinaryImage.blocks.image],
    },
  },
});
*/

keystone.createList('UnsplashPicture', {
  fields: {
    name: { type: Text },
    heroImage: {
      type: Unsplash,
      accessKey: 'f6fb64192114b4ee48ecd9e04f13f24e211be28caac5ba575568d9aa0fc24b7a', // Get one from https://unsplash.com/developers
      secretKey: '4211e03a69856ac94ea9b4e1c18dada71881df6542524aca7846b43a21903888',
    },
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new NextApp({ dir: '.' }),
    // To create an initial user you can temporarily remove the authStrategy below
    new AdminUIApp({ enableDefaultRoute: true, authStrategy }),
  ],
};
