import React, { useState, useEffect } from 'react'

// 自定义钩子
const useAge = () => {
    const [age, setAge] = useState(0)
    useEffect(() => {
        setTimeout(() => {
            setAge(20)
        }, 2000)
    }, [age])
    return age
}

export default function Hook() {
    // 跟class组件中的`this.state`和`this.setState`类似
    const [date, setDate] = useState(new Date())
    const [fruits, setFruits] = useState(['apple', 'banana', 'peach'])
    // 使用自定义钩子
    const age = useAge()

    // 跟class组件中的componentDidMount,componentDidUpdate,componentWillUnmount类似
    useEffect(() => {
        const timeId = setInterval(() => {
            setDate(new Date())
        }, 1000)
        // 清除工作：有一些副作用是需要清除的，清除工作十分重要，可以防止引起内存泄露
        // 组件卸载后悔执行返回的清理函数
        return () => clearInterval(timeId)
    }, [date]) //设置依赖：只有date发生变化时，才会执行副作用

    useEffect(() => {
        console.log('第二个参数[]空数组表示没有依赖属性，所以只会执行一次[适合用来发送请求]')
    }, [])

    const delFruit = index => {
        const temp = [...fruits]
        temp.splice(index, 1)
        setFruits(temp)
    }

    return (
        <div>
            <p>现在是：{date.toLocaleTimeString()}</p>
            <p>使用自定义钩子：{age}</p>
            <AddFruit onAddFruit={item => setFruits([...fruits, item])} />
            <FruitLists fruits={fruits} onSetFruits={delFruit} />
        </div>
    )
}

function FruitLists({ fruits, onSetFruits }) {
    return (
        <ul>
            {
                fruits.map((fruit, index) => <li key={index} onClick={() => onSetFruits(index)}>{fruit}</li>)
            }
        </ul>
    )
}

function AddFruit({ onAddFruit }) {
    const [name, setName] = useState('')
    return (
        <div>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <button onClick={() => onAddFruit(name)}>添加水果</button>
        </div>
    )
}