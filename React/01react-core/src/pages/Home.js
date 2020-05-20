import React, { Component } from 'react'
import State from '../components/State'
import Hook from '../components/Hook'
import Cart from '../components/Cart'
import Lifecycle from '../components/Lifecycle'

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <ul>
                    {/* <li>
                        <h2>1. 状态管理</h2>
                        <h3>1.1 class组件状态管理: state && setState</h3>
                        <State />
                        <h3>1.2 function组件状态管理: hooks[useState和useEffect]</h3>
                        <Hook />
                    </li>
                    <li>
                        <h2>2. 组件通讯</h2>
                        <Cart />
                    </li> */}
                    <li>
                        <h2>3. 生命周期 -- V16.4~</h2>
                        <Lifecycle/>
                    </li>
                </ul>
            </div>
        )
    }
}
