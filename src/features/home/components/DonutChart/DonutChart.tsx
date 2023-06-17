const DonutChart = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 42 42" className="donut">
      <circle
        className="donut-hole"
        cx="21"
        cy="21"
        r="15.91549430918954"
        fill="#fff"
      />
      <circle
        className="donut-ring"
        cx="21"
        cy="21"
        r="15.91549430918954"
        fill="transparent"
        stroke="#d2d3d4"
        stroke-width="10"
      />

      <circle
        className="donut-segment"
        cx="21"
        cy="21"
        r="15.91549430918954"
        fill="transparent"
        stroke="#ce4b99"
        stroke-width="10"
        stroke-dasharray="40 60"
        stroke-dashoffset="25"
      />
      <circle
        className="donut-segment"
        cx="21"
        cy="21"
        r="15.91549430918954"
        fill="transparent"
        stroke="#b1c94e"
        stroke-width="10"
        stroke-dasharray="20 80"
        stroke-dashoffset="85"
      />
      <circle
        className="donut-segment"
        cx="21"
        cy="21"
        r="15.91549430918954"
        fill="transparent"
        stroke="#377bbc"
        stroke-width="10"
        stroke-dasharray="30 70"
        stroke-dashoffset="65"
      />
    </svg>
  );
};

export default DonutChart;
