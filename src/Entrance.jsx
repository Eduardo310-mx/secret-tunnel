//create a new state to hold the user(name) and setUserName.
import { useAuth } from "./AuthContext";

/** Users can enter their name to receive a token from the API. */
export default function Entrance() {
  // TODO: call signup when form is submitted.
  const { signup, setLocation, setUsername } = useAuth();

  async function formIsSubmitted(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");

    setUsername(name);
    await signup(name, "default-password");
    //function to change the page to tablet
    setLocation("TABLET");
  }

  return (
    <>
      <h1>Cave Entrance</h1>
      <p>Your journey has brought you to the base of a rocky mountain.</p>
      <p>
        The quickest path forward is through the mountain's winding tunnels, but
        a sturdy metal gate sits closed before you.
      </p>
      <p>
        Two giant badgers stand guard on either side of the gate, their eyes
        fixed on you. The one on the left opens its mouth, and with a deep,
        rumbling voice, it asks, "Who approaches? Speak your name."
      </p>
      <form onSubmit={formIsSubmitted}>
        <label>
          Name
          <input name="name" required />
        </label>
        <button>Respond</button>
      </form>
    </>
  );
};
