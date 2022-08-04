const initArtCateList = () => {
	$.ajax({
		type: "GET",
		url: "/my/article/cates",
		success: (res) => {
			// 调用 template
			const htmlStr = template("tpl-table", res);
			$("tbody").empty().html(htmlStr);
		},
	});
};
initArtCateList()

//!绑定添加按钮
$("#addCateBtn").click(function () {
	layer.open({
		type: 1,
		area: ["500px", "250px"],
		title: "添加文章分类",
		//获取模板字符串的html
		content: $('#dialog-add').html(),
	});
})
//!绑定事件委托 实现添加文章分类的功能
// 通过代理监听 submit 事件
$("body").on("submit", "#form-add", function (e) {
	e.preventDefault();//阻止默认事件
	$.ajax({
		type: "POST",
		url: "/my/article/addcates",
		data: $(this).serialize(),
		success: (res) => {
		console.log(res);
			if (res.status !== 0) return layer.msg("新增分类失败！");
			initArtCateList();
			layer.msg("新增分类成功！");
			layer.close(indexAdd);
		},
	});
});
//!预先保存弹出层的索引，方便进行关闭
let indexAdd = null;
$("#btnAddCate").click(() => {
    indexAdd = layer.open({
        type: 1,
        area: ["500px", "250px"],
        title: "添加文章分类",
        content: $("#dialog-add").html(),
    });
});