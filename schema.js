const {
    File,
    Text,
    Integer,
    Float,
    Slug,
    Relationship,
    Select,
    Password,
    Checkbox,
    CalendarDay,
    DateTime,
    OEmbed,
    Unsplash,
} = require('@keystonejs/fields');

const { IframelyOEmbedAdapter } = require('@keystonejs/oembed-adapters');

const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');
const { LocalFileAdapter } = require('@keystonejs/file-adapters');
const getYear = require('date-fns/get_year');

const { staticRoute, staticPath, distDir } = require('./config');
const dev = process.env.NODE_ENV !== 'production';

let iframelyAdapter = new IframelyOEmbedAdapter({
    apiKey: "66a1699a4c743d79e34702",
});

const fileAdapter = new LocalFileAdapter({
    src: `${dev ? 'app/' : `${distDir}/`}${staticPath}/uploads`,
    path: `/uploads`,
});

console.log(fileAdapter);

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

exports.User = {
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
        todolist: { type: Relationship, ref: 'Todo.createdBy', many: true },
    },
    // To create an initial user you can temporarily remove access controls
    access: {
        read: access.userIsAdminOrOwner,
        update: access.userIsAdminOrOwner,
        create: access.userIsAdmin,
        delete: access.userIsAdmin,
        auth: true,
    },
};

exports.Product = {
    fields: {
        title: { type: Text },
        slug: { type: Slug, from: 'title' },
        author: {
            type: Relationship,
            ref: 'User',
        },
        categories: {
            type: Relationship,
            ref: 'StoreCategory.products',
            many: true,
        },
        status: {
            type: Select,
            defaultValue: 'draft',
            options: [{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }],
        },
        body: { type: Wysiwyg },
        posted: { type: DateTime, format: 'DD/MM/YYYY' },
        image: { type: File, adapter: fileAdapter },
        price: { type: Float },
    },
    adminConfig: {
        defaultPageSize: 20,
        defaultColumns: 'title, status',
        defaultSort: 'title',
    },
    labelResolver: item => item.title,
};

exports.StoreCategory = {
    fields: {
        name: { type: Text },
        slug: { type: Slug, from: 'name' },
        products: { type: Relationship, ref: 'Product.categories', many: true },
    },
    labelResolver: item => item.name,
};

exports.NavigationElement = {
    schemaDoc: 'Navigation menu elements',
    fields: {
        title: { type: Text },
        url: { type: Text },
        index: { type: Integer, isUnique: true },
    },
    labelResolver: item => item.title,
};

exports.SocialElement = {
    schemaDoc: 'Navigation menu elements',
    fields: {
        title: { type: Text },
        url: { type: Text },
        image: { type: File, adapter: fileAdapter },
    },
    labelResolver: item => item.title,
};

exports.HeroSection = {
    schemaDoc: 'Data to display in hero section',
    fields: {
        title: { type: Text },
        slug: { type: Slug, from: 'title' },
        introText: { type: Wysiwyg },
        buttonText: { type: Text },
        buttonLink: { type: Text },
        sectionType: {
            type: Select,
            defaultValue: 'default',
            options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Default', value: 'default' }
            ],
        },
        status: {
            type: Select,
            defaultValue: 'draft',
            options: [{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }],
        },
        image: { type: File, adapter: fileAdapter },
        usingInfoCards: {
            type: Relationship,
            ref: 'InfoCard',
            many: true,
        },
        showSocial: { type: Checkbox },
        usingSocialMedia: {
            type: Relationship,
            ref: 'SocialElement',
            many: true,
        }
    },
    adminConfig: {
        defaultPageSize: 20,
        defaultColumns: 'title, status',
        defaultSort: 'title',
    },
    labelResolver: item => item.title,
};

exports.HeroCard = {
    fields: {
        title: { type: Text },
        slug: { type: Slug, from: 'title' },
        cardType: {
            type: Select,
            defaultValue: 'default',
            options: [
                { label: 'Small', value: 'small' },
                { label: 'Medium', value: 'medium' },
                { label: 'Default', value: 'default' }
            ],
        },
        status: {
            type: Select,
            defaultValue: 'draft',
            options: [{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }],
        },
        body: { type: Wysiwyg },
        image: { type: File, adapter: fileAdapter },
    },
    adminConfig: {
        defaultPageSize: 20,
        defaultColumns: 'title, status',
        defaultSort: 'title',
    },
    labelResolver: item => item.title,
};

exports.InfoCardSection = {
    schemaDoc: 'Data to display in info card section',
    fields: {
        title: { type: Text },
        slug: { type: Slug, from: 'title' },
        status: {
            type: Select,
            defaultValue: 'draft',
            options: [{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }],
        },
        usingInfoCards: {
            type: Relationship,
            ref: 'InfoCard',
            many: true,
        },
    },
    adminConfig: {
        defaultPageSize: 20,
        defaultColumns: 'title, status',
        defaultSort: 'title',
    },
    labelResolver: item => item.title,
};

exports.InfoCard = {
    fields: {
        title: { type: Text },
        slug: { type: Slug, from: 'title' },
        value: { type: Text },
        body: { type: Wysiwyg },
        image: { type: File, adapter: fileAdapter },
    },
    adminConfig: {
        defaultPageSize: 20,
        defaultColumns: 'title, status',
        defaultSort: 'title',
    },
    labelResolver: item => item.title,
};

exports.Todo = {
    schemaDoc: 'A list of things which need to be done',
    fields: {
        name: { type: Text, schemaDoc: 'This is the thing you need to do' },
        createdBy: { type: Relationship, ref: 'User.todolist', many: true },
    },
};

exports.Post = {
    schemaDoc: 'A list of things which need to be done',
    fields: {
        title: { type: Text },
        votes: { type: Integer },
        url: { type: Text },
        createdAt: { type: Text },
    },
};

exports.UnsplashPicture = {
    fields: {
        name: { type: Text },
        heroImage: {
            type: Unsplash,
            accessKey: 'f6fb64192114b4ee48ecd9e04f13f24e211be28caac5ba575568d9aa0fc24b7a', // Get one from https://unsplash.com/developers
            secretKey: '4211e03a69856ac94ea9b4e1c18dada71881df6542524aca7846b43a21903888',
        },
    },
};