import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;


  .loader{
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #3498db;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
    z-index: 2001;

    :before {
      content: "";
      position: absolute;
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #e74c3c;
      -webkit-animation: spin 3s linear infinite;
      animation: spin 3s linear infinite;
    }

    :after {
      content: "";
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #f9c922;
      -webkit-animation: spin 1.5s linear infinite;
      animation: spin 1.5s linear infinite;
    }

    @-webkit-keyframes spin {
      0% {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    @keyframes spin {
      0% {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  }


  .loader-section{
    position: fixed;
    top: 0;
    width: 51%;
    height: 100%;
    background: #eceff1;
    z-index: 1000;
    -webkit-transform: translateX(0);
    -ms-transform: translateX(0);
    transform: translateX(0);

    &.section-left {
      left: 0;
    }

    &.section-right {
      right: 0;
    }
  }


  &.loaded{
    visibility: hidden;
    -webkit-transform: translateY(-100%);
    -ms-transform: translateY(-100%);
    transform: translateY(-100%);
    -webkit-transition: all 0.3s 1s ease-out;
    transition: all 0.3s 1s ease-out;


    .loader{
      opacity: 0;
      -webkit-transition: all 0.3s ease-out;
      transition: all 0.3s ease-out;
    }


    .section-left {
      -webkit-transform: translateX(-100%);
      -ms-transform: translateX(-100%);
      transform: translateX(-100%);
      -webkit-transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }


    .section-right {
      -webkit-transform: translateX(100%);
      -ms-transform: translateX(100%);
      transform: translateX(100%);
      -webkit-transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
`;
