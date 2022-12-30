import { FC } from "react";

interface SpeciesProps {
  name: string;
  language: string;
  averageLifespan: string;
}

const Species: FC<SpeciesProps> = ({ name, language, averageLifespan }) => {
  return (
    <li>
      {name}
      <ul>
        <li>language: {language}</li>
        <li>average lifespan: {averageLifespan}</li>
      </ul>
    </li>
  );
};

export default Species;
