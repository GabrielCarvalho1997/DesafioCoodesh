import {createTheme} from "@mui/material";
import {ptBR} from "@mui/material/locale";


export const theme = createTheme({
    components: {
        MuiGrid: {
            styleOverrides: {
                root: {
                    fontSize: 12
                }
            }
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    fontSize: 12
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontSize: 12
                }
            }
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    marginBottom: 10
                }
            }
        },
    }
}, ptBR);


