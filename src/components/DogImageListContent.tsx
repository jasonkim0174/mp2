import { useEffect, useState } from "react";
import { DogImageResponse } from "../interfaces/Dog";  
import DogImagePreview from "./DogImagePreview";  
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
  margin: 20px;
`;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;  
  width: 150px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const DogImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export default function DogImageListContent() {
    const [numImages, setNumImages] = useState(3);  
    const [dogImages, setDogImages] = useState<DogImageResponse[]>([]);  

    useEffect(() => {
      async function getDogImages() {
        const fetchedImages: DogImageResponse[] = [];
        for (let i = 0; i < numImages; i++) {
          const res = await fetch("https://dog.ceo/api/breeds/image/random");
          const data = await res.json();
          
          let breedName = data.message.split("/")[4];
          breedName = breedName.split("-").reverse().join(" ");

          const dogInfo: DogImageResponse = {
            ...data,
            breedName,
            source: "Dog CEO API",
          };

          fetchedImages.push(dogInfo);
        }
        setDogImages(fetchedImages);
      }
      getDogImages();
    }, [numImages]);  

    return (
      <Container>
        <Title>Random Dog Generator</Title> 
        <StyledInput 
          type="number" 
          placeholder="Number of dogs" 
          value={numImages}
          onChange={(e) => setNumImages(Number(e.target.value))} 
        />
        <DogImageGrid>
          {
            dogImages.map((dog, index) => <DogImagePreview key={index} dog={dog} />)
          }
        </DogImageGrid>
      </Container>
    );
}
