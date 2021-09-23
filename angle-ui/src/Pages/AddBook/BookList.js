import React from "react";

const BookList = ({ bookList = [] }) => {
  return (
    <>
      {bookList.map((data) => {
        if (data) {
          return (
            <div key={data.title}>
              <h1>{data.title}</h1>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default BookList;
