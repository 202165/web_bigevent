$(function(){
    // 点击去注册
    $('#link_reg').on('click',function(){
        $('.loginBox').hide()
        $('.regBox').show()
    })
    // 点击去登陆
    $('#link_login').on('click',function(){
        $('.regBox').hide()
        $('.loginBox').show()
    })
    // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        // 密码
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        //用户名
        uname: [/^[\S]{2,12}$/,'用户名必须2到12位，且不能出现空格'],
        // 确认密码
        repwd: function(value){
           let pwd= $('.regBox [name=password]').val()
            if(pwd!==value){
                return '两次密码输入不一致'
            }
        }
    })
    // 监听注册表单
    $('#form_reg').on('submit',function(e){
        // 阻止表单默认行为
        e.preventDefault()
        var data={username:$('#form_reg [name=username]').val(),
        password:$('#form_reg [name=password]').val()}
        $.post('/api/reguser',data,function(res){
            if(res.status!==0){
                return layer.msg(res.message)
            }
            layer.msg('成功')
            $('#link_login').click()
        })
    })
    // 监听登陆
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'http://www.liulongbin.top:3007/api/login',
            method:'post',
            data:
            $('#form_login').serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('失败')
                }
                layer.msg('登陆成功')
                // 跳转主页
                localStorage.setItem('token',res.token)
                location.href='../../index.html'
            }
         })
    })
})