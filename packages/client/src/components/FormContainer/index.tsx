import { styled } from "@mui/material/styles";
import React from "react";

const PageContainer = styled("div")(
    ({ theme }) => `
		background-color: ${theme.palette.background.paper};
        min-height: 80%;
        padding: ${theme.spacing(3)};
        border-radius: ${theme.spacing(1)};

        display: flex;
        flex-direction: column;
`
);

const Form = styled("form")(
    ({ theme }) => `
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        height: 100%;
    `
);

interface FormContainerProps {
    children: React.ReactNode;
    formProps?: React.FormHTMLAttributes<HTMLFormElement>;
}

// A generic page container for creating/editing resources
const FormContainer = ({ children, formProps = {} }: FormContainerProps) => {
    return (
        <PageContainer>
            <Form {...formProps}>{children}</Form>
        </PageContainer>
    );
};
export default FormContainer;
