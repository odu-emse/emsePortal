import React, {Component} from "react";
import {
    Container,
    ListGroup
} from 'reactstrap'
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group'
import { connect } from 'react-redux'
import { getModules, deleteModule } from "../actions/itemActions"
import PropTypes from 'prop-types'
import ModuleItem from "./ModuleItem";

class ModuleList extends Component{

    render() {
        //destructuring modules object to bring in data with shorthand method
        //const { data } = this.props.item.modules;
        //console.log(data)
        //let remaining = modules.filter(module => module.remaining > 0)
        //let completed = modules.filter(module => module.remaining <= 0)

        return (
            <Container>
                <ListGroup>
                {/*    displaying all modules */}
                    <TransitionGroup className="module-list">
                        <ModuleItem/>
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

// ModuleList.propTypes = {
//     getModules: PropTypes.func.isRequired,
//     item: PropTypes.object.isRequired
// };
//
// const mapStateToProps = state => ({
//     item: state.item
// });
//export default connect(mapStateToProps, { getModules, deleteModule })(ModuleList)
export default ModuleList