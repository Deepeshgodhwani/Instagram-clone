

// const loading=(val)=>{
     
//     if(val){
//         $('.loading').css({display:"flex"});
//     }else{
//         $('.loading').css({display:"none"});
//     }

// }



const opennList=function(){
    $('.outer-layer').css({display:"flex"})
}

 function closed(){
    $('.outer-layer').css({display:"none"}) 
}

 $('.search-bar').keyup(function(){
    let keyword=$(this).val();
    let parantDiv=$('.search-Result');
     $.ajax({
        type:"get",
        url:`/user/search?search=${keyword}`,
        success:function(data){
            parantDiv.empty();
            if(data.users==undefined){
            }else if(!data.users.length){
                parantDiv.append(" <div style=`z-index: 1000; width: 100%; height: 20rem; display: flex; justify-content: center; align-items: center;`><p>No Results</p></div>")
            }else{
                parantDiv.append(data.users.map(function(element){
                    return  `<div class="users-detail">
                    <a href="/user/direct/inbox?id=${element._id}">
                        <img id="user-avatar" src="${element.avtar}"/>  
                    </a>
                    <a id="user-name2" href="/user/direct/inbox?id=${element._id}">
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