import React from 'react';
import {
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    Label,
    Button
} from "reactstrap";

export const Search = () => {
    return (
        <Form action="">
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
            </FormGroup>
            <Button>Search</Button>
        </Form>
    )
}