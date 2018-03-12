<h1 align="center">props-cms</h1>

[![CircleCI](https://img.shields.io/circleci/project/github/JohannesLamberts/props-cms/master.svg)]()

This application is still in development. You might want to check 
https://headlesscms.org/ for production-ready CMS.

This project was started, because I found it to be impossible or very cumbersome
to define lists of mixed custom content elements.

```typescript jsx
<div>
    <p>A paragraph</p>
    <img src="wonderfulPicture.jpg" />
    <p>One more paragraph</p>
    <HorizontalListComponent 
        elements={['one', 'two', 'three']} 
    />
</div>
```


## Goal
An easy-to-use, open-source, self-hosted headless CMS.

- Definition of nested content with mixed custom content-types like above
- Separate media-server implementation
  - many-to-many relation between media-servers and content-servers
  - automated image resizing
- Small integration packages
- Live reloads for consuming sites

## Modules

- Client (administration)
- Content Server
- Media Server 
- Integration
  - [React](/connector/react/README.md)


## Progress

- Proof of concept

|Module|Progress|
|---|---|
|Client|1 - Mostly stable, but still needs some work
|Content Server|0 - Development server, no authentification and validation|
|Media Server|0 - Development server, no authentification and validation|
|Integration|**React** 2 - Ready to use