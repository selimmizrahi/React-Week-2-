import React from "react";
import UserView from "./UserView";
import { getUser, postUser, deleteUser, imageValidate } from "./api";

class Api extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      formName: "",
      formAvatar: "",
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  async loadUsers() {
    const response = await getUser();
    this.setState({
      users: response.data,
      loading: false,
    });
    console.log(response.data);
  }

  async deleteUsers(event, id) {
    event.preventDefault();
    const response = await deleteUser(id).then(() => {
      this.loadUsers();
    });
    // console.log(response);
  }

  async imageValidate(url) {
    const response = await imageValidate(url);
    if (response.status >= 200 && response.status < 300) {
      console.log("yes");
    } else {
      return false;
    }
  }

  async handleOnSubmit(event) {
    event.preventDefault();
    const { formName, formAvatar } = this.state;
    if (formName.length > 5) {
      const response = await postUser({
        name: formName,
        avatar: formAvatar,
      });
      this.loadUsers();
      console.log(response);
    }
  }

  render() {
    const { formName, formAvatar, users, loading } = this.state;
    return (
      <>
        <form
          onSubmit={(event) => {
            this.handleOnSubmit(event);
          }}
        >
          <input
            type="text"
            name="name"
            value={formName}
            placeholder="name"
            onChange={(event) =>
              this.setState({ formName: event.target.value })
            }
          />

          <input
            type="text"
            name="name"
            value={formAvatar}
            placeholder="avatar"
            onChange={(event) =>
              this.setState({ formAvatar: event.target.value })
            }
          />
          <button type="submit">New User</button>
        </form>
        {loading && <span>Loading...</span>}
        {users.map((user) => (
          <UserView
            key={user.id}
            id={user.id}
            avatar={user.avatar}
            deleteFunction={(event) => {
              this.deleteUsers(event, user.id);
            }}
          />
        ))}
      </>
    );
  }
}

export default Api;
