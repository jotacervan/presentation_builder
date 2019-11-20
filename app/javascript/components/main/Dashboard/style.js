import styled from 'styled-components';

export const Actions = styled.div`
  button {
    margin: 0 5px;
  }
  a{
    margin: 0 5px;
  }
`

export const Container =  styled.div`
  margin-top: -15px;

  .dashboard-header{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .mainCard{
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: 70px;

    .indicator{
      font-size:27px;
      background: #ccc;
      padding:0 30px;
      margin-right: 10px;
    }
    .description{
      font-size: 18px;
    }
    *{
      display: flex;
      align-items: center;
    }
  }
`