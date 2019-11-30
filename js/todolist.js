$(function() {
    // 每次刷新都要渲染到页面
    showDate()
    //getNum()
   // 按下回车，将数据保存到本地存储
    $(window).on("keyup" , function (e) {
        if (e.keyCode === 13){
            if($("#title").val() !== ""){
                // 读取本地存储的数据
                let local = getDate()
                // 将产生的新对象加入本地存储
                local.push({
                    title : $("#title").val() ,
                    done : false
                })
                // 更新本地存储
                local = JSON.stringify(local)
                localStorage.setItem("todolist" , local)
                showDate()
                //getNum()
            }
        }
    })

    // 读取本地存储的数据
    function getDate() {
        let date = localStorage.getItem("todolist")
        if(date === null){
            return []
        }else{
            return JSON.parse(date)
        }
    }

    // 将本地存储的数据渲染到页面上
    function showDate() {
        $("#todolist").empty()
        $("#donelist").empty()
        let local = getDate()
        $.each(local , function (key , item) {
            if(item.done){
                let li = $("<li></li>")
                let ipt = $("<input type='checkbox' index='"+ key +"' checked='checked'>")
                let p = $("<p></p>")
                let a = $("<a href='javascript:;' delIndex='"+ key +"'></a>")
                p.html(item.title)
                li.append(ipt)
                li.append(p)
                li.append(a)
                $("#donelist").append(li)
            }else {
                let li = $("<li></li>")
                let ipt = $("<input type='checkbox' index='"+ key +"'>")
                let p = $("<p></p>")
                let a = $("<a href='javascript:;' delIndex='"+ key +"'></a>")
                p.html(item.title)
                li.append(ipt)
                li.append(p)
                li.append(a)
                $("#todolist").append(li)
            }
        })
        getNum()
    }

    // 为a 添加点击委托事件
    $("#todolist , #donelist").on("click" , "a", function () {
        let local = getDate()
        local.splice($(this).attr("delIndex") ,1)
        local = JSON.stringify(local)
        localStorage.setItem("todolist" , local)
        showDate()
        //getNum()
    })

    // 为input 添加点击委托事件
    $("#todolist , #donelist").on("click" , "input", function () {
        let local = getDate()
        let index = $(this).attr("index")
        local[index].done = !local[index].done
        local = JSON.stringify(local)
        localStorage.setItem("todolist" , local)
        showDate()
        //getNum()
    })

    // 统计正在进行与完成的个数
    function getNum() {
        let todoNum = $("#todolist").children().length
        $("#todocount").html(todoNum)
        let doneNum = $("#donelist").children().length
        $("#donecount").html(doneNum)
    }

})