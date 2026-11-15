import { useState, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { zdjeciaStartowe } from "./zdjecia";


const NAZWY_KATEGORII = { 1: 'Kwiaty', 2: 'Zwierzęta', 3: 'Samochody' };
const KATEGORIE = [1, 2, 3];


function App() {
  const [zdjecia, setZdjecia] = useState(zdjeciaStartowe);

  const [aktywneKategorie, setAktywneKategorie] = useState(KATEGORIE);

  const altRef = useRef(null)
  const filenameRef = useRef(null)
  const categoryRef = useRef(null)

  // dodawanie do listy nowego elementu
  function dodawanieZdjec(event){
    event.preventDefault()
    
    const noweId = Math.max(...zdjecia.map((z) => z.id)) + 1;
    
    setZdjecia([
      ...zdjecia,
      {
        id: noweId,
        alt: altRef.current.value,
        filename: filenameRef.current.value,
        category: Number(categoryRef.current.value),
        downloads: 0
      }
    ]);

    event.target.reset();
  }

  function przelaczKategorie(kategoria) {
    setAktywneKategorie(aktywne =>
      aktywne.includes(kategoria)
        ? aktywne.filter(k => k != kategoria)
        : [...aktywne, kategoria]
    );
  }

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
      {/* kategorie (switch) */}
      <form className="d-flex gap-3">
      
        {KATEGORIE.map(kategoria => (<div className="form-check form-switch" key={kategoria}>
          <input
          className="form-check-input"
          type="checkbox"
          id={`kategoria-${kategoria}`}
          checked={aktywneKategorie.includes(kategoria)}
          onChange={() =>  przelaczKategorie(kategoria)}
          />
          <label className="form-check-label" htmlFor={`kategoria-${kategoria}`}>
            {NAZWY_KATEGORII[kategoria]}
          </label>
        </div>))}
      </form>

      <hr></hr>

      {/* dodawanie zdjęć przez useRef */}
      <form onSubmit={dodawanieZdjec} className="d-flex flex-column">
        <div className="col-md-6 m-3">
          <label htmlFor="txtAlt" className="form-label">Opis zdjęcia</label>
          <input type="text" className="form-control" id="txtAlt" ref={altRef} />
        </div>

        <div className="col-md-6 m-3">
            <label htmlFor="txtFilename" className="form-label">Nazwa pliku</label>
            <input type="text" className="form-control" id="txtFilename" ref={filenameRef} />
        </div>

        <div className="col-md-6 m-3">
          <label htmlFor="selKategoria">Kategoria:</label>
          <select className="form-select" defaultValue={1} id="selKategoria" ref={categoryRef}>
            <option value={1}>Kwiaty</option>
            <option value={2}>Zwierzęta</option>
            <option value={3}>Samochody</option>
          </select>
        </div>

        <div className="col-md-6 m-3">
            <input type="submit" className="btn btn-primary" value="Zapisz" />
        </div>
      </form>

      <hr></hr>

      <div className="container">
        <div className="row">
          {zdjecia.filter((z) =>{
            return aktywneKategorie.includes(z.category)
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
