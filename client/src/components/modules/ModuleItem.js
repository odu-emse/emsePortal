import React, { Suspense, Fragment } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "./ModuleFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Container, ListGroupItem, Button } from "reactstrap";
import StarRatingComponent from "react-star-rating-component";
import { rating, round_to_precision, progress } from "../helpers";

//adding font icon solid to library
library.add(fas);
//storing fetch data return in resource protected variable for suspense
const resource = fetchData();

let ModuleItem = () => {
  return (
    <Suspense
      fallback={
        <Container className="mx-auto w-100 d-flex justify-content-center align-items-center">
          <FontAwesomeIcon icon={["fas", "spinner"]} spin size="3x" />
        </Container>
      }
    >
      <ModuleData />
    </Suspense>
  );
};

const ModuleData = () => {
  const modules = resource.module.read();

  return (
    <Fragment>
      {RemainingModules(modules)}
      {IncompleteModules(modules)}
    </Fragment>
  );
};

//Pick up new modules
const RemainingModules = modules => {
  //filtering out modules that aren't done yet and storing in variable remaining
  let remaining = modules.data.filter(module => module.done === false);

  const seen = new Set();
  const uniqueData = remaining.filter(({ sid }) => {
    if (seen.has(sid)) {
      return false;
    }
    seen.add(sid);
    return true;
  });

  return (
    <div>
      <h4 className="module-title">Pick up new modules</h4>
      <div className="row">
        <div className="col">Module name</div>
        <div className="col">Rating</div>
        <div className="col">Enrolled</div>
        <div className="col">Actions</div>
      </div>
      {uniqueData.map(module => (
        <div
          className="module-list-item"
          key={module.moduleNumber}
          id={module._id}
        >
          <ListGroupItem className="d-flex align-items-center w-100">
            <div className="row w-100 align-items-center">
              <div className="col">{module.moduleName}</div>
              <div
                className="col d-flex align-items-center"
                title={`Rating: ${rating(module.rating)}`}
              >
                <StarRatingComponent
                  editing={false}
                  name={`${module._id}Rating`}
                  starCount={5}
                  value={round_to_precision(rating(module.rating), 0.5)}
                />
              </div>
              <div className="col">{module.enrolled}</div>
              <div className="col actions d-flex flex-row">
                <Button
                  color="primary"
                  className="access-btn mx-2"
                  size="sm"
                  onClick={() => {
                    console.log(`accessed`);
                  }}
                >
                  Add module
                </Button>
              </div>
            </div>
          </ListGroupItem>
        </div>
      ))}
    </div>
  );
};

//Continue modules
const IncompleteModules = modules => {
  let completed = modules.data.filter(module => module.continue === true);

  const seen = new Set();
  const uniqueData = completed.filter(({ sid }) => {
    if (seen.has(sid)) {
      return false;
    }
    seen.add(sid);
    return true;
  });

  return (
    <div>
      <h4 className="module-title">Continue your modules</h4>
      <div className="row module-list">
        <div className="col">Module name</div>
        <div className="col">Progress</div>
        <div className="col">Remaining</div>
        <div className="col">Actions</div>
      </div>

      {uniqueData.map(module => (
        <div
          className="module-list-item"
          key={module.moduleNumber}
          id={module._id}
        >
          <ListGroupItem className="d-flex align-items-center w-100">
            <div className="row w-100 align-items-center">
              <div className="col">{module.moduleName}</div>
              <div className="col">
                {progress(module.duration, module.remaining)}%
              </div>
              <div className="col">{module.duration} minutes</div>
              <div className="col actions d-flex flex-row">
                <Link
                  to={`modules/${module._id}`}
                  className="access-btn mx-2 btn btn-primary"
                >
                  Continue module
                </Link>
              </div>
            </div>
          </ListGroupItem>
        </div>
      ))}
    </div>
  );
};
export default ModuleItem;
