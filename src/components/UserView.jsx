import React from "react";

const UserView = (props) => {
  const { name, avatar } = props;
  return (
    <div>
      <h3>{name}</h3>
      <img src={avatar} alt={name} />
    </div>
  );
};

export default UserView;
