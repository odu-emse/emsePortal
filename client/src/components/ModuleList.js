import React, {Component} from "react";
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap'
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group'
import uuid from 'uuid'

class ModuleList extends Component{
    state = {
        items: [
            //acts as our static local mongoDB document
            {
                id: uuid(),
                name: 'Balance Sheet'
            },
            {
                id: uuid(),
                name: 'Income Statement'
            }
        ]
    }

    render() {
        //destructuring items object to bring in data with shorthand method
        const { items } = this.state
        return (
            <Container>
                <Button
                    color="dark"
                    className="mb-4"
                    onClick={() => {
                        const name = prompt('Enter module')
                        if(name){
                            this.setState(state => ({
                                items: [...state.items, { id: uuid(), name }]
                            }))
                        }
                    }}
                >
                    Add module
                </Button>
                <ListGroup>
                {/*    displaying all modules */}
                <TransitionGroup className="module-list">
                    {/*maps through all the modules*/}
                    {items.map(({ id, name }) => (
                        <CSSTransition key={id} timeout={500} classNames="fade">
                            <ListGroupItem>
                                <Button
                                    color='danger'
                                    className='remove-btn'
                                    size='sm'
                                    onClick={
                                        ()=> {
                                            this.setState(state => ({
                                                items: state.items.filter(item => item.id !== id)
                                            }))
                                        }
                                    }
                                >&times;</Button>
                                {name}
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

export default ModuleList