import React from "react";
import ReactDom from 'react-dom';
import '../public/app.css';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SliderLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
        this.onCollapse = this.onCollapse.bind(this);
    }

    onCollapse(collapsed){
        console.log(collapsed);
        this.setState({ collapsed });
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Menu style={{marginTop: '60px'}} theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="home" />
                            <span>Home</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="heart" />
                            <span>Favorable</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="message" />
                            <span>Message</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="contacts" />
                            <span>Message</span>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="tool" />
                            <span>Admin</span>
                        </Menu.Item>
                        {/*<SubMenu*/}
                            {/*key="sub1"*/}
                            {/*title={<span><Icon type="setting" /><span>Setting</span></span>}*/}
                        {/*>*/}
                            {/*<Menu.Item key="3">Tom</Menu.Item>*/}
                            {/*<Menu.Item key="4">Bill</Menu.Item>*/}
                            {/*<Menu.Item key="5">Alex</Menu.Item>*/}
                        {/*</SubMenu>*/}
                        {/*<SubMenu*/}
                            {/*key="sub2"*/}
                            {/*title={<span><Icon type="team" /><span>Team</span></span>}*/}
                        {/*>*/}
                            {/*<Menu.Item key="6">Team 1</Menu.Item>*/}
                            {/*<Menu.Item key="8">Team 2</Menu.Item>*/}
                        {/*</SubMenu>*/}
                        {/*<Menu.Item key="9">*/}
                            {/*<Icon type="file" />*/}
                            {/*<span>File</span>*/}
                        {/*</Menu.Item>*/}
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="header"/>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            Bill is a cat.
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        YLT Design ©2018 Created by YLT
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}


class Book extends React.Component {
    constructor(){
        super();
    }
    render() {
        return  <div><SliderLayout /></div>;
    }
}
const app = document.getElementById('app');
ReactDom.render(<Book />, app);