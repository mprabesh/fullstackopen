import { CourseProps,CoursePart } from "../types";

export const Content = ({courseParts}:CourseProps) => (
  <>
    {courseParts.map((val:CoursePart) => (
      <p key={val.name}>
        {val.name} {val.excerciseCount}
      </p>
    ))}
  </>
);

