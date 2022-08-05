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

const form = layui.form
//! 预先保存弹出层的索引，方便进行关闭
//!绑定添加按钮
let indexAdd = null;
$("#addCateBtn").click(function () {
	indexAdd = layer.open({
		type: 1,
		area: ["500px", "250px"],
		title: "添加文章分类",
		content: $('#dialog-add').html(),
	});
})
//!绑定事件委托 实现添加文章分类的功能
// 通过代理监听 submit 事件
$("body").on("submit", "#form-add", function (e) {
	e.preventDefault();
	$.ajax({
			type: "POST",
			url: "/my/article/addcates",
			data: $(this).serialize(),
			success: (res) => {
					if (res.status !== 0) return layer.msg("新增分类失败！");
					initArtCateList();
					layer.msg("新增分类成功！");
					layer.close(indexAdd);
			},
	});
});
let layerEdit = null
//!点击编辑 编辑按钮是自定义
$("#tb").on('click', '.btn-edit', function () {
	layerEdit = layer.open({
		type: 1,
		area: ["500px", "250px"],
		title: "添加文章分类",
		//获取模板字符串的html
		content: $('#dialog-edit').html(),
	})
	let id = $(this).attr("data-id")
	$.ajax({
		type: 'GET',
		url: "/my/article/cates/" + id,
		success: res => {
			const { status, message, data } = res
			if (status !== 0) return layer.msg(message)
			form.val("form-edit", data);
		}
	})
})

$('body').on('submit', '#form-edit', function (e) {
	e.preventDefault()
	$.ajax({
		type: 'POST',
		url: "/my/article/updatecate",
		data: form.val('form-edit'),
		success: res => {
			const { status, message } = res
			layer.msg(message)
			if (status !== 0) return
			initArtCateList();
			layer.close(indexAdd)
		}
	})
})


//!删除按钮
$('#tb').on('click', '.btn-delete', function () {
	//获取删除按钮的id
	let id = $(this).attr("data-id")
	$.ajax({
		type: 'GET',
		url: '/my/article/deletecate/' + id,
		data: null,
		success: res => {
			const { status, message } = res
			layer.msg(message)
			if (status !== 0) return
			//查询渲染
			initArtCateList();
		}
	})
})