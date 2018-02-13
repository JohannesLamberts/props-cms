import amber          from 'material-ui/colors/amber';
import indigo         from 'material-ui/colors/indigo';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import './app.css';
import './material.icons.css';

export const LightTheme = createMuiTheme(
    {
        palette: {
            primary: indigo,
            secondary: amber
        },
        overrides: {
            MuiTabs: {
                root: {
                    backgroundColor: '#E8EAF6'
                }
            },
            MuiFormControl: {
                root: {
                    margin: '0.5rem 0'
                },
                fullWidth: {
                    width: 'calc(100% - 1rem)'
                }
            }
        }
    });

export const DarkTheme = createMuiTheme(
    {
        palette: {
            type: 'dark',
            primary: indigo,
            secondary: amber
        }
    });
