import React, {Suspense} from "react";
import {fetchData} from "./ModuleFetch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {
    Container,
    ListGroupItem,
    Button
} from "reactstrap";
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group'
import { deleteModule } from "../actions/itemActions"

//adding font icon solid to library
library.add(fas)
//storing fetch data return in resource protected variable for suspense
const resource = fetchData()

let onDeleteClick = id =>{
    //deleteModule comes here somehow to abandon modules for a user
    //TODO: further integration of this is needed in later release
    console.log(`deleted module ${id}`)
}

let round_to_precision = (x, precision) => {
    let y = +x + (precision === undefined ? 0.5 : precision/2);
    return y - (y % (precision === undefined ? 1 : +precision));
}

const RemainingModules = modules => {
    //filtering out modules that aren't done yet and storing in variable remaining
    let remaining = modules.data.filter(module => module.done === false)

    return(
        <div>
            <h4 className='module-title'>Pick up new modules</h4>
            <div className="row">
                <div className="col">Module name</div>
                <div className="col">Difficulty</div>
                <div className="col">Duration</div>
                <div className="col">Actions</div>
            </div>

            {remaining.map(module => (
                <div className='module-list-item' key={module.moduleNumber}>
                    <CSSTransition timeout={500} classNames="fade">
                        <ListGroupItem className='d-flex align-items-center w-100'>
                            <div className="row w-100 align-items-center">
                                <div className="col">{module.moduleName}</div>
                                <div className="col">{round_to_precision(module.difficulty, 0.25)}</div>
                                <div className="col">{module.duration} minutes</div>
                                <div className="col actions d-flex flex-row">
                                    <Button
                                        color='primary'
                                        className='access-btn mx-2'
                                        size='sm'
                                        onClick={
                                            () => {
                                                console.log(`accessed`)
                                            }
                                        }
                                    >Add module</Button>
                                    <Button
                                        color='danger'
                                        className='remove-btn mx-2'
                                        size='sm'
                                        onClick={
                                            onDeleteClick.bind(this, module._id)
                                        }
                                    >Hide module</Button>
                                </div>
                            </div>
                        </ListGroupItem>
                    </CSSTransition>
                </div>
            ))}
        </div>
    )
}
const IncompleteModules = modules => {
    let completed = modules.data.filter(module => module.continue === true)

    return(
        <div>
            <h4 className='module-title'>Continue your modules</h4>
            <div className="row module-list">
                <div className="col">Module name</div>
                <div className="col">Progress</div>
                <div className="col">Remaining</div>
                <div className="col">Actions</div>
            </div>

            {completed.map(module => (
                <div className='module-list-item' key={module.moduleNumber}>
                    <CSSTransition timeout={500} classNames="fade">
                        <ListGroupItem className='d-flex align-items-center w-100'>
                            <div className="row w-100 align-items-center">
                                <div className="col">{module.moduleName}</div>
                                <div className="col">{round_to_precision(module.difficulty, 0.25)}%</div>
                                <div className="col">{module.duration} minutes</div>
                                <div className="col actions d-flex flex-row">
                                    <Button
                                        color='primary'
                                        className='access-btn mx-2'
                                        size='sm'
                                        onClick={
                                            () => {
                                                console.log(`accessed`)
                                            }
                                        }
                                    >Continue module</Button>
                                    <Button
                                        color='danger'
                                        className='remove-btn mx-2'
                                        size='sm'
                                        onClick={
                                            onDeleteClick.bind(this, module._id)
                                        }
                                    >Abandon module</Button>
                                </div>
                            </div>
                        </ListGroupItem>
                    </CSSTransition>
                </div>
            ))}
        </div>
    )
}

const ModuleData = () => {
    const modules = resource.module.read()
    console.log(modules)

    return(
        <ul>
            {IncompleteModules (modules)}
            {RemainingModules (modules)}
        </ul>
    )
}

let ModuleItem = () => {
    return (
        <Suspense
            fallback={
                <Container className='mx-auto w-100 d-flex justify-content-center align-items-center'>
                    <FontAwesomeIcon icon={['fas', 'spinner']} spin size="3x" />
                </Container>
        }
        ><ModuleData/>
        </Suspense>
    );
}

export default ModuleItem