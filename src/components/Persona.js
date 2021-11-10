import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faSave, faRedo } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
const Persona = () => {
    const [form, setForm] = useState({
        id: '', dni: '', nombres: '', correo: '', edad: ''
    })
    const inputRefDni = useRef()
    const inputRefNombres = useRef()
    const inputRefCorreo = useRef()
    const inputRefEdad = useRef()
    const { id, dni, nombres, correo, edad } = form


    const onInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (id === "") {
            axios.post('http://localhost:8000/api/personas/', form)
                .then(() => {
                    toast.success(" ✅ Person created successfully", { theme: 'colored' })
                    ListData()
                    CleanInputs()
                })
                .catch(err => {
                    if (err.response.status === 422) {
                        if (err.response.data.errors.dni) {
                            toast.error("❌" + err.response.data.errors.dni[0], { theme: 'colored' })
                            //document.getElementsByName('dni')[0].focus()
                            inputRefDni.current.focus()
                        } else if (err.response.data.errors.nombres) {
                            toast.error("❌" + err.response.data.errors.nombres[0], { theme: 'colored' })
                            //document.getElementsByName('nombres')[0].focus()
                            inputRefNombres.current.focus()
                        } else if (err.response.data.errors.correo) {
                            toast.error("❌" + err.response.data.errors.correo[0], { theme: 'colored' })
                            //document.getElementsByName('correo')[0].focus()
                            inputRefCorreo.current.focus()
                        } else if (err.response.data.errors.edad) {
                            toast.error("❌" + err.response.data.errors.edad[0], { theme: 'colored' })
                            //document.getElementsByName('edad')[0].focus()
                            inputRefEdad.current.focus()
                        }
                    }
                })
        }
        else {
            const info = { dni, nombres, correo, edad }
            axios.put('http://localhost:8000/api/personas/' + id, info)
                .then(() => {
                    toast.success(" ✅ Person updated successfully", { theme: 'colored' })
                    ListData()
                    CleanInputs()
                })
                .catch(err => {
                    if (err.response.status === 422) {
                        if (err.response.status === 422) {
                            if (err.response.data.errors.dni) {
                                toast.error("❌" + err.response.data.errors.dni[0], { theme: 'colored' })
                                //document.getElementsByName('dni')[0].focus()
                                inputRefDni.current.focus()
                            } else if (err.response.data.errors.nombres) {
                                toast.error("❌" + err.response.data.errors.nombres[0], { theme: 'colored' })
                                //document.getElementsByName('nombres')[0].focus()
                                inputRefNombres.current.focus()
                            } else if (err.response.data.errors.correo) {
                                toast.error("❌" + err.response.data.errors.correo[0], { theme: 'colored' })
                                //document.getElementsByName('correo')[0].focus()
                                inputRefCorreo.current.focus()
                            } else if (err.response.data.errors.edad) {
                                toast.error("❌" + err.response.data.errors.edad[0], { theme: 'colored' })
                                //document.getElementsByName('edad')[0].focus()
                                inputRefEdad.current.focus()
                            }
                        }
                    }
                })
        }
    }

    const CleanInputs = () => {
        setForm({
            id: '', dni: '', nombres: '', correo: '', edad: ''
        })
        inputRefDni.current.focus()
    }
    const NewRecord = () => {
        setForm({
            id: '', dni: '', nombres: '', correo: '', edad: ''
        })
        inputRefDni.current.focus()
    }
    const DeleteData = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                axios.delete('http://localhost:8000/api/personas/' + id)
                    .then(() => {
                        ListData()
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        })
    }
    const GetData = (id) => {
        toast.warning(" ✏ Is going to perform a data update ", { theme: 'colored' })
        axios.get('http://localhost:8000/api/personas/' + id)
            .then(res => {
                setForm({
                    id: res.data.personas.id,
                    dni: res.data.personas.dni,
                    nombres: res.data.personas.nombres,
                    correo: res.data.personas.correo,
                    edad: res.data.personas.edad
                })
            })
            .catch(err => {
                console.error(err);
            })
        inputRefDni.current.focus()
    }

    const [persona, setPersona] = useState([])
    const ListData = () => {
        axios.get('http://localhost:8000/api/personas/')
            .then(res => {
                setPersona(res.data[0])
                toast.success(" 🔰 Data loaded successfully", { theme: 'colored' })
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        ListData()
    }, [])
    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <h1>Personas</h1>
            <div className="row">
                <div className="col-sm-3 auto">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Formulario</h5>
                            <form onSubmit={e => onSubmit(e)} id="form">
                                <input type="hidden"
                                    name="id"
                                    value={id}
                                    onChange={e => onInputChange(e)} />
                                <div className="mb-3">
                                    <label htmlFor="dni" className="form-label">Dni</label>
                                    <input type="text" className="form-control" name="dni"
                                        value={dni}
                                        onChange={e => onInputChange(e)}
                                        autoFocus
                                        ref={inputRefDni}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nombres" className="form-label">Nombres</label>
                                    <input type="text" className="form-control" name="nombres"
                                        value={nombres}
                                        ref={inputRefNombres}
                                        onChange={e => onInputChange(e)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="correo" className="form-label">Correo</label>
                                    <input type="email" className="form-control" name="correo"
                                        aria-describedby="emailHelp"
                                        value={correo}
                                        ref={inputRefCorreo}
                                        onChange={e => onInputChange(e)} />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edad" className="form-label">Edad</label>
                                    <input type="text" className="form-control" name="edad"
                                        value={edad}
                                        ref={inputRefEdad}
                                        onChange={e => onInputChange(e)} />
                                </div>
                                <button type="submit" className="btn btn-primary" id="btnSave">
                                    <FontAwesomeIcon icon={faSave} /> Save
                                </button>
                                <button type="button" className="btn btn-secondary"
                                    onClick={() => NewRecord()}>
                                    <FontAwesomeIcon icon={faRedo} />  Clean
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
                <div className="col-sm-8 auto">
                    <div className="card">
                        <div className="card-body table table-responsive">
                            <h5 className="card-title">List</h5>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th itemScope="col">Dni</th>
                                        <th itemScope="col">Nombres</th>
                                        <th itemScope="col">Correo</th>
                                        <th itemScope="col">Edad</th>
                                        <th itemScope="col" colSpan="2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        persona.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.dni}</td>
                                                <td>{item.nombres}</td>
                                                <td>{item.correo}</td>
                                                <td>{item.edad}</td>
                                                <td>
                                                    <button className="btn btn-primary btn-sm"
                                                        id="btnEdit" title="Edit"
                                                        onClick={() => GetData(item.id)}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    <button className="btn btn-danger btn-sm" title="Delete"
                                                        onClick={() => DeleteData(item.id)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Persona
