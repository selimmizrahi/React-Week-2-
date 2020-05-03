import React from "react";
// import "./App.css";
import axios from "axios";
import UserView from "./UserView";

class Api extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formName: "",
      formAvatar: "",
      users: [],
      loading: true,
      id: "",
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  async loadUsers() {
    const response = await axios.get(
      "https://5dd14f8d15bbc2001448d07d.mockapi.io/products"
    );
    this.setState({
      users: response.data,
      loading: false,
    });
    console.log(response.data);
  }

  async handleOnSubmit(event) {
    event.preventDefault();
    const { formName, formAvatar } = this.state;
    const response = await axios.post(
      "https://5dd14f8d15bbc2001448d07d.mockapi.io/products",
      {
        name: formName,
        avatar: formAvatar,
      }
    );
    this.loadUsers();
  }

  async deleteUsers(event) {
    event.preventDefault();
    const { formName, formAvatar } = this.state;
    const response = await axios.delete(
      `https://5dd14f8d15bbc2001448d07d.mockapi.io/products/${this.state.id}`,
      {
        name: formName,
        avatar: formAvatar,
      }
    );
    console.log(response.data);
    this.loadUsers();
  }

  render() {
    const { formName, formAvatar, users, loading, id } = this.state;
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
            id="name"
            placeholder="name"
            onChange={(event) =>
              this.setState({ formName: event.target.value })
            }
          />
          <input
            type="text"
            name="avatar"
            value={formAvatar}
            id="avatar"
            placeholder="avatar"
            onChange={(event) =>
              this.setState({ formAvatar: event.target.value })
            }
          />
          <button type="submit">New user</button>
        </form>
        <form
          onSubmit={(event) => {
            this.deleteUsers(event);
          }}
        >
          <label>
            Person ID:
            <input
              type="text"
              name="id"
              value={id}
              onChange={(event) => this.setState({ id: event.target.value })}
            />
          </label>
          <button type="submit">Delete</button>
        </form>

        {loading && <span>Loading...</span>}
        {users.map((user) => (
          <UserView key={user.id} name={user.name} avatar={user.avatar} />
        ))}
      </>
    );
  }
}

export default Api;
