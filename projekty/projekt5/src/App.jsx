import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { zdjeciaStartowe } from "./zdjecia";

function App() {
  const [zdjecia, setZdjecia] = useState(zdjeciaStartowe);

  const [kwiaty, setKwiaty] = useState(true);
  const [zwierzeta, setzwierzeta] = useState(true);
  const [samochody, setSamochody] = useState(true);

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
          <input
          className="form-check-input"
          type="checkbox"
          id="chbKwiaty"
          onChange={()=>{setKwiaty(!kwiaty)}}
          checked={kwiaty}
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
            onChange={()=>{setzwierzeta(!zwierzeta)}}
            checked={zwierzeta}
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
            onChange={()=>{setSamochody(!samochody)}}
            checked={samochody}
          />
          <label className="form-check-label" htmlFor="chbSamochody">
            Samochody
          </label>
        </div>
      </form>
      <div className="container">
        <div className="row">
          {zdjecia.filter((z) =>{
            if(z.category == 1 && kwiaty) return true
            if(z.category == 2 && zwierzeta) return true
            if(z.category == 3 && samochody) return true
            return
          }).map((z) => (
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
