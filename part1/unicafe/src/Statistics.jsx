import StatisticLine from "./StatisticLine";

const Statistics = ({ stats }) => {
  let total = stats.good + stats.bad + stats.neutral;
  const averageVal = (stats.good - stats.bad) / total;
  const calPositive = stats.good / total;

  return (
    <div>
      <StatisticLine text="good" value={stats.good} />
      <StatisticLine text="neutral" value={stats.neutral} />
      <StatisticLine text="bad" value={stats.bad} />
      <StatisticLine text="average" value={averageVal} />
      <StatisticLine text="all" value={calPositive} />
    </div>
  );
};

export default Statistics;
