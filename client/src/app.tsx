import {
    AppBar,
    Icon,
    MuiThemeProvider,
    Toolbar,
    Typography
}                                 from 'material-ui';
import { Theme }                  from 'material-ui/styles';
import withStyles                 from 'material-ui/styles/withStyles';
import * as React                 from 'react';
import {
    NavLink,
    Redirect,
    Route,
    Switch
}                                 from 'react-router-dom';
import { DarkTheme }              from './styles/theme';
import CollectionDefinitionEditor from './views/components/config/definitionEditor';
import CollectionElementEditor    from './views/components/elements/editor/elementEditor';
import CollectionElementList      from './views/components/elements/elementList';
import CollectionGrid             from './views/components/list';
import MediaDashboard             from './views/media/mediaDashboard';
import MediaEditor                from './views/media/mediaEditor';

const links = {
    dashboard: '/dashboard',
    layers: '/collection',
    collections: '/media'
};

const rootPages = {
    '/dashboard': () => 'HELLO THERE',
    '/media':
        () => <MediaDashboard/>,
    '/media/:providerIdent':
        () => <MediaEditor/>,
    '/collection':
        () => <CollectionGrid/>,
    '/collection/:collIdent/elements':
        () => <CollectionElementList/>,
    '/collection/:collIdent/elements/:elementId':
        () => <CollectionElementEditor/>,
    '/collection/:collIdent':
        () => <CollectionDefinitionEditor/>
};

const styles = (theme: Theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
        height: '100vh',
        '& > *:last-child': {
            flexGrow: 1,
            display: 'flex'
        }
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    } as React.CSSProperties,
    nav: {
        display: 'flex',
        flexFlow: 'row nowrap',
        '& > a': {
            color: 'white',
            padding: '1rem',
            '&:hover, &.active': {
                color: theme.palette.secondary.main
            }
        }
    },
    content: {
        flexGrow: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '1rem'
    } as React.CSSProperties
});

export const AppRoot = withStyles(styles)(({ classes }) => {
    return (
        <div className={classes.root}>
            <header>
                <MuiThemeProvider theme={DarkTheme}>
                    <AppBar position={'static'}>
                        <Toolbar className={classes.toolbar}>
                            <Typography variant={'title'}>
                                CMS
                            </Typography>
                            <nav className={classes.nav}>
                                {Object.keys(links).map(linkIcon => (
                                    <NavLink
                                        key={linkIcon}
                                        to={links[linkIcon]}
                                        activeClassName={'active'}
                                    >
                                        <Icon>{linkIcon}</Icon>
                                    </NavLink>
                                ))}
                            </nav>
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>
            </header>
            <div className={classes.content}>
                <Switch>
                    <Redirect
                        path={'/'}
                        exact={true}
                        to={`/dashboard`}
                    />
                    {Object.keys(rootPages).map(path => (
                        <Route
                            exact={true}
                            key={path}
                            path={path}
                            component={rootPages[path]}
                        />
                    ))}
                </Switch>
            </div>
        </div>
    );
});