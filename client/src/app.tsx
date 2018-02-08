import {
    AppBar,
    Icon,
    IconButton,
    MuiThemeProvider,
    Toolbar,
    Typography
}                             from 'material-ui';
import { Theme }              from 'material-ui/styles';
import withStyles             from 'material-ui/styles/withStyles';
import * as React             from 'react';
import {
    Link,
    NavLink,
    Route,
    Switch
}                             from 'react-router-dom';
import { DarkTheme }          from './styles/theme';
import { LibComponentImport } from './util';

const links = {
    layers: '/collection'
};

const rootPages = {
    '/': () => 'HELLO THERE',
    '/collection': LibComponentImport(
        () => import('./views/collection/collection_grid')),
    '/collection/:collectionId/elements': LibComponentImport(
        () => import('./views/collection/element/list')),
    '/collection/:collectionId/elements/:elementId': LibComponentImport(
        () => import('./views/collection/element/editor/editor')),
    '/collection/:collectionId': LibComponentImport(
        () => import('./views/collection/definitionEditor/editor'))
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
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Link to={'/'}>
                                    <IconButton>
                                        <Icon>menu</Icon>
                                    </IconButton>
                                </Link>
                                <Typography variant={'title'}>
                                    CMS
                                </Typography>
                            </div>
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