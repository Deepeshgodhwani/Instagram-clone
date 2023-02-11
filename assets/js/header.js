



// search bar  //

const loading=(val)=>{
     
    if(val){
        $('.loading-bar').css({display:"flex"});
    }else{
        $('.loading-bar').css({display:"none"});
    }

}


$('.search').click(function(){
    $('.searchResult').css({display:"flex"}) 
    $('#close').css({display:"flex"});
    $('#logo').css({display:"none"})
    $(".search").empty();
})


$('#close').click(function(){
    $('.searchResult').css({display:"none"})
    $(this).css({display:"none"});
    $('#logo').css({display:"flex"})
})  



  $('.search').keyup(function(){
    let keyword=$(this).val();
    $('#close').css({display:"none"});  
    loading(true);
    let parantDiv=$('.searchResult');
     $.ajax({
        type:"get",
        url:`/user/search?search=${keyword}`,
        success:function(data){
            parantDiv.empty();
            if(data.users==undefined){
                loading(false);
                $('#close').css({display:"flex"});  
            }else if(!data.users.length){
                loading(true);
                parantDiv.append(" <div style=`z-index: 1000; width: 100%; height: 20rem; display: flex; justify-content: center; align-items: center;`><p>No Results</p></div>")
            }else{
                loading(false);
                parantDiv.append(data.users.map(function(element){
                    return  `<div class="users-detail">
                    <a href="/user/profile/${element._id}">
                        <img id="user-avatar" src="${element.avtar}"/>  
                    </a>
                    <a id="user-name2" href="/user/profile/${element._id}">
                        <p id="username">
                        ${element.username}
                        </p>
                        <p id="name">
                        ${element.name}
                        </p>
                    </a>
                </div>`
                }))
             }
        },
        error:function(err){
            console.log("error in searching user using ajax",err);
        }

     })   
})