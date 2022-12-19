import { LiveVideo } from "./svg";

function App() {
  const get = async () => {
    const res = await fetch("http://localhost:8000");
  };
  get();
  return (
    <>
      <div> Welcome to Frontend </div>
    </>
  );
}

export default App;
