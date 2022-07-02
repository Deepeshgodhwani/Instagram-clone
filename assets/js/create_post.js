

{

     let pageNo=0; 
    
    function postCreationOn(){

         
       $('html, body').css({
          overflow: 'hidden',
          height: '100vh'
       }); 
           
        $('.create-post').css({

           opacity:'1',
           overflow:'none',
           width:'100%',
           height:'100vh'
        })
    }


    function postCreationOff(){

          $('html, body').css({
             overflow:'none',
             height:'auto'
          }); 

            $('.create-post').css({
                opacity:'0',
                overflow:'hidden',
                width:'0',
                height:'0',
                position:'absolute'
             })
  }

function selectingPictureOn(){
    
   $("#select-picture").css({
      overflow:'none',
      width:'25rem',
      height:'27rem',
      position:'relative'
   }) 
      
   $(".post-form").css({
      height:'27rem',
      width:'25rem'
   })
   $("#create-new-post").css({
          
          width:'0',
          height:'0',
          overflow:'hidden',
           position:'absolute'
    })
     pageNo =1;
         
 }
  function selectingPictureOff(){
   $("#select-picture").css({
      overflow:'hidden',
      width:'0',
      height:'0',
      position:'absolute'
   })
  pageNo=2;
         
}

function discardProcessON(){
         
   $('#confirmation-slot').css({
      width:"100%",
      height:'100vh',
      overflow:'none'
   })
} 

function discardProcessOff(){
   
    $('#confirmation-slot').css({
      width:"0",
      height:'0',
      overflow:'hidden'
    })
} 



 var createPost= function(){

            postCreationOn();
            pageNo =1;


  let file= $('#select-button')
      file.change(function(event){
        
           var path=URL.createObjectURL(event.target.files[0])
           selectingPictureOff();
   
            $(".post-form").css({
               height:'25rem',
               width:'42rem'
            })
            $('#post-image').attr("src",path);
            $("#create-new-post").css({
                   
                   width:'42rem',
                   height:'25rem',
                   overflow:'none',
                   position:'relative'
            })

            pageNo = 2;
       })    
    }


    var closeTheProcess=function(){

      if(pageNo==1){
       
         postCreationOff();
      }else if(pageNo==2){

             discardProcessON();
      }
    
        
   }

   var discard=function(){
      discardProcessOff();
      selectingPictureOn();
   }

   var continueProcess =function(){
      discardProcessOff();
   }


      

    




}