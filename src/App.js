import React, { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getUserList = (page) => {
    fetch(`https://reqres.in/api/users?page=${page}`)
      .then((res) => res.json())
      .then((response) => {
        const data = response.data;
        const totalPagesCount = response.total_pages;
        console.log(data);
        setUserList(data);
        setTotalPage(totalPagesCount);
      });
  };
  const nextPage = () => {
    const nextpagenumber = currentPage + 1;

    getUserList(nextpagenumber);
    setCurrentPage(nextpagenumber);
  };

  const previousPage = () => {
    const prevpagenumber = currentPage - 1;

    getUserList(prevpagenumber);
    setCurrentPage(prevpagenumber);
  };
  useEffect(() => {
    getUserList(currentPage);
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <div>
        <table>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Image</th>
          </tr>
          {userList.map((user) => {
            const { id, first_name, last_name, avatar } = user;
            return (
              <tr key={id}>
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td>
                  <img src={avatar} alt="" />
                </td>
              </tr>
            );
          })}
        </table>
        {currentPage < totalPage && (
          <button
            onClick={() => {
              nextPage();
            }}
          >
            Next
          </button>
        )}
        {currentPage > 1 && (
          <button
            onClick={() => {
              previousPage();
            }}
          >
            Previous
          </button>
        )}
      </div>
    </div>
  );
}
