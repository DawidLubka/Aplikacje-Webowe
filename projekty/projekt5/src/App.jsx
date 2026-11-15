import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { zdjeciaStartowe } from "./zdjecia";

function App() {
  const [zdjecia, setZdjecia] = useState(zdjeciaStartowe);

  const zwiekszPobrania = (id) => {
    const zakutalizowaneZdjecie = zdjecia.map((z) => {
      if (z.id == id) {
        return { ...z, downloads: z.downloads + 1 };
      }
      return z;
    });
    setZdjecia(zakutalizowaneZdjecie);
  };

  return (
    <>
      <h1>Kategorie Zdjęć</h1>
      <form className="d-flex gap-3">
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" id="chbKwiaty" />
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
            <div className="col-md-4 mb-4" key={z.id}>
              <img
                className="img-fluid rounded"
                style={{ margin: "5px" }}
                alt={z.alt}
                src={`/assets/${z.filename}`}

              />
              <h4>Pobrań: {z.downloads}</h4>
              <button className="btn btn-success" onClick={()=>{zwiekszPobrania(z.id)}}>Pobierz</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
