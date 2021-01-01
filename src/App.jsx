import React from 'react'
import swal from 'sweetalert'
import shortid from 'shortid'

function App() {


  const [Listado, setListado] = React.useState([]);
  const [Tarea, setTarea] = React.useState('');
  const [ModoEdita, setModoEdita] = React.useState(false);
  const [Identificador, setIdentificador] = React.useState('');
  const [Error, setError] = React.useState(null);

  const AgregarTarea = (e) => {
    e.preventDefault();

    let Graba = true;

    if (!Tarea.trim()) {
      Graba = false;
      setError('Escriba algo por favor...')
    }

    if (Graba) {
      setListado([...Listado, { id: shortid.generate(), Tarea: Tarea }]);

      e.target.reset();

      setTarea('');

      swal({
        title: "Proceso Correcto",
        text: "Se ha grabado la tarea",
        icon: "success",
        buttons: "Aceptar",
      });
      setError(null);

    }
    else {
      swal({
        title: "No se puede guardar",
        text: "Faltan Campos por completar.",
        icon: "error",
        buttons: "Terminar Formulario",
      });
    }

  }

  const EliminarTarea = (id) => {
    setError(null);
    const ArrayFiltrador = Listado.filter(t => t.id !== id);
    setListado(ArrayFiltrador);
  }

  const EditarTarea = (Tarea) => {
    setError(null);
    setModoEdita(true);
    setTarea(Tarea.Tarea);
    setIdentificador(Tarea.id);

  }

  const EditarTareaForm = (e) => {
    e.preventDefault();
    let Modifica = true;

    if (!Tarea.trim()) {
      Modifica = false;
      setError('Escriba algo por favor...')
    }


    if (Modifica) {
      const ArrayEditado = Listado.map(
        item => item.id === Identificador ? { id: Identificador, Tarea: Tarea } : item
      );

      setListado(ArrayEditado);
      setModoEdita(false);
      setTarea('');
      setIdentificador('');
      setError(null);
      swal({
        title: "Proceso Correcto",
        text: "Se ha modificado la tarea",
        icon: "success",
        buttons: "Aceptar",
      });

    }
    else {
      swal({
        title: "No se puede modificar",
        text: "Faltan Campos por completar.",
        icon: "error",
        buttons: "Terminar Formulario",
      });
    }
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD React</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h5 className="text-center" >Lista de tareas</h5>
          <ul className="list-group">

            {

              Listado.length > 0 ? (

                Listado.map((Tarea, index) => (

                  <li className="list-group-item" key={Tarea.id}>
                    <span className="lead">{Tarea.Tarea}</span>
                    <button
                      className="btn btn-danger btn-sm float-end mx-2"
                      onClick={() => EliminarTarea(Tarea.id)}
                    >Eliminar</button>

                    <button
                      className="btn btn-warning btn-sm float-end"
                      onClick={() => EditarTarea(Tarea)}
                    >Editar</button>

                  </li>

                ))
              ) : (
                  <div class="alert alert-info" role="alert">
                    No se han agregado tareas a la lista.
                  </div>
                )

            }


          </ul>
        </div>
        <div className="col-4">
          <h5 className="text-center" >
            {ModoEdita ? 'Editar Tarea' : 'Agregar Tarea'}
          </h5>
          <form onSubmit={ModoEdita ? (e) => EditarTareaForm(e) : (e) => AgregarTarea(e)}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={Tarea}
            />
            {Error != null ? <p className="Color-Rojo">{Error}</p> : ''}
            <div className="d-grid gap-2">
              {
                ModoEdita ? (
                  <button className="btn btn-warning" type="submit">Modificar</button>
                ) : (
                    <button className="btn btn-dark" type="submit">Agregar</button>
                  )
              }
            </div>


          </form>
        </div>
      </div>
    </div>

  );
}

export default App;
