import React, { useCallback, useState } from "react";

const App = () => {
  const [date] = useState(() => new Date());

  return (
    <div className="py-5 px-3">
      <h1 className="text-3xl font-serif font-bold mb-6">
        {date.toDateString()}
      </h1>
    </div>
  );
};

export default App;
