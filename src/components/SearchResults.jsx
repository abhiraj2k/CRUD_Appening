import React, { useEffect, useState } from "react";
import "../styles/searchResults.scss";
const SearchResults = ({ query, users }) => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    changeResult();
  }, [query]);

  const changeResult = () => {
    if (query.length <= 0) {
      setResult([]);
      return;
    }
    const tempUsers = users;
    const resUsers = [];
    tempUsers.forEach((user) => {
      if (
        user.first_name.toLowerCase().includes(query.toLowerCase()) ||
        user.last_name.toLowerCase().includes(query.toLowerCase())
      ) {
        resUsers.push(user);
      }
    });
    setResult(resUsers);
  };
  return (
    <div className="result">
      <div className="result__content">
        {result.map((res) => (
          <div className="result__tab" key={res.email}>
            <div className="result__name">
              <div className="first_name">{res.first_name}</div>
              <div className="last_name">{res.last_name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
