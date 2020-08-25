import React, {Component} from "react";
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table} from 'reactstrap';

import Axios from "axios";

const uri = 'http://localhost:6996'

class FormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dbForm: [],
            selectedId : null,
        }
    }

    componentDidMount() {
        // console.log("mulai cdm")
        this.getForm();

    }

    printForm = ()=> {
        if (this.state.dbForm !== null ) {
            return this.state.dbForm.map((item, index) => {
                if (this.state.selectedId == item.id) {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <Input type="text" id="nama" innerRef={(value) => {
                                    this.newnama = value
                                }} defaultValue={item.nama}>
                                </Input>
                            </td>
                            <td>
                                <Input type="text" id="alamat" innerRef={(value) => {
                                    this.newalamat = value
                                }} defaultValue={item.alamat}>
                                </Input>
                            </td>
                            <td>
                                <Input type="text" id="pejerjaan" innerRef={(value) => {
                                    this.newpekerjaan = value
                                }} defaultValue={item.pekerjaan}>
                                </Input>
                            </td>
                            <td>
                                <Input type="select" id="hobi" innerRef={(value) => {
                                    this.newhobi = value
                                }} defaultValue={item.hobi}>
                                    <option>Choose...</option>
                                    <option value="Coding">Coding</option>
                                    <option value="Fotografi">Fotografi</option>
                                </Input>
                            </td>
                            <td>
                                <Button onClick={() => this.putForm(item.id)}>Yes</Button>
                                <Button onClick={() => this.setState({selectedId: null})}>No</Button>
                            </td>
                        </tr>
                    )
                } else {
                    return (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.nama}</td>
                            <td>{item.alamat}</td>
                            <td>{item.pekerjaan}</td>
                            <td>{item.hobi}</td>
                            <td>
                                <Button onClick={() => this.setState({selectedId: item.id})}>Edit</Button>
                                <Button onClick={() => this.deleteForm(item.id)}>Delete</Button>
                            </td>
                        </tr>
                    )
                }
            })
        } else {
            return (
                <div style={{textAlign: "center", marginTop: "10px"}}>
                    <h2>Data Tidak Ditemukan</h2>
                </div>
            )
        }
    }

    postForm = () => {
        Axios.post(uri + '/form', { nama: this.nama.value,  alamat: this.alamat.value, pekerjaan: this.pekerjaan.value, hobi: this.hobi.value})
            .then((x) => {
                console.log("Data:", x.data);
            })
            .catch( (err) => {
                console.log("Error: ", err)
            });
    }

    putForm = (index) => {
        Axios.put(uri + '/form/' + index, { nama: this.newnama.value,  alamat: this.newalamat.value, pekerjaan: this.newpekerjaan.value, hobi: this.newhobi.value})
            .then((x) => {
                console.log("Data:", x.data);
            })
            .catch( (err) => {
                console.log("Error: ", err)
            });
        let temp = this.state.dbForm
        temp[index-1].nama = this.newnama.value
        temp[index-1].alamat = this.newalamat.value
        temp[index-1].pekerjaan = this.newpekerjaan.value
        temp[index-1].hobi = this.newhobi.value
        this.setState({dbForm: temp, selectedId: null})
    }

    deleteForm = (index) => {
        Axios.delete(uri + "/form/" + index)
            .then( (x)=> {
                    console.log("Data: ",x.data);
                }
            )
            .catch( (err) => {
                console.log("Error: ", err)
            });
    }

    getForm = () => {
        Axios.get(uri + "/form")
            .then( (x)=> {
                    console.log("Data: ",x.data);
                    this.setState({
                        dbForm: x.data
                    })
                }
            )
            .catch( (err) => {
                console.log("Error: ", err)
            });
    }

    render() {
        return(
            <div style={{marginTop: "20px"}} className="container">
                <Form>
                    <FormGroup>
                        <Label for="nama">Nama:</Label>
                        <Input type="text" id="nama" innerRef={(value) => {this.nama = value}}>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="alamat">Alamat:</Label>
                        <Input type="text" id="alamat" innerRef={(value) => {this.alamat = value}}>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="pekerjaan">Pekerjaan:</Label>
                        <Input type="text" id="pekerjaan" innerRef={(value) => {this.pekerjaan = value}}>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="hoby">Hobi:</Label>
                        <Input type="select" id="hobi" innerRef={(value) => {this.hobi = value}}>
                            <option>Choose...</option>
                            <option value="Coding">Coding</option>
                            <option value="Fotografi">Fotografi</option>
                        </Input>
                    </FormGroup>
                    <Button type='button' onClick={this.postForm}>Submit</Button>
                </Form>
                <div style={{marginTop: "20px"}}>
                    <Table>
                        <thead>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Pekerjaan</th>
                            <th>Hobi</th>
                            <th>Edit</th>
                        </thead>
                        <tbody>
                            {this.printForm()}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default FormPage;
