import React, { useState } from "react";
import { getAllResults } from "../../Services/api";
import ResultList from "../../Components/Result/ResultDetails";
import { useEffect } from "react";

function ResultDetails() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await getAllResults();
        setResult(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResult(); // ✅ function call
  }, []); // ✅ dependency array

  return (
    <div>
      <ResultList results={result} />
    </div>
  );
}

export default ResultDetails;
