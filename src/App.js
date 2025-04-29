import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  function handleCheckboxChange(e) {
    const { value, checked } = e.target;
    setInterests((prev) =>
      checked ? [...prev, value] : prev.filter((i) => i !== value)
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div>
      <h1>Join Our Newsletter</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <fieldset>
          <legend>Interests</legend>
          <label>
            <input
              type="checkbox"
              value="Coding"
              onChange={handleCheckboxChange}
            />
            Coding
          </label>
          <label>
            <input
              type="checkbox"
              value="Design"
              onChange={handleCheckboxChange}
            />
            Design
          </label>
          <label>
            <input
              type="checkbox"
              value="Marketing"
              onChange={handleCheckboxChange}
            />
            Marketing
          </label>
        </fieldset>

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <p>
          Thank you, {name}! You’ve signed up with {email}.
          {interests.length > 0 && (
            <>
              <br />
              Your interests: {interests.join(", ")}
            </>
          )}
        </p>
      )}
    </div>
  );
}

export default App;
