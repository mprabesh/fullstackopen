const Header = ({ text }) => {
  return <h2>{text}</h2>;
};

const Total = ({ parts }) => {
  return (
    <p>
      <b>
        <span>total of </span>
        {parts.reduce(
          (accumulator, currentVal) =>
            (accumulator = accumulator + currentVal.exercises),
          0
        )}
        <span> excercises.</span>
      </b>
    </p>
  );
};

const Part = ({ courseName, courseExcercise }) => {
  return (
    <p>
      {courseName} {courseExcercise}
    </p>
  );
};

const Content = ({ content }) => {
  return (
    <>
      {content.map((value) => {
        return (
          <Part
            key={value.id}
            courseName={value.name}
            courseExcercise={value.exercises}
          />
        );
      })}
      <Total parts={content} />
    </>
  );
};

const Courses = ({ course }) => {
  return (
    <div>
      {course.map((value) => {
        return (
          <div key={value.id}>
            <Header text={value.name} />
            <Content content={value.parts} />
          </div>
        );
      })}
    </div>
  );
};

export default Courses;
