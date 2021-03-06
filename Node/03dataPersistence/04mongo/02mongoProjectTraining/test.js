const mongodb = require('./models/db')

mongodb.once('connect', async () => {
    // 创建集合markets
    const col = mongodb.col('markets')
    // 删除已存在
    await col.deleteMany()
    // ES6 Array.fill() 使用指定的元素填充数组
    const data = new Array(100).fill().map((v, i) => {
        return {
            name: "XXX" + i,
            price: i,
            category: Math.random() > 0.5 ? '蔬菜' : '水果'
        }
    })
    // 插入
    await col.insertMany(data)
    console.log("插入数据成功")
})