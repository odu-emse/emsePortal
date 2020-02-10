import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'
import { connect } from 'react-redux'
import { addModule } from '../actions/itemActions'
import uuid from 'uuid'

class ModulePop extends Component {
    state = {
        modal: false,
        name: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()

        const newModule = {
            id: uuid(),
            name: this.state.name
        }

        //add item via redux action
        this.props.addModule(newModule)

        this.toggle()
    }

    render() {
        return (
            <div>
                <Button
                    color='primary'
                    onClick={this.toggle}
                >Add module</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader
                        toggle={this.toggle}
                    >
                        Create module
                    </ModalHeader>
                    <ModalBody>
                        <Form
                            onSubmit={this.onSubmit}
                        >
                            <FormGroup>
                                <Label for='module'>Module</Label>
                                <Input
                                    name='name'
                                    type='text'
                                    id='module'
                                    placeholder='Create module'
                                    onChange={this.onChange}
                                >

                                </Input>
                                <Button
                                    color='primary'
                                    block
                                >Create module</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item
})

export default connect(mapStateToProps, { addModule })(ModulePop)