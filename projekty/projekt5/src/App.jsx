import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { zdjeciaStartowe } from "./zdjecia";

function App() {
  const [zdjecia, setZdjecia] = useState(zdjeciaStartowe);

  return (
    <>
      <h1>Kategorie Zdjęć</h1>
      <form className="d-flex gap-3">
        <div className="form-check form-switch">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="chbKwiaty" 
          />
          <label className="form-check-label" htmlFor="chbKwiaty">
            Kwiaty
          </label>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="chbZwierzeta"
          />
          <label className="form-check-label" htmlFor="chbZwierzeta">
            Zwierzęta
          </label>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="chbSamochody"
          />
          <label className="form-check-label" htmlFor="chbSamochody">
            Samochody
          </label>
        </div>
      </form>
      <div className="container">
        <div className="row">
          {zdjecia.map((z) => (
            <div className="col-md-4 mb-4">
              <img
                className="img-fluid rounded"
                style={{ margin: "5px" }}
                alt={z.alt}
                src={`/assets/${z.filename}`}
                key={z.id}
              />
              <h4>Pobrań: {z.downloads}</h4>
              <button className="btn btn-success">Pobierz</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
