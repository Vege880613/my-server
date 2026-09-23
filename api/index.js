const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Record = require('./models/Record');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://137055778_db_user:qqXpTQD4Hm1MCKYj@cluster0.yffkeyk.mongodb.net/accounting?retryWrites=true&w=majority')
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log('数据库连接失败:', err));

app.get('/api/records', async (req, res) => {
    const records = await Record.find();
    res.json(records);
});

app.post('/api/records', async (req, res) => {
    if (!req.body.description || req.body.amount <= 0) {
    return res.status(400).json({ error: '请输入有效的说明和金额' });
    }
    try {
        const record = new Record(req.body);
        await record.save();
        res.json(record);
    } catch (error) {
        res.status(500).json({ error: '服务器错误，请稍后再试' });
    }

    const record = new Record(req.body);
    await record.save();
    res.json(record);
});
// 更新记录
app.put('/api/records/:id', async (req, res) => {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(record);
});
app.delete('/api/records/:id', async (req, res) => {
    await Record.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});
module.exports = app;
