import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    body{
        font-family: "Poppins", sans-serif;
    }

    .swal2-popup{
        font-family: "Poppins", sans-serif;
    }

    .swal2-popup .swal2-title{
        padding: 0.8em 1em 0;
        font-size: 1.875em;
        font-weight: 600;
    }

    .swal2-popup .swal2-html-container{
        padding: 1em 1.6em 0.3em;
    }
`;
export default GlobalStyle;
