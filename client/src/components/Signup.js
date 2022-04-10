import React from "react";
import withStyles from "@mui/styles/withStyles";
import { useState } from "react";
import { userSignupAction } from "../actions/actions.auth";

const styles = () => ({
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        width: '100%',
        boxSizing: 'border-box',
        padding: "10px 20px",
        border: 0,
        borderBottom: "1px solid #ddd",
        borderRadius: "5px 5px 0 0",
        margin: '5px 0'
    },
    btnBox: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: "0 0 30px"
    },
    btn: {
        cursor: 'pointer'
    }
});

const setInputProps = (classes, state, callback) => [
    {
        type: 'text',
        name: 'name',
        className: classes.input,
        value: state.name,
        placeholder: '이름',
        onChange: callback,
        autoComplete: 'off'
    },
    {
        type: 'text',
        name: 'email',
        className: classes.input,
        value: state.email,
        placeholder: '이메일',
        onChange: callback,
        autoComplete: 'off'
    },
    {
        type: 'password',
        name: 'password',
        className: classes.input,
        value: state.password,
        placeholder: '비밀번호',
        onChange: callback,
        autoComplete: 'off'
    },
    {
        type: 'password',
        name: 'confirmPassword',
        className: classes.input,
        value: state.confirmPassword,
        placeholder: '비밀번호 확인',
        onChange: callback,
        autoComplete: 'off'
    }
];

const Signup = (props) => {
    const { classes, refreshAuth } = props;
    const [body, setBody] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const valueChange = (e) => {
        const { target: { name, value } } = e;
        setBody({ ...body, [name]: value });
    };

    const signupSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = body;

        if (!name) return alert('이름을 입력하세요.');
        if (!email) return alert('이메일을 입력하세요.');
        if (!password) return alert('비밀번호를 입력하세요.');
        if (password !== confirmPassword) return alert('1비밀번호가 일치하지 않습니다.');

        const user = { name, email, password };
        const { ok, error } = await userSignupAction(user);
        console.log(ok, error);
        if (!ok) return alert(error);
        refreshAuth();
    };

    const inputProps = setInputProps(classes, body, valueChange);

    return (
        <form className={classes.form} onSubmit={signupSubmit}>
            {
                inputProps.map((inputProp, key) =>
                    <input key={key} {...inputProp} />
                )
            }
            <div className={classes.btnBox}>
                <button className={classes.btn}>회원가입</button>
            </div>
        </form>
    );
};

export default withStyles(styles)(Signup);