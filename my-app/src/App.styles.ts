import styled, {createGlobalStyle} from "styled-components";
import BGImg from "./images/quiz.jpg"
//@ts-ignore

export const GlobalStyle= createGlobalStyle`
html{
    heigth:100%;
}

body{
    background-image:url(${BGImg});
    background-size:cover;
    margin:0;
    padding:0 20px;
    display:flex;
    justify-content:center;
}
`