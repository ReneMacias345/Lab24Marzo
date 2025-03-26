import React from 'react'
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { Table,Button,Container,FormGroup,
Modal,ModalHeader,ModalBody,ModalFooter,
} from "reactstrap";

const data = [
    
    { user_id: 1, UserName: "Laura Martínez", Position: "Desarrolladora Frontend", Seniority: "Junior", email: "laura.m@example.com" },
    { user_id: 2, UserName: "Diego Rodríguez", Position: "Ingeniero de DevOps", Seniority: "Senior", email: "diego.rdz@correo.com" },
    { user_id: 3, UserName: "Ana López", Position: "Diseñadora UX/UI", Seniority: "Mid-Level", email: "ana.ux@mail.com" },
    { user_id: 4, UserName: "Pedro Sánchez", Position: "Analista de Datos", Seniority: "Junior", email: "pedro.s@empresa.org" },
    { user_id: 5, UserName: "Mónica García", Position: "Gerente de Proyectos", Seniority: "Senior", email: "mgarcia@company.net" },
    { user_id: 6, UserName: "Javier Ruiz", Position: "Desarrollador Backend", Seniority: "Mid-Level", email: "javier.ruiz@dev.io" },
    { user_id: 7, UserName: "Sofía Castro", Position: "Especialista en QA", Seniority: "Junior", email: "sofia.qa@testing.com" },
];

class UserName extends React.Component {
    state = {
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
            user_id: "",
            UserName: "",
            Position: "",
            Seniority: "",
            email: "",
        },
    };

    mostrarModalActualizar = (dato) => {
        this.setState({
            form: dato,
            modalActualizar: true,
        });
    };

    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };

    mostrarModalInsertar = () => {
        this.setState({
            modalInsertar: true,
        });
    };

    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };

    editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
            if (dato.user_id === registro.user_id) {
                arreglo[contador].UserName = dato.UserName;
                arreglo[contador].Position = dato.Position;
                arreglo[contador].Seniority = dato.Seniority;
                arreglo[contador].email = dato.email;
            }
            contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
    };
       
    eliminar = (dato) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.user_id);
        if (opcion === true) {
            var contador = 0;
            var arreglo = this.state.data;
            arreglo.map((registro) => {
                if (dato.user_id === registro.user_id) {
                    arreglo.splice(contador, 1);
                }
                contador++;
            });
            this.setState({ data: arreglo, modalActualizar: false });
        }};
    
    insertar= ()=>{
        var valorNuevo= {...this.state.form};
        valorNuevo.user_id=this.state.data.length+1;
        var lista= this.state.data;
        lista.push(valorNuevo);
        this.setState({ modalInsertar: false, data: lista });
    }

    handleChange = (e) => {
        this.setState({
            form: {...this.state.form,
            [e.target.name]: e.target.value,
            },
        });
    };

    render () {
        return (
        <>
        <Container>
            <br />
                <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
            <br />
            <br />
                <Table>
                    <thead>
                        <tr>
                            <th>user_id</th>
                            <th>UserName</th>
                            <th>Position</th>
                            <th>Seniority</th>
                            <th>email</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((dato) => (
                            <tr key={dato.user_id}>
                                <td>{dato.user_id}</td>
                                <td>{dato.UserName}</td>
                                <td>{dato.Position}</td>
                                <td>{dato.Seniority}</td>
                                <td>{dato.email}</td>
                                <td>
                                    <Button color="primary" onClick={() => this.mostrarModalActualizar(dato)} >Editar</Button>{" "}
                                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            
            <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader>
                    <div><h3>Insertar UserName</h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>user_id: </label>
                        <input className="form-control" readOnly type="text" value={this.state.data.length+1} />
                    </FormGroup>
                    <FormGroup>
                        <label>UserName: </label>
                        <input className="form-control" name="UserName" type="text" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label>Position: </label>
                        <input className="form-control" name="Position" type="text" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Seniority: </label>
                        <input className="form-control" name="Seniority" type="text" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <label>email: </label>
                        <input className="form-control" name="email" type="text" onChange={this.handleChange}/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.insertar()} >Insertar </Button>
                    <Button className="btn btn-danger" onClick={() => this.cerrarModalInsertar()}
                    >Cancelar</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modalActualizar}>
                <ModalHeader>
                    <div><h3>Editar Registro</h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label> user_id:</label>
                        <input className="form-control" readOnly type="text" value={this.state.form.user_id} />
                    </FormGroup>
                    <FormGroup>
                        <label>UserName:</label>
                        <input className="form-control" name="UserName" type="text"
                        onChange={this.handleChange} value={this.state.form.UserName} />
                    </FormGroup>
                    <FormGroup>
                        <label>Position:</label>
                        <input className="form-control" name="Position" type="text"
                        onChange={this.handleChange} value={this.state.form.Position} />
                    </FormGroup>
                    <FormGroup>
                        <label>Seniority:</label>
                        <input className="form-control" name="Seniority" type="text"
                        onChange={this.handleChange} value={this.state.form.Seniority} />
                    </FormGroup>
                    <FormGroup>
                        <label>email:</label>
                        <input className="form-control" name="email" type="text"
                        onChange={this.handleChange} value={this.state.form.email} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.editar(this.state.form)} >
                    Editar</Button>
                    <Button color="danger" onClick={() => this.cerrarModalActualizar()} >
                    Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    )
    } 
}
export default UserName;