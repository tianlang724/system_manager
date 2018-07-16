import "../public/login.scss"
import React from "react";
import ReactDom from "react-dom";
import { Form, Icon, Input, Button, Checkbox, Row, Col,  message} from 'antd';
const FormItem = Form.Item;
import commonHttp from "./common/commonHttp";
import CODE from '../common/httpCodes'
class NormalLoginForm extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
           isRegister: false,
           confirmPassword: false,
       };
       this.toggleSign = this.toggleSign.bind(this);
       this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
       this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
       this.validateToNextPassword = this.validateToNextPassword.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleSign() {
        this.setState({
            isRegister: !this.state.isRegister
        },() => {
            this.props.form.resetFields();
        });
    }
    handleConfirmBlur(e){
        const value = e.target.value;
        this.setState({ confirmPassword: this.state.confirmPassword || !!value });
    }
    compareToFirstPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    validateToNextPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            console.log(err);
            if (!err) {
                const params = {
                    user_name: values.user_name,
                    password: values.password
                }
                if (this.state.isRegister) {
                    commonHttp.userSignUp(params).then(response => {
                        console.log(response.data);
                        let data = response.data || {};
                        if (data) {
                            if (data.code === CODE.SUCCESS) {
                                message.success('Sign up success, you can sign in now.', 3);
                                return;
                            } else if (data.code === CODE.SIGN_UP_ERR) {
                                message.error('Username is existed.', 3);
                                return;
                            }
                        }
                        message.error('Sign up error, please try again later.', 3);

                    })
                } else {
                    commonHttp.userSignIn(params).then(response => {
                        console.log(response.data);
                        let data = response.data || {};
                        if (data) {
                            if (data.code === CODE.SUCCESS) {
                                message.success('Sign in success.', 3);
                                window.location.href = '/';
                                return;
                            } else if (data.code === CODE.NO_USER || data.code === CODE.PASSWORD_ERR) {
                                message.error('No user or Password error.', 3);
                                return;
                            }
                        }
                        message.error('Sign in error, please try again later.', 3);
                    });
                }
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('user_name', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{
                                    required: true, message: 'Please input your Password!'
                                },{
                                    validator: this.validateToNextPassword,
                                }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                {   this.state.isRegister &&
                    <FormItem>
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please input Password again!'
                            }, {
                                validator: this.compareToFirstPassword
                            }],
                        })(
                            <Input onBlur={this.handleConfirmBlur}
                                   prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   type="password" placeholder="Confirm Password"/>
                        )}
                    </FormItem>
                }
                <FormItem style={{ marginTop: this.state.isRegister ? "0" : "80px"}}>
                    {/*{getFieldDecorator('remember', {*/}
                        {/*valuePropName: 'checked',*/}
                        {/*initialValue: true,*/}
                    {/*})(*/}
                        {/*<Checkbox>Remember me</Checkbox>*/}
                    {/*)}*/}
                    {/*<a className="login-form-forgot" href="">Forgot password</a>*/}
                    <Row style={{ marginTop: "10px"}} type="flex" justify="end">
                        <Col>
                            <Button  type="primary" htmlType="submit" className="login-form-button">
                                {this.state.isRegister ? 'Sign up' : 'Login in'}
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "10px"}} type="flex" justify="end">
                        <Col>
                            Or <a  style={{ display: 'inline-block', width: '85px'}} onClick={this.toggleSign}>{this.state.isRegister ? 'Sign in now!' : 'register now!'}</a>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


class Login extends React.Component {
    constructor() {
        super()
    }
    render() {

        return (
            <div className="login-wrapper">
                <WrappedNormalLoginForm />
            </div>
        );
    }
}
const login = document.getElementById('login-area');
ReactDom.render(<Login />, login);
