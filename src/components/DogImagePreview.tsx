import { DogImageResponse } from "../interfaces/Dog";
import { styled } from "styled-components";

const DogImageDiv = styled.div`
  margin: 1rem;
  padding: 1rem;
  width: 30%;
  background-color: skyblue;
  box-sizing: border-box;
`;

const UrlText = styled.p`
  word-wrap: break-word;  
`;

const DogImagePreview = ({dog}: {dog: DogImageResponse}) => {
  return (
    <DogImageDiv>
      <h3><strong>Breed:</strong> {dog.breedName}</h3>
      <UrlText><strong>Image URL:</strong> <a href={dog.message}>{dog.message}</a></UrlText> 
      <p><strong>Status:</strong> {dog.status}</p>
      <p><strong>Source:</strong> {dog.source}</p> 
      <img src={dog.message} alt={dog.breedName} style={{ width: '100%' }} />
    </DogImageDiv>
  );
}

export default DogImagePreview;
