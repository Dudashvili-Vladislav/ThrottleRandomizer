import React from "react";
import { User } from "./type/User";

type IUserInfoProps = {
  user: User | null;
}

export const UserInfo = (props: IUserInfoProps): JSX.Element => {
  const { user } = props;
  if (!user) {
    return <> </>; // либо другой tsx
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Phone number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{user?.name}</td>
          <td>{user?.phone}</td>
        </tr>
      </tbody>
    </table>
  );
};