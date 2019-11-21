import styled from 'styled-components';

export const Container =  styled.div`
  margin: -15px auto 0;
  max-width: 1200px;

  .ql-editor{
    min-height:209px;
  }

  .fullWidthField{
    width: 100%;
  }

  .presentationPreview{
    margin:15px 0;
    padding:5px 20px 20px;
  }

  .presentationTitle{
    font-size: 22px;
    margin-bottom: 0px;
    font-weight: bold;
  }

  .presentationContent{
    padding:10px 0;
  }

  .right{
    float:right;
  }

  .buttons{
    display:flex;
    margin:5px 0;
    flex-direction: row;
    justify-content: flex-end;

    button {
      margin-left: 5px;
    }
  }
`