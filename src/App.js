import "./App.css";
import FileUpload from "./components/FileUpload";
import { Signup } from "./components/Signup";

function App() {
  return (
    <div className="App">
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-5">
            {/* <Signup /> */}
            <FileUpload />
          </div>
          <div className="col-md-7"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
