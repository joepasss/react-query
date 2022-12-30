import { FC } from "react";

interface PersonProps {
  name: string;
  hairColor: string;
  eyeColor: string;
}

const Person: FC<PersonProps> = ({ name, hairColor, eyeColor }) => {
  return (
    <li>
      {name}
      <ul>
        <li>hair: {hairColor}</li>
        <li>eyes: {eyeColor}</li>
      </ul>
    </li>
  );
};

export default Person;
