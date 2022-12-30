import { FC } from "react";
import InfinitePeople from "./people/InfinitePeople";
import InfiniteSpecies from "./species/InfiniteSpecies";

const App: FC = () => {
  return (
    <div className="App">
      <h1>Infinite SWAPI</h1>
      <InfinitePeople />
      <InfiniteSpecies />
    </div>
  );
};

export default App;
