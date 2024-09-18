import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { Total } from "./components/Total";
import { CoursePart } from "./types";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts:CoursePart[] = [
    {
      name: "Fundamentals",
      excerciseCount: 10,
      description: "This is an awesome course part",
      kind:"basic"
    },
    {
      name: "Using props to pass data",
      excerciseCount: 7,
      groupProjectCount: 3,
      kind:"group"
    },
    {
      name: "Basics of type Narrowing",
      excerciseCount: 7,
      description: "How to go from unknown to string",
      kind:"basic"
    },
    {
      name: "Deeper type usage",
      excerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind:"background"
    },
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.excerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseParts={courseParts}/>
      <Total totalVal={totalExercises} />
    </div>
  );
};

export default App;