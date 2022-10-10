import * as React from "react";
import { Link } from "react-router-dom";
import { close } from "./Icons";

function Instructions() {
  return (
    <section className="instructions-container">
      <h2>Instructions</h2>
      <ol>
        <li>Enter 2 Github users</li>
        <li>Battle</li>
        <li>See the winners</li>
      </ol>
    </section>
  );
}

class PlayerInput extends React.Component {
  state = {
    username: "",
  };

  handleUserSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state.username);
  };

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  render() {
    return (
      <form className="card" onSubmit={this.handleUserSubmit}>
        <label htmlFor="username" className="player-label">
          {this.props.label}
        </label>
        <div className="input-row">
          <input
            type="text"
            id="username"
            placeholder="github username"
            autoComplete="off"
            value={this.state.username}
            onChange={this.handleUsernameChange}
            onBlur={this.handleUserSubmit}
          />
          <button
            className="btn link"
            type="submit"
            disabled={!this.state.username}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

function PlayerPreview({ username, onReset, label }) {
  return (
    <article className="card">
      <h3 className="player-label">{label}</h3>
      <div className="split">
        <div className="row gap-md">
          <img
            width={32}
            height={32}
            className="avatar"
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
          />
          <a href={`https://github.com/${username}`} className="link">
            {username}
          </a>
        </div>
        <button onClick={onReset} className="btn secondary icon">
          {close}
        </button>
      </div>
    </article>
  );
}

export default class Battle extends React.Component {
  state = {
    playerOne: null,
    playerTwo: null,
  };
  
  handlePlayerValue = (id, player = null) => {
    this.setState({
      [id]: player,
    });
  }

  render() {
    const { playerOne, playerTwo } = this.state;
    const disabled = !playerOne || !playerTwo;

    return (
      <main className="stack main-stack animate-in">
        <div className="split">
          <h1>Players</h1>
          <Link
            to={{
              pathname: "/results",
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
            }}
            className={`btn primary ${disabled ? "disabled" : ""}`}
          >
            Battle
          </Link>
        </div>
        <section className="grid">
          {playerOne === null ? (
            <PlayerInput
              label="Player One"
              onSubmit={(player) => this.handlePlayerValue("playerOne", player)}
            />
          ) : (
            <PlayerPreview
              username={playerOne}
              onReset={() => this.handlePlayerValue("playerOne")}
              label="Player One"
            />
          )}
          {playerTwo === null ? (
            <PlayerInput
              label="Player Two"
              onSubmit={(player) => this.handlePlayerValue("playerTwo", player)}
            />
          ) : (
            <PlayerPreview
              username={playerTwo}
              onReset={() => this.handlePlayerValue("playerTwo")}
              label="Player Two"
            />
          )}
        </section>
        <Instructions />
      </main>
    );
  }
}
