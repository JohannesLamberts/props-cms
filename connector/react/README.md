# How to use

- [General Readme](../../README.md)
- [Changelog](CHANGELOG.md)
- [License](../../LICENSE)

Integrating props-cms into your react app is pretty straight forward:

## Supply Components & API-Connection
### Implement components

for example:

`./cmsCollection/typography` 
```
import * as React from 'react';
import { Typography } from 'material-ui';
import { TypographyProps } from 'material-ui/Typography';

export const CmsTypographyComponent = (props: {
    variant: TypographyProps['variant'];
    text: string;
}) => {
    return (
        <Typography variant={props.variant}>
            {props.text}
        </Typography>
    );
};
```

`./cmsCollection/p`

```
import * as React from 'react';

export default (props: {
    text: string;
}) => {
    return (
        <p>
            {props.text}
        </p>
    );
};
```

### Connect API and components with you app

```
import { CmsConnector } from 'props-cms.connector-react';
import { CmsTypographyComponent } from './cmsCollections/typography';
import { App } from './myApp';

// map collectionTypes to your components
export const CmsCollections = {
    // sync component
    header: CmsTypographyComponent
    // async component
    p: () => import ('./cmsCollections/p'),
}

ReactDOM.render(
    <CmsConnector
        url={`https://urlOfTheAPI`}
        collections={CmsCollections}
    >
        <App />
    </CmsConnector>,
    document.getElementById('root')
);

```


## Query database / render
```
import { CmsImport } from 'props-cms.connector-react';

<nav>
    <CmsImport ident={'navigation'} />
</nav>
<CmsImport ident={'pages'} query={{path: path}}/>
<footer>
    <CmsImport 
        ident={'footer'}
        enclose={(props: (children: React.ReactNode) => (
            <div>
                PREFIX
                {props.children}
                SUFFIX
            </div>
        ))} 
    />
</footer>
```