$(function(){

    var ui = {
        $btnAddInput : $('.btn-add-input') ,
        $contentList : $('#content-list') ,
        $contentListItem : $('.content-list-item')
    };

    var lastDataId = 2;
    /**
     * 点击添加文本框按钮
     * */
    ui.$btnAddInput.click(function(){
        self = this;

        lastDataId = Number(lastDataId) + 1;
        console.log(lastDataId);
        var dataId = 'list-item-' + lastDataId;

        // 创建新元素
        var liItem = document.createElement("li");
        liItem.setAttribute("data-id",dataId);
        liItem.setAttribute("class",'content-list-item');
        var textareaItem = document.createElement("textarea");
        textareaItem.setAttribute("class",'note-content');
        liItem.appendChild(textareaItem);
        ui.$contentList.append(liItem);
    });


    $(window).scroll(function(){
        var scrolltop=$(this).scrollTop();
        if(scrolltop >= 200) {
            $("#elevator").show();
        } else {
            $("#elevator").hide();
        }
    });

    $("#elevator").click(function() {
        $("html,body").animate({scrollTop: 0}, 500);
    });


    //实时存储
    // 委托body为动态添加的.note-content绑定事件
    $("body").on("change", '.note-content', function(){
        content = $(this).val();
        id = $(this).data('mongo-id');
        console.log();
        id == undefined || ajaxSaveNote(null,content);
    });
    $('.note-content').bind('change',function(){
        id = $(this).data('mongo-id');
        content = $(this).val();
        console.log(id);
        console.log(content);
        ajaxSaveNote(id,content);

    });

    var ajaxSaveNote = function(id,content)
    {
        url = (id == null) ? 'addNote' : 'editNote';
        $.ajax({
            type : 'POST',
            url : url,
            data : {
                id : id,
                content : content
            },
            dataType: "json",
            success : function(data)
            {
                console.log(data.err);
            }
        });
    }



    /* 貌似解决 div内容监听，但内容中有di **/
//    $('.note-content').bind('DOMNodeInserted', function(e) {
//        alert('element now contains: ' + $(e.target).text());
//    });

});