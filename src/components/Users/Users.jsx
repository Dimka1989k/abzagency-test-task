import { useEffect, useState } from "react";
import "./Users.scss";

import { useAction } from "../../redux/actions";
import { useLazyGetUsersQuery } from "../../redux/agency/agencyApi";
import { useSelector } from "react-redux";
import Button from "../Buttons/Button";
import Loader from "../Loader/Loader";
import Card from "../Card/Card";

const Users = () => {
  const [moreLoading, setMoreLoading] = useState(false);

  const { addUser, resetUsers, nextPage } = useAction();
  const { users, page } = useSelector((state) => state.users);
  const [fetchUsers, { data, isLoading, isError, error }] =
    useLazyGetUsersQuery();

  useEffect(() => {
    return () => resetUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      await fetchUsers(page).unwrap();
    };

    setMoreLoading(true);
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    data?.users && addUser(data?.users);
    setMoreLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <section className="get-section" id="users">
      <h1 className="title">Working with GET request</h1>
      <div className="users">
        {users && users.map((user) => <Card key={user.id} {...user} />)}
      </div>

      {isError && (
        <p className="error">
          Error loading: {error.statuses} {error.originalStatus}
        </p>
      )}
      {isLoading && <Loader />}

      {!moreLoading ? (
        <Button
          text={"Show more"}
          showMore={nextPage}
          disabled={data?.total_pages === page}
        />
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Users;
