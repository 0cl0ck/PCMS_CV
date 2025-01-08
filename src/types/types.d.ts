import 'payload';

declare module 'payload' {
  export type CollectionSlug =
    | 'categories'
    | 'media'
    | 'pages'
    | 'posts'
    | 'forms'
    | 'form-submissions'
    | 'search'
    | 'users'
    | 'products';
}
