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
import CollectionDefinitionEditor from './views/collection/definitionEditor/definitionEditor';
import CollectionElementEditor    from './views/collection/elementEditor/editor/elementEditor';
import CollectionElementList      from './views/collection/elementEditor/elementList';
import { CollectionGrid }         from './views/collection/gridList/grid';
import { MediaDashboard }         from './views/media/mediaDashboard';

const links = {
    dashboard: '/dashboard',
    collections: '/media',
    layers: '/collection'
};

const rootPages = {
    '/dashboard': () => 'HELLO THERE',
    '/media':
        () => <MediaDashboard/>,
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
            flexGrow: 1
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