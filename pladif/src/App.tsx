import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./layout/Main";
import Auditoria from "./pages/Auditorias/Auditoria";
import Busqueda from "./pages/Busqueda/Busqueda";
import Home from "./pages/Home";
import Inap from "./pages/INAP/Inap";
import MPD from "./pages/MPD/MPD";
import OficioONU from "./pages/OficiosONU/OficioONU";
import OficioPresupuesto from "./pages/OficiosPresupuesto/OficioPresupuesto";
import PaqueteFiscal from "./pages/PaqueteFiscal/PaqueteFiscal";
import PPI from "./pages/ProyectoInversion/PPI";
import SIREGOB from "./pages/SIREGOB/SIREGOB";
import SignIn from "./pages/SignIn";
import Transferencias from "./pages/Trasnsferencias/Transferencias";
import Corriente from "./pages/polizas/Corriente";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home/*" element={<Main />}>
            <Route index element={<Home />} />
            <Route path="bus" element={<Busqueda />} />
            <Route path="inap" element={<Inap />} />
            <Route path="siregob" element={<SIREGOB tipo={"CONS"} />} />
            <Route path="ppi" element={<PPI tipo={"CONS"} />} />
            <Route path="pf" element={<PaqueteFiscal tipo={"CONS"} />} />
            <Route path="mpd" element={<MPD tipo={"CONS"} />} />
            <Route path="onu" element={<OficioONU tipo={"CONS"} />} />
            <Route path="auditoria" element={<Auditoria tipo={"CONS"} />} />
            <Route
              path="trasnsferencias"
              element={<Transferencias tipo={"CONS"} />}
            />
            <Route
              path="presupuesto"
              element={<OficioPresupuesto tipo={"CONS"} />}
            />

            <Route
              path="gasto-corriente"
              element={<Corriente tipo={"CONS"} />}
            />

            <Route path="SP" element={<Corriente tipo={"CONS"} />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
