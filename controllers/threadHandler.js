let mongoose = require("mongoose");
let Message = require("../models/message").Message;

exports.postThread = async (req, res, next) => {
  try {
    let board = req.params.board;

    let newThread = await Message.create({
      board: board,
      text: req.body.text,
      created_on: new Date(),
      bumped_on: new Date(),
      reported: true,
      delete_password: req.body.delete_password,
      replies: []
    });

    return res.redirect("/b/" + board);
  } catch (err) {
    return res.json("error");
  }
};

exports.getThread = async (req, res) => {
  try {
    const board = req.params.board;

    // 查找最近 10 條主題，按 bumped_on 倒序
    const threads = await Message.find({ board })
      .sort({ bumped_on: -1 }) // 按 bumped_on 倒序排序
      .limit(10) // 僅取最近 10 條
      .select('-reported -delete_password') // 排除不必要字段
      .lean();

    threads.forEach(thread => {
      // 限制回覆為最近 3 條
      thread.replies = thread.replies
        .sort((a, b) => new Date(b.created_on) - new Date(a.created_on)) // 按 created_on 倒序排序
        .slice(0, 3); // 僅保留最近 3 條回覆

      // 移除回覆的 delete_password 和 reported 字段
      thread.replies = thread.replies.map(reply => ({
        _id: reply._id,
        text: reply.text,
        created_on: reply.created_on,
      }));

      thread.replycount = thread.replies.length; // 設置回覆計數
    });

    res.json(threads); // 返回結果
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to fetch threads' });
  }
};

exports.deleteThread = async (req, res) => {
  try {
    let board = req.params.board;
    let deletedThread = await Message.findById(req.body.thread_id);
    if (req.body.delete_password === deletedThread.delete_password) {
      await deletedThread.delete();
      return res.send("success");
    } else {
      return res.send("incorrect password");
    }
  } catch (err) {
    res.json("error");
  }
};

exports.putThread = async (req, res) => {
  try {
    const { thread_id } = req.body;

    const thread = await Message.findById(thread_id);
    if (!thread) {
      return res.status(404).send("Thread not found");
    }

    thread.reported = true; // 將 `reported` 設置為 true
    await thread.save();

    res.send("reported"); // 返回符合測試要求的字符串
  } catch (err) {
    console.error("Error in PUT /api/threads/:board:", err);
    res.status(500).send("error");
  }
};
